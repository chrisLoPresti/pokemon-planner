import { combineReducers } from "redux";
import pokemonList from "./pokemonListReducer";
import filters from "./filtersReducer";

export default combineReducers({
  pokemonList,
  filters
});
