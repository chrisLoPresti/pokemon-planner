import { connect } from 'react-redux';
import TypesDrawer from '../../components/TypesDrawer';
import {
  getFilteredPokemon,
  getSelectedPokemonArray
} from '../../selectors/pokemonSelectors';

const mapStateToProps = state => ({
  filteredPokemon: getFilteredPokemon(state),
  selectedTeam: getSelectedPokemonArray(state)
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypesDrawer);
