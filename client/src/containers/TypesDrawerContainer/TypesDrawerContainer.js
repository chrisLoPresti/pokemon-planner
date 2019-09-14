import { connect } from 'react-redux';
import TypesDrawer from '../../components/TypesDrawer';
import { getSelectedPokemonArray } from '../../selectors/pokemonSelectors';

const mapStateToProps = state => ({
  selectedTeam: getSelectedPokemonArray(state)
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypesDrawer);
