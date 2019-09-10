const express = require("express");
const router = express.Router();
const Abilities = require("../../models/abilities");

// @route  abilities api/content
// @desc   Create ability
// @access Private
router.post("/newAbility", (req, res) => {
  const { errors } = {};
  const newAbility = new Abilities({
    name: req.body.name,
    effect: req.body.data.effect_entries.short_effect,
    generation: req.body.data.generation ? req.body.data.generation.name : "",
    id: req.body.data.id,
    is_main_series: req.body.data.is_main_series,
    pokemon: req.body.data.pokemon.map(({ is_hidden, pokemon }) => ({
      is_hidden,
      name: pokemon.name
    }))
  });
  newAbility.save().then(ability => res.json({ success: true }));
});

module.exports = router;
