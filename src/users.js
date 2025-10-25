export default class User {
  constructor(id, lastName, firstName, password) {
    // Le constructeur est exécuté quand on crée un nouvel objet
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.password = password;
  }

  // Méthode = fonction appartenant à la classe
  maMethode() {
    console.log("Ceci est une méthode !");
  }
}