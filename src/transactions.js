import Category from './categories.js';
import Transaction_type from './types.js';
import User from './users.js';

export default class Transaction {
  constructor(id, category_id, type_id, user_id, description_id, value, start_date, due_date, status) {
    this.id = id;
    this.category_id = new Category(category_id);
    // Correction : type_id peut être un objet {id, name} ou une string
    if (typeof type_id === 'object' && type_id !== null) {
      this.type_id = new Transaction_type(type_id.id, type_id.name);
    } else {
      this.type_id = new Transaction_type(type_id, type_id);
    }
    this.user_id = new User(user_id);
    this.description_id = description_id;
    this.value = value;
    this.start_date = start_date;
    this.due_date = due_date;
    this.status = status;
    }

// Méthode pour enregistrer cette transaction dans le localStorage
  saveToLocalStorage() {
    // 1. Charger les transactions déjà enregistrées
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];

    // 2. Ajouter la transaction actuelle
    stored.push(this);

    // 3. Sauvegarder le nouveau tableau
    localStorage.setItem("transactions", JSON.stringify(stored));
  }

  // Exemple d’autre méthode
  afficher() {
    console.log(`${this.type_id} : ${this.value} € - ${this.status}`);
  }
}