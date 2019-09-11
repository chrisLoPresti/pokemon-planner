const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
  nationalNumber: {
    type: String
  },
  name: {
    type: Object
  },
  sprite: {
    type: String
  },
  isLegendary: {
    type: Boolean
  },
  isMythic: {
    type: Boolean
  },
  isMega: {
    type: Boolean
  },
  isPseudo: {
    type: Boolean
  },
  fullyEvolved: {
    type: Boolean
  },
  stage: {
    type: Number
  },
  region: {
    type: String
  },
  form: {
    type: Array
  },
  mythic: {
    type: Boolean
  },
  type: {
    type: Array
  },
  gamesAvailable: {
    type: Object
  }
});

module.exports = Pokemon = mongoose.model('pokemon', PokemonSchema);
