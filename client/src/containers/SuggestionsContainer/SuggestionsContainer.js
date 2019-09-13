import { connect } from 'react-redux';
import {
  getAllPokemon,
  getExcludedPokemon
} from '../../selectors/pokemonSelectors';

import { updateFilterByExcluded } from '../../actions/filterActions/filterActions';
import Suggestions from '../../components/Filters/Suggestions';

const mapStateToProps = state => ({
  allPokemon: getAllPokemon(state),
  excludedPokemon: getExcludedPokemon(state)
});

const mapDispatchToProps = {
  updateFilterByExcluded
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suggestions);
