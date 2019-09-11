const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovesSchema = new Schema({
  name: {
    type: String
  },
  accuracy: {
    type: Number
  },
  effect_chance: {
    type: Number
  },
  pp: {
    type: Number
  },
  priority: {
    type: Number
  },
  power: {
    type: Number
  },
  class: {
    type: String
  },
  effect: {
    type: String
  },
  generation: {
    type: String
  },
  type: {
    type: String
  }
});

module.exports = Moves = mongoose.model('moves', MovesSchema);
