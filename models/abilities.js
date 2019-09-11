const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AbilitiesSchema = new Schema({
  name: {
    type: String
  },
  effect: {
    type: String
  },
  generation: {
    type: String
  },
  id: {
    type: Number
  },
  is_main_series: {
    type: Boolean
  },
  pokemon: {
    type: Array
  }
});

module.exports = Abilities = mongoose.model('abilities', AbilitiesSchema);
