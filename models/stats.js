const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatsSchema = new Schema({
  nationalNumber: {
    type: String
  },
  name_eng: {
    type: String,
    required: true
  },
  hp: {
    type: Number
  },
  attack: {
    type: Number
  },
  defense: {
    type: Number
  },
  spAttack: {
    type: Number
  },
  spDefense: {
    type: Number
  },
  speed: {
    type: Number
  },
  total: {
    type: Number
  },
  avg: {
    type: Number
  }
});

module.exports = Stats = mongoose.model('stats', StatsSchema);
