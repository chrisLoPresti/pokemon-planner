import { connect } from 'react-redux';
import { getExcludedPokemon } from '../../selectors/pokemonSelectors';

import { updateExcludedPokemon } from '../../actions/filterActions/filterActions';
import Suggestions from '../../components/Filters/Suggestions';

const mapStateToProps = state => ({
  allPokemon: state.pokemon.allPokemon,
  excludedPokemon: getExcludedPokemon(state)
});

const mapDispatchToProps = {
  updateExcludedPokemon
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suggestions);
