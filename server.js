// Charger les variables d'environnement depuis .env
require('dotenv').config();

// Importer Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Importer toutes les fonctions CRUD de notre contrôleur
const personController = require('./controllers/personController');

async function main() {
  try {
    // Connexion à la base de données MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connecté ✅\n");

    // 1️⃣ Créer et sauvegarder une seule personne
    const savedPerson = await personController.createAndSavePerson();

    // 2️⃣ Créer plusieurs personnes à partir de arrayOfPeople
    const manyPeople = await personController.createManyPeople();

    // 3️⃣ Rechercher toutes les personnes nommées "Mary"
    const peopleNamedMary = await personController.findPeopleByName("Mary");

    // 4️⃣ Rechercher une personne aimant "pizza"
    const pizzaLover = await personController.findOneByFood("pizza");

    // 5️⃣ Mettre à jour l'âge d'Ahmed à 20 ans
    const updatedAhmed = await personController.updateAge("Ahmed");

    // 6️⃣ Supprimer toutes les personnes nommées "Mary"
    const removedMary = await personController.removeMary();

    // 7️⃣ Chaîner les requêtes : trouver les amateurs de burritos, trier et limiter
    const burritoLovers = await personController.searchBurritoLovers();

    console.log("\n✅ Toutes les opérations CRUD ont été exécutées avec succès !");
    
    // Fermer proprement la connexion après exécution
    mongoose.connection.close();
    console.log("Connexion MongoDB fermée 🔒");
    
  } catch (err) {
    console.error("Erreur :", err);
  }
}

// Exécuter la fonction principale
main();
