const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const passport = require("passport");

const Pokemon = require("../../models/pokemon");

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

// @route  SiteContent api/content
// @desc   Create siteContent
// @access Private
router.post("/pokemonList", (req, res) => {
  console.log("here!", req);
  const { errors } = {};
  const newPokemon = new Pokemon({
    ...req.body
  });
  newPokemon.save().then(pokemon => res.json({ success: true }));
});

// // @route  SiteContent api/site-content/:id
// // @desc   Add to a content bundle
// // @access Private
// router.post("/update/:id", (req, res) => {
//   const errors = {};
//   SiteContent.findOne({ id: req.params.id })
//     .then(siteContent => {
//       req.body.content.forEach(
//         pair => (siteContent.bundles[req.body.bundle][pair.key] = pair.value)
//       );
//       siteContent.markModified("bundles");
//       siteContent.save().then(result => res.json(result));
//     })
//     .catch(err =>
//       res.status(404).json({
//         bundleNotFound: `No matching bundle found with id '${req.params.id}'`
//       })
//     );
// });

module.exports = router;
