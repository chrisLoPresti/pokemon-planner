import { connect } from 'react-redux';
import SelectedTeam from '../../components/SelectedTeam';
import { updateSelectedTeam } from '../../actions/pokemonListActions/pokemonListActions';
import {
  getSelectedPokemonArray,
  getExcludedPokemon
} from '../../selectors/pokemonSelectors';

const mapStateToProps = state => ({
  selectedTeam: getSelectedPokemonArray(state),
  excludedPokemon: getExcludedPokemon(state),
  shiny: state.filters.shiny
});

const mapDispatchToProps = {
  updateSelectedTeam
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedTeam);
