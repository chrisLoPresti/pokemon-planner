import { connect } from 'react-redux';
import Filters from '../../components/Filters';
import {
  setFilterError,
  updateFilterByTypes,
  updateFilterByMegas,
  updateFilterByRegions,
  updateFilterByStages,
  updateFilterByLegendary,
  updateFilterByMythic,
  updateFilterByPseudo,
  updateExcludedPokemon,
  updateSelectedGame
} from '../../actions/filterActions/filterActions';

const mapStateToProps = ({
  filters: {
    filterByTypes,
    showOnlyMegas,
    showOnlyLegendary,
    showOnlyMythic,
    showOnlyPseudo,
    filterByRegions,
    filterByStages,
    filtersError,
    excludedPokemon,
    selectedGame
  }
}) => ({
  filterByTypes,
  showOnlyMegas,
  showOnlyLegendary,
  showOnlyMythic,
  showOnlyPseudo,
  filterByRegions,
  filterByStages,
  filtersError,
  excludedPokemon,
  selectedGame
});

const mapDispatchToProps = {
  setFilterError,
  updateFilterByTypes,
  updateFilterByMegas,
  updateFilterByRegions,
  updateFilterByStages,
  updateFilterByLegendary,
  updateFilterByMythic,
  updateFilterByPseudo,
  updateExcludedPokemon,
  updateSelectedGame
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
