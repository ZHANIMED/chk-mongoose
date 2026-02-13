// Importation du modèle Mongoose "Person" et des données initiales
const Person = require('../models/person'); // Modèle pour manipuler les documents "Person" dans MongoDB
const arrayOfPeople = require('../data/arrayOfPeople'); // Tableau d'objets pour créer plusieurs personnes d'un coup

// 1️⃣ Créer et sauvegarder une personne
const createAndSavePerson = async () => {
  try {
    // Création d'une instance de Person
    const person = new Person({
      name: "Ahmed",               // Nom de la personne
      age: 25,                     // Âge
      favoriteFoods: ["pizza", "pasta"] // Aliments favoris
    });

    // Sauvegarde dans la base de données
    const savedPerson = await person.save();
    console.log("Personne sauvegardée :", savedPerson);
    return savedPerson;
  } catch (err) {
    console.error(err);
  }
};

// 2️⃣ Créer plusieurs personnes à partir d'un tableau
const createManyPeople = async () => {
  try {
    // Création de plusieurs documents Person en une seule fois
    const people = await Person.create(arrayOfPeople);
    console.log("Plusieurs personnes ajoutées :", people);
    return people;
  } catch (err) {
    console.error(err);
  }
};

// 3️⃣ Recherche par nom avec find()
const findPeopleByName = async (name) => {
  try {
    // Recherche de toutes les personnes dont le champ "name" correspond
    const people = await Person.find({ name });
    console.log(`Personnes avec le nom ${name}:`, people);
    return people;
  } catch (err) {
    console.error(err);
  }
};

// 4️⃣ Recherche d'une seule personne par aliment favori avec findOne()
const findOneByFood = async (food) => {
  try {
    // Recherche d'une seule personne qui aime l'aliment donné
    const person = await Person.findOne({ favoriteFoods: food });
    console.log(`Personne aimant ${food}:`, person);
    return person;
  } catch (err) {
    console.error(err);
  }
};

// 5️⃣ Recherche d'une personne par son _id
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log("Personne trouvée par ID :", person);
    return person;
  } catch (err) {
    console.error(err);
  }
};

// 6️⃣ Find, Edit, Save : ajouter un aliment et sauvegarder
const addHamburger = async (personId) => {
  try {
    // Recherche de la personne par _id
    const person = await Person.findById(personId);
    if (!person) return console.log("Personne introuvable");

    // Ajout d'un nouvel aliment dans le tableau favoriteFoods
    person.favoriteFoods.push("hamburger");

    // Sauvegarde des modifications
    const updatedPerson = await person.save();
    console.log("Personne mise à jour :", updatedPerson);
    return updatedPerson;
  } catch (err) {
    console.error(err);
  }
};

// 7️⃣ Mise à jour d'un document avec findOneAndUpdate()
const updateAge = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },  // Critère de recherche
      { age: 20 },           // Champ à mettre à jour
      { returnDocument: 'after' } // Retourne le document après mise à jour
    );
    console.log("Âge mis à jour :", updatedPerson);
    return updatedPerson;
  } catch (err) {
    console.error(err);
  }
};

// 8️⃣ Supprimer un document par son _id
const deleteById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndRemove(personId);
    console.log("Personne supprimée :", removedPerson);
    return removedPerson;
  } catch (err) {
    console.error(err);
  }
};

// 9️⃣ Supprimer plusieurs documents avec deleteMany()
const removeMary = async () => {
  try {
    const result = await Person.deleteMany({ name: "Mary" });
    console.log("Résultat suppression :", result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// 🔟 Chaîner des requêtes avec find(), sort(), limit(), select(), exec()
const searchBurritoLovers = async () => {
  try {
    const data = await Person.find({ favoriteFoods: "burritos" }) // Cherche les amateurs de burritos
      .sort("name")   // Trie par nom
      .limit(2)       // Limite à 2 résultats
      .select("-age") // Exclut le champ "age" des résultats
      .exec();        // Exécute la requête
    console.log("Amateurs de burritos :", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Export de toutes les fonctions pour les utiliser dans server.js
module.exports = {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  addHamburger,
  updateAge,
  deleteById,
  removeMary,
  searchBurritoLovers
};
