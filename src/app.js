// Gestion du bouton de déconnexion
document.getElementById("logout-btn").addEventListener("click", function () {
  // Supprime l'utilisateur courant
  localStorage.removeItem("currentUser");
  // Masque l'application et affiche le formulaire de connexion
  document.getElementById("app").classList.add("hidden");
  document.getElementById("login-form").style.display = "block";
});
import BudgetManager from "./budgetManager.js";
import Transaction from "./transactions.js";

// Crée le gestionnaire
const manager = new BudgetManager();


// Calcule le solde pour 2025
const solde = manager.getAnnualBalance(2025);
console.log("💰 Solde annuel :", solde, "€");


document.getElementById("solde").textContent = solde + " €";

// Fonction pour afficher le graphique du budget
function renderBudgetChart() {
  const ctx = document.getElementById('budgetChart').getContext('2d');
  // Récupère toutes les transactions
  const transactions = manager.transactions;
  // Sépare les revenus et dépenses
  let totalIncome = 0;
  let totalExpense = 0;
  console.log('Transactions pour le graphique:', transactions);
  transactions.forEach(t => {
    let type = t.type_id;
    if (typeof type === 'object' && type !== null) {
      type = type.id || type.name;
    }
    console.log('Type utilisé pour graphique:', type);
    if (type === "income") {
      totalIncome += t.value;
    } else {
      totalExpense += t.value;
    }
  });
  // Détruit l'ancien graphique si besoin
  if (window.budgetChartInstance) {
    window.budgetChartInstance.destroy();
  }
  window.budgetChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Revenus', 'Dépenses'],
      datasets: [{
        label: 'Montant',
        data: [totalIncome, totalExpense],
        backgroundColor: ['#4ade80', '#f87171'],
        borderColor: ['#22c55e', '#dc2626'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Répartition du budget' }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Montant (€)' }
        },
        x: {
          title: { display: true, text: 'Type' }
        }
      }
    }
  });
}

// Affiche le graphique au chargement
renderBudgetChart();

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  if (username) {
    localStorage.setItem("currentUser", username);
    alert("Connecté en tant que " + username);
    document.getElementById("login-form").style.display = "none";
    // Affiche la section application
    document.getElementById("app").classList.remove("hidden");
  } else {
    alert("Veuillez entrer un nom d'utilisateur.");
  }
});

// Gestion du formulaire d'ajout de dépense
document.getElementById("entry-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  if (!description || isNaN(amount) || amount <= 0) {
    alert("Veuillez remplir tous les champs correctement.");
    return;
  }
  // Crée une nouvelle transaction
  // On passe un objet avec id et name pour le type
  const newTransaction = new Transaction(
    Date.now(), // id unique
    null, // category_id (à adapter si besoin)
    { id: type, name: type },
    localStorage.getItem("currentUser"),
    description,
    amount,
    Date.now(),
    null,
    "valid"
  );
  manager.addTransaction(newTransaction);
  // Recharge les transactions depuis le localStorage
  manager.transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  // Met à jour le solde affiché
  const year = new Date().getFullYear();
  const solde = manager.getAnnualBalance(year);
  document.getElementById("solde").textContent = solde + " €";
  // Met à jour le graphique
  renderBudgetChart();
  // Réinitialise le formulaire
  document.getElementById("entry-form").reset();
});