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
  updateFilterByPseudo
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
    filtersError
  }
}) => ({
  filterByTypes,
  showOnlyMegas,
  showOnlyLegendary,
  showOnlyMythic,
  showOnlyPseudo,
  filterByRegions,
  filterByStages,
  filtersError
});

const mapDispatchToProps = {
  setFilterError,
  updateFilterByTypes,
  updateFilterByMegas,
  updateFilterByRegions,
  updateFilterByStages,
  updateFilterByLegendary,
  updateFilterByMythic,
  updateFilterByPseudo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
