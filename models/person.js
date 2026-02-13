const mongoose = require('mongoose');

// Schéma Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Modèle Person
module.exports = mongoose.model('Person', personSchema);
