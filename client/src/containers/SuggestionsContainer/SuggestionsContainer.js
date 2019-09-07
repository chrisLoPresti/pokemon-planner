import { connect } from "react-redux";
import { getFilteredPokemon } from "../../selectors/pokemonSelectors";

import { updateExcludePokemon } from "../../actions/filterActions/filterActions";
import PokemonList from "../../components/PokemonList";

const mapStateToProps = state => ({
  filteredPokemon: getFilteredPokemon(state)
});

const mapDispatchToProps = {
  updateExcludePokemon
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList);
