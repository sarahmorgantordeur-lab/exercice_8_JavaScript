import BudgetModel from './model.js';
import BudgetView from './view.js';

export default class BudgetController {
  constructor() {
    this.view = new BudgetView();
    this.model = null;

    this.view.bindLogin(this.handleLogin.bind(this));
    this.view.bindAddEntry(this.handleAddEntry.bind(this));
  }

  handleLogin(username) {
    this.model = new BudgetModel(username);
    this.view.showApp();
    this.view.initializeChart();
    this.view.renderEntries(this.model.getEntries());
    this.view.updateBalance(this.model.getBalance());
    this.view.updateChart(this.model.getEntries());
  }

  handleAddEntry(entry) {
    this.model.addEntry(entry);
    this.view.renderEntries(this.model.getEntries());
    this.view.updateBalance(this.model.getBalance());
    this.view.updateChart(this.model.getEntries());
  }
}
