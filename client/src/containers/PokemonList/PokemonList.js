import { connect } from "react-redux";
import {
  getFilteredPokemon,
  getSelectedTeam,
  getSelectedPokemon,
  getListError,
  getLoaded,
  getLoading,
  getTotalFilteredPokemon
} from "../../selectors/pokemonSelectors";

import {
  loadPokemonListRequest,
  setPokemonListError,
  updateSelectedTeam,
  updateSelectedPokemon,
  setFilteredPokemonTotal
} from "../../actions/pokemonListActions/pokemonListActions";
import PokemonList from "../../components/PokemonList";

const mapStateToProps = state => ({
  filteredPokemon: getFilteredPokemon(state),
  selectedPokemon: getSelectedPokemon(state),
  selectedTeam: getSelectedTeam(state),
  pokemonListError: getListError(state),
  loadingPokemon: getLoading(state),
  pokemonLoaded: getLoaded(state),
  totalFilteredPokemon: getTotalFilteredPokemon(state),
  showNumbers: state.filters.showNumbers,
  showNames: state.filters.showNames,
  shiny: state.filters.shiny
});

const mapDispatchToProps = {
  loadPokemonListRequest,
  updateSelectedPokemon,
  setPokemonListError,
  updateSelectedTeam,
  setFilteredPokemonTotal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList);
