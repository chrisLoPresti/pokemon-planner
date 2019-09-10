const express = require("express");
const router = express.Router();
const Pokemon = require("../../models/pokemon");
const Stats = require("../../models/stats");

// @route  Get api/Pokemon
// @desc   Get all pokemon
// @access Public
router.get("/pokemonList", (req, res) => {
  const errors = {};

  Pokemon.find()
    .then(pokemonList => {
      const objectToArray = Object.keys(pokemonList).map(
        key => pokemonList[key]
      );
      const sortedObject = objectToArray.sort(
        (pokemon1, pokemon2) =>
          +pokemon1.nationalNumber - +pokemon2.nationalNumber
      );
      res.json(sortedObject);
    })
    .catch(err => {
      errors.content = "There are no pokemon";
      res.status(404).json(errors);
    });
});

// @route  pokemon api/content
// @desc   Create pokemon
// @access Private
router.post("/pokemonList", (req, res) => {
  const { errors } = {};
  const newPokemon = new Pokemon({
    ...req.body
  });
  newPokemon.save().then(pokemon => res.json({ success: true }));
});

// @route  stats api/content
// @desc   Create stats
// @access Private
router.post("/pokemonStats", (req, res) => {
  const { errors } = {};

  const newStat = new Stats({
    nationalNumber: req.body.nationalNumber,
    name_eng: req.body.name_eng,
    hp: +req.body.hp,
    attack: +req.body.attack,
    defense: +req.body.defense,
    spAttack: +req.body.spAttack,
    spDefense: +req.body.spDefense,
    speed: +req.body.speed
  });
  newStat.save().then(stat => res.json({ success: true }));
});

// @route  stats api/update
// @desc   adds whatever we need to the pokemon object
// @access Private
// router.post("/update", (req, res) => {
//   console.log(req.body.name);
//   Pokemon.findOneAndUpdate(
//     { "name.english": req.body.name },
//     { $set: { "gamesAvailable.USUM": req.body.number } },
//     { new: true }
//   ).then(stat => res.json({ success: true }));
// });

// @route  stats api/update
// @desc   check empty fields
// @access Private
// router.get("/check", (req, res) => {
//   Pokemon.find({ gamesAvailable: null }).then(missing => res.json(missing));
// });

module.exports = router;
