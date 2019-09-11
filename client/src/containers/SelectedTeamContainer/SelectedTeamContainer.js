import { connect } from 'react-redux';
import SelectedTeam from '../../components/SelectedTeam';
import { updateSelectedTeam } from '../../actions/pokemonListActions/pokemonListActions';
import {
  getSelectedPokemonArray,
  getExcludedPokemon,
  getShiny
} from '../../selectors/pokemonSelectors';

const mapStateToProps = state => ({
  selectedTeam: getSelectedPokemonArray(state),
  excludedPokemon: getExcludedPokemon(state),
  shiny: getShiny(state)
});

const mapDispatchToProps = {
  updateSelectedTeam
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedTeam);
