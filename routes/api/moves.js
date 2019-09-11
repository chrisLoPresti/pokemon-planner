const express = require('express');
const router = express.Router();
const Moves = require('../../models/moves');
// @route  abilities api/content
// @desc   Create ability
// @access Private
router.post('/newMove', (req, res) => {
  const { errors } = {};
  const newMove = new Moves({
    name: req.body.name,
    accuracy: req.body.accuracy,
    effect_chance: req.body.effect_chance,
    pp: req.body.pp,
    priority: req.body.priority,
    power: req.body.power,
    class: req.body.damage_class.name,
    effect: req.body.effect_entries.short_effect,
    generation: req.body.generation ? req.body.generation.name : '',
    type: req.body.type.name
  });
  newMove.save().then(ability => res.json({ success: true }));
});

module.exports = router;
