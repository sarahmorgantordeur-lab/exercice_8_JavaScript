export default class BudgetModel {
  constructor(username) {
    this.username = username;
    this.entries = JSON.parse(localStorage.getItem(this.username)) || [];
  }

  addEntry(entry) {
    this.entries.push(entry);
    this.save();
  }

  getEntries() {
    return this.entries;
  }

  getBalance() {
    return this.entries.reduce((acc, entry) => {
      return entry.type === 'revenue' ? acc + entry.amount : acc - entry.amount;
    }, 0);
  }

  save() {
    localStorage.setItem(this.username, JSON.stringify(this.entries));
  }
}
