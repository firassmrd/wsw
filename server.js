const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const DBPSW = process.env.DBPSW;
const DBUSER = process.env.DBUSER;

const app = express();

mongoose
  .connect(
    "mongodb+srv://wsss:<123123123F>@contact.ox2tgxt.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

const Person = require("./models/Person");

Person.insertMany([
  { name: "hedi", age: 28, favoriteFoods: ["fricassé", "mtabga", "mlewi"] },
  { name: "habib", age: 24, favoriteFoods: ["makrouna", "broudou", "chorba"] },
  {
    name: "amin",
    age: 24,
    favoriteFoods: ["rechta", "broudou", "chorba", "burritos"],
  },
  {
    name: "Bassem",
    age: 23,
    favoriteFoods: ["lablebi", "spaghetti", "fruit de mer"],
  },
  { name: "Omar", age: 22, favoriteFoods: ["couscous", "jelbena", "me7chi"] },
  { name: "Lmok", age: 24, favoriteFoods: ["rechta", "broudou", "chorba"] },
]);

const personList = async () => {
  const list = await Person.find({});
};
//console.log(personList());

//find one by favorite food
Person.findOne({ favoriteFoods: "rechta" }, (err, data) => {
  if (err) throw err;
  // console.log(data)
});

// find person by ID
let id = "63d293234c4526dc25f0287b";
Person.findById({ _id: id }, (err, data) => {
  if (err) throw err;
  //console.log(data)
});

//find and update
let id2 = "63d293234c4526dc25f0287c";
Person.findOneAndUpdate(
  { _id: id2 },
  { $push: { favoriteFoods: "hamburger" } },
  (err, data) => {
    if (err) throw err;

    console.log(data);
  }
);
// find one and delete
let id3 = "63d2929d1e1d37507525ce0b";
Person.findByIdAndRemove({ _id: id3 }, (err) => {
  if (err) throw err;
  //console.log('Deleted successfully');
});

//check if delete
Person.findById({ _id: id3 }, (err, data) => {
  if (err) throw err;
  //console.log(data)
});

// delete many
Person.deleteMany({ name: "Mary" }, (err) => {
  if (err) throw err;
  //console.log('Mary is removed');
});
//Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: "burritos" })
  .limit(2)
  .sort({ firstName: 1 })
  .select({ age: true })
  .exect()
  .then((docs) => {
    console.log(docs);
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("server is up and running .....");
});
