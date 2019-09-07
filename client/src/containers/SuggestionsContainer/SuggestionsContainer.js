import { connect } from "react-redux";
import {
  getFilteredPokemon,
  getExcludedPokemon
} from "../../selectors/pokemonSelectors";

import { updateExcludedPokemon } from "../../actions/filterActions/filterActions";
import Suggestions from "../../components/Filters/Suggestions";

const mapStateToProps = state => ({
  filteredPokemon: getFilteredPokemon(state),
  excludedPokemon: getExcludedPokemon(state)
});

const mapDispatchToProps = {
  updateExcludedPokemon
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suggestions);
