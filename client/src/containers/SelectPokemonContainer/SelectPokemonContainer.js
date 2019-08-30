import { connect } from "react-redux";
import SelectPokemon from "../../components/SelectPokemon";
import {
  addPokemonToDb,
  loadPokemonListRequest,
  updateSelectedPokemon,
  setPokemonListError,
  updateSelectedTeam
} from "../../actions/pokemonListActions/pokemonListActions";

const mapStateToProps = ({
  filters: { showNames, showNumbers, search },
  pokemonList: {
    allPokemon,
    selectedPokemon,
    filteredPokemon,
    selectedTeam,
    pokemonListError,
    loadingPokemon
  }
}) => ({
  search,
  showNames,
  showNumbers,
  allPokemon,
  selectedPokemon,
  selectedTeam,
  filteredPokemon,
  pokemonListError,
  loadingPokemon
});

const mapDispatchToProps = {
  addPokemonToDb,
  loadPokemonListRequest,
  updateSelectedTeam,
  updateSelectedPokemon,
  setPokemonListError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPokemon);
