import { connect } from 'react-redux';
import SelectPokemon from '../../components/SelectPokemon';
import {
  getFiltersError,
  getListError,
  getLoading
} from '../../selectors/pokemonSelectors';

const mapStateToProps = state => ({
  pokemonListError: getListError(state),
  filtersError: getFiltersError(state),
  loadingPokemon: getLoading(state)
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPokemon);
