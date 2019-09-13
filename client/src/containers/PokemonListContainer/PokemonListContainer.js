import { connect } from 'react-redux';
import {
  getFilteredPokemon,
  getSelectedTeam,
  getSelectedPokemon,
  getListError,
  getLoaded,
  getLoading,
  getTotalFilteredPokemon,
  getShowNumbers,
  getShowNames,
  getSelectedGame
} from '../../selectors/pokemonSelectors';

import {
  loadPokemonListRequest,
  setPokemonListError,
  updateSelectedTeam,
  updateSelectedPokemon,
  setFilteredPokemonTotal
} from '../../actions/pokemonListActions/pokemonListActions';
import PokemonList from '../../components/PokemonList';

const mapStateToProps = state => ({
  filteredPokemon: getFilteredPokemon(state),
  selectedPokemon: getSelectedPokemon(state),
  selectedTeam: getSelectedTeam(state),
  pokemonListError: getListError(state),
  loadingPokemon: getLoading(state),
  pokemonLoaded: getLoaded(state),
  totalFilteredPokemon: getTotalFilteredPokemon(state),
  showNumbers: getShowNumbers(state),
  showNames: getShowNames(state),
  onlyGame: getSelectedGame(state)
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
