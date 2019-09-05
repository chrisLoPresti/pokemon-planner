import { connect } from "react-redux";
import SearchBarToggles from "../../components/SearchBarToggles";
import {
  setShowNames,
  setShowNumbers,
  updateSearchCriteria,
  updateShinySprites
} from "../../actions/filterActions/filterActions";
import { updateSelectedTeam } from "../../actions/pokemonListActions/pokemonListActions";

const mapStateToProps = ({
  pokemon: { totalFilteredPokemon },
  filters: { showNames, showNumbers, search, shiny }
}) => ({
  showNames,
  showNumbers,
  search,
  totalFilteredPokemon,
  shiny
});

const mapDispatchToProps = {
  setShowNames,
  setShowNumbers,
  updateSearchCriteria,
  updateShinySprites,
  updateSelectedTeam
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarToggles);
