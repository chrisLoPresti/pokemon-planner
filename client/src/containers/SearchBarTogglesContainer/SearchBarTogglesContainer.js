import { connect } from 'react-redux';
import SearchBarToggles from '../../components/SearchBarToggles';
import {
  setShowNames,
  setShowNumbers,
  updateSearchCriteria,
  updateShinySprites
} from '../../actions/filterActions/filterActions';
import { updateSelectedTeam } from '../../actions/pokemonListActions/pokemonListActions';
import {
  getShiny,
  getSearch,
  getShowNames,
  getShowNumbers,
  getTotalFilteredPokemon
} from '../../selectors/pokemonSelectors';

const mapStateToProps = state => ({
  showNames: getShowNames(state),
  showNumbers: getShowNumbers(state),
  search: getSearch(state),
  totalFilteredPokemon: getTotalFilteredPokemon(state),
  shiny: getShiny(state)
});

const mapDispatchToProps = {
  setShowNames,
  setShowNumbers,
  updateSearchCriteria,
  updateShinySprites,
  updateSelectedTeam
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarToggles);
