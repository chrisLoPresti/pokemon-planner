import { connect } from "react-redux";
import Filters from "../../components/Filters";
import {
  setFilterError,
  setTypeFilters,
  setShowOnlyMegas,
  setRegionsFilter,
  setStagesFilter,
  filterPokemonList
} from "../../actions/filterActions/filterActions";

const mapStateToProps = ({
  filters: {
    filterByTypes,
    showOnlyMegas,
    filterByRegions,
    filterByStages,
    filtersError
  },
  pokemonList: { allPokemon }
}) => ({
  allPokemon,
  filterByTypes,
  showOnlyMegas,
  filterByRegions,
  filterByStages,
  filtersError
});

const mapDispatchToProps = {
  setFilterError,
  setTypeFilters,
  setShowOnlyMegas,
  setRegionsFilter,
  setStagesFilter,
  filterPokemonList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
