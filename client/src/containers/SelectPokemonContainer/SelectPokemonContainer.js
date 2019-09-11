import { connect } from 'react-redux';
import SelectPokemon from '../../components/SelectPokemon';

const mapStateToProps = ({
  filters: { filtersError },
  pokemon: { pokemonListError, loadingPokemon }
}) => ({
  pokemonListError,
  filtersError,
  loadingPokemon
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPokemon);
