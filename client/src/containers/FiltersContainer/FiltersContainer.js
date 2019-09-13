import { connect } from 'react-redux';
import Filters from '../../components/Filters';
import {
  updateFilterError,
  updateFilterValue
} from '../../actions/filterActions/filterActions';

const mapStateToProps = ({
  filters: {
    onlyTypes,
    onlyMegas,
    onlyLegendary,
    onlyMythic,
    onlyPseudo,
    onlyRegions,
    onlyStages,
    filtersError,
    excludedPokemon,
    onlyGame
  }
}) => ({
  onlyTypes,
  onlyMegas,
  onlyLegendary,
  onlyMythic,
  onlyPseudo,
  onlyRegions,
  onlyStages,
  filtersError,
  excludedPokemon,
  onlyGame
});

const mapDispatchToProps = {
  updateFilterError,
  updateFilterValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
