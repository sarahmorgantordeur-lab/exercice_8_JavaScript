export default class BudgetView {
  constructor() {
    this.loginForm = document.getElementById('login-form');
    this.app = document.getElementById('app');
    this.entryForm = document.getElementById('entry-form');
    this.entriesList = document.getElementById('entries');
    this.balanceDisplay = document.getElementById('balance');
    this.chart = null;
  }

  showApp() {
    this.loginForm.classList.add('hidden');
    this.app.classList.remove('hidden');
  }

  bindLogin(handler) {
    this.loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      if (username) handler(username);
    });
  }

  bindAddEntry(handler) {
    this.entryForm.addEventListener('submit', e => {
      e.preventDefault();
      const description = document.getElementById('description').value.trim();
      const amount = parseFloat(document.getElementById('amount').value);
      const type = document.getElementById('type').value;
      if (description && !isNaN(amount)) {
        handler({ description, amount, type });
        this.entryForm.reset();
      }
    });
  }

  renderEntries(entries) {
    this.entriesList.innerHTML = '';
    entries.forEach(entry => {
      const li = document.createElement('li');
      li.className = 'flex justify-between border-b py-2';
      li.innerHTML = `
        <span>${entry.description}</span>
        <span class="${entry.type === 'expense' ? 'text-red-500' : 'text-green-500'}">${entry.amount} €</span>
      `;
      this.entriesList.appendChild(li);
    });
  }

  updateBalance(balance) {
    this.balanceDisplay.textContent = `${balance.toFixed(2)} €`;
  }

  initializeChart() {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Revenus',
            data: [],
            backgroundColor: 'rgba(34,197,94,0.6)',
          },
          {
            label: 'Dépenses',
            data: [],
            backgroundColor: 'rgba(239,68,68,0.6)',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Graphique des Revenus et Dépenses' }
        }
      }
    });
  }

  updateChart(entries) {
    const labels = entries.map(e => e.description);
    const revenus = entries.map(e => e.type === 'revenue' ? e.amount : 0);
    const depenses = entries.map(e => e.type === 'expense' ? e.amount : 0);

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = revenus;
    this.chart.data.datasets[1].data = depenses;
    this.chart.update();
  }
}
