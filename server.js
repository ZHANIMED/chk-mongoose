require('dotenv').config();
const mongoose = require('mongoose');
const personController = require('./controllers/personController');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connecté ✅");

    // Test de toutes les fonctions CRUD
    //await personController.createAndSavePerson();
    //await personController.createManyPeople();
    //await personController.findPeopleByName("Mary");
    //await personController.findOneByFood("pizza");
    //await personController.updateAge("Ahmed");
    //await personController.removeMary();
    await personController.searchBurritoLovers();
  })
  .catch(err => console.error("Erreur de connexion :", err));
