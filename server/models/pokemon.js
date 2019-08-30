const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
  nationalNumber: {
    type: String
  },
  name_eng: {
    type: String
  },
  name_jap: {
    type: String
  },
  region: {
    type: String
  },
  generation: {
    type: Number
  },
  shinyLocked: {
    type: Boolean
  },
  variations: {
    type: Array
  },
  type1: {
    type: String
  },
  type2: {
    type: String
  },
  stage: {
    type: Number
  },
  fullyEvolved: {
    type: Boolean
  },
  legendary: {
    type: Boolean
  },
  mythic: {
    type: Boolean
  },
  psuedoLegendary: {
    type: Boolean
  },
  spriteExtension: {
    type: String
  }
});

module.exports = Pokemon = mongoose.model("pokemon", PokemonSchema);
