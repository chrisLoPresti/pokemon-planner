import { FILTER_POKEMON_SUCCESS } from "../pokemonListActions/pokemonListActions";

export const UPDATE_FILTER_BY_TYPES = "UPDATE_FILTER_BY_TYPES";
export const UPDATE_SHOW_NAMES = "UPDATE_SHOW_NAMES";
export const UPDATE_SHOW_NUMBERS = "UPDATE_SHOW_NUMBERS";
export const UPDATE_FILTER_BY_MEGAS = "UPDATE_FILTER_BY_MEGAS";
export const UPDATE_FILTER_BY_GENERATION = "UPDATE_FILTER_BY_GENERATION";
export const UPDATE_FILTER_BY_STAGE = "UPDATE_FILTER_BY_STAGE";
export const UPDATE_FILTER_ERROR = "UPDATE_FILTER_ERROR";
export const UPDATE_SEARCH_CRITERIA = "UPDATE_SEARCH_CRITERIA";

export const setFilterError = error => dispatch => {
  dispatch({ type: UPDATE_FILTER_ERROR, payload: error });
};

export const setTypeFilters = types => dispatch => {
  dispatch({ type: UPDATE_FILTER_BY_TYPES, payload: types });
};

export const setShowNames = showNames => dispatch => {
  dispatch({ type: UPDATE_SHOW_NAMES, payload: showNames });
};

export const setShowNumbers = showNumbers => dispatch => {
  dispatch({ type: UPDATE_SHOW_NAMES, payload: showNumbers });
};

export const setShowOnlyMegas = showOnlyMegas => dispatch => {
  dispatch({ type: UPDATE_FILTER_BY_MEGAS, payload: showOnlyMegas });
};

export const setRegionsFilter = generations => dispatch => {
  dispatch({ type: UPDATE_FILTER_BY_GENERATION, payload: generations });
};

export const setStagesFilter = stages => dispatch => {
  dispatch({ type: UPDATE_FILTER_BY_STAGE, payload: stages });
};

export const filterPokemonList = filteredPokemon => dispatch => {
  dispatch({
    type: FILTER_POKEMON_SUCCESS,
    payload: filteredPokemon
  });
};

export const updateSearchCriteria = search => dispatch => {
  dispatch({ type: UPDATE_SEARCH_CRITERIA, payload: search });
};
