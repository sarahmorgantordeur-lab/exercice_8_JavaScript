import Transaction from "./transactions.js";

export default class BudgetManager {
  constructor() {
    // Charger depuis le localStorage
    this.transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }

  // 💰 Calcule le solde annuel
  getAnnualBalance(year) {
    let balance = 0;

    this.transactions.forEach(t => {
      const transactionYear = new Date(t.start_date).getFullYear();
      if (transactionYear === year) {
        let type = t.type_id;
        if (typeof type === 'object' && type !== null) {
          type = type.id || type.name;
        }
        if (type === "income") {
          balance += t.value;
        } else {
          balance -= t.value;
        }
      }
    });

    return balance;
  }
}