import { connect } from "react-redux";
import Filters from "../../components/Filters";
import {
  setFilterError,
  updateFilterByTypes,
  updateFilterByMegas,
  updateFilterByRegions,
  updateFilterByStages,
  updateFilterByLegendary,
  updateFilterByMythic,
  updateFilterByPseudo,
  updateExcludedPokemon
} from "../../actions/filterActions/filterActions";

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
    excludedPokemon
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
  excludedPokemon
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
  updateExcludedPokemon
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
