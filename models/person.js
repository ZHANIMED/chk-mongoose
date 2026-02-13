// Importation de Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définition du schéma pour le modèle "Person"
// Un schéma définit la structure des documents dans la collection MongoDB
const personSchema = new mongoose.Schema({
  name: { 
    type: String,      // Le champ "name" doit être une chaîne de caractères
    required: true     // "name" est obligatoire
  },
  age: Number,         // Champ "age", type Number, non obligatoire
  favoriteFoods: [String] // Champ "favoriteFoods", tableau de chaînes de caractères
});

// Création du modèle "Person" basé sur le schéma
// Ce modèle permet de créer, lire, mettre à jour et supprimer des documents "Person"
module.exports = mongoose.model('Person', personSchema);
