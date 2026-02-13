const Person = require('../models/person');
const arrayOfPeople = require('../data/arrayOfPeople');

// 1️⃣ Créer et sauvegarder une personne
const createAndSavePerson = async () => {
  try {
    const person = new Person({
      name: "Ahmed",
      age: 25,
      favoriteFoods: ["pizza", "pasta"]
    });

    const savedPerson = await person.save();
    console.log("Personne sauvegardée :", savedPerson);
    return savedPerson;
  } catch (err) {
    console.error(err);
  }
};

// 2️⃣ Créer plusieurs personnes
const createManyPeople = async () => {
  try {
    const people = await Person.create(arrayOfPeople);
    console.log("Plusieurs personnes ajoutées :", people);
    return people;
  } catch (err) {
    console.error(err);
  }
};

// 3️⃣ find()
const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name });
    console.log(`Personnes avec le nom ${name}:`, people);
    return people;
  } catch (err) {
    console.error(err);
  }
};

// 4️⃣ findOne()
const findOneByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log(`Personne aimant ${food}:`, person);
    return person;
  } catch (err) {
    console.error(err);
  }
};

// 5️⃣ findById()
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log("Personne trouvée par ID :", person);
    return person;
  } catch (err) {
    console.error(err);
  }
};

// 6️⃣ Find, Edit, Save
const addHamburger = async (personId) => {
  try {
    const person = await Person.findById(personId);
    if (!person) return console.log("Personne introuvable");

    person.favoriteFoods.push("hamburger");
    const updatedPerson = await person.save();
    console.log("Personne mise à jour :", updatedPerson);
    return updatedPerson;
  } catch (err) {
    console.error(err);
  }
};

// 7️⃣ findOneAndUpdate()
const updateAge = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { returnDocument: 'after' } // remplace { new: true }
    );
    console.log("Âge mis à jour :", updatedPerson);
    return updatedPerson;
  } catch (err) {
    console.error(err);
  }
};

// 8️⃣ findByIdAndRemove()
const deleteById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndRemove(personId);
    console.log("Personne supprimée :", removedPerson);
    return removedPerson;
  } catch (err) {
    console.error(err);
  }
};

// 9️⃣ remove()
const removeMary = async () => {
  try {
    const result = await Person.deleteMany({ name: "Mary" });
    console.log("Résultat suppression :", result);
    return result;
  } catch (err) {
    console.error(err);
  }
};


// 🔟 Chaîner les requêtes
const searchBurritoLovers = async () => {
  try {
    const data = await Person.find({ favoriteFoods: "burritos" })
      .sort("name")
      .limit(2)
      .select("-age")
      .exec();
    console.log("Amateurs de burritos :", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Export
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
