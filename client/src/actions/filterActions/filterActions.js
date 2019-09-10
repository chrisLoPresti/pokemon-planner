export const UPDATE_FILTER_BY_TYPES = "UPDATE_FILTER_BY_TYPES";
export const UPDATE_SHOW_NAMES = "UPDATE_SHOW_NAMES";
export const UPDATE_SHOW_NUMBERS = "UPDATE_SHOW_NUMBERS";
export const UPDATE_FILTER_BY_MEGAS = "UPDATE_FILTER_BY_MEGAS";
export const UPDATE_FILTER_BY_GENERATION = "UPDATE_FILTER_BY_GENERATION";
export const UPDATE_FILTER_BY_STAGE = "UPDATE_FILTER_BY_STAGE";
export const UPDATE_FILTER_ERROR = "UPDATE_FILTER_ERROR";
export const UPDATE_SEARCH_CRITERIA = "UPDATE_SEARCH_CRITERIA";
export const UPDATE_FILTER_BY_LEGENDARY = "UPDATE_FILTER_BY_LEGENDARY";
export const UPDATE_FILTER_BY_MYTHIC = "UPDATE_FILTER_BY_MYTHIC";
export const UPDATE_FILTER_BY_PSEUDO = "UPDATE_FILTER_BY_PSEUDO";
export const UPDATE_SHINY_SPRITES = "UPDATE_SHINY_SPRITES";
export const UPDATE_EXCLUDED_POKEMON = "UPDATE_EXCLUDED_POKEMON";
export const UPDATE_SELECTED_GAME = "UPDATE_SELECTED_GAME";

export const setFilterError = error => dispatch => {
  dispatch({ type: UPDATE_FILTER_ERROR, payload: error });
};

export const updateFilterByTypes = types => dispatch => {
  dispatch({ type: UPDATE_FILTER_BY_TYPES, payload: types });
};

export const updateExcludedPokemon = excludedPokemon => dispatch => {
  dispatch({ type: UPDATE_EXCLUDED_POKEMON, payload: excludedPokemon });
};

export const updateSelectedGame = selectedGame => dispatch => {
  dispatch({ type: UPDATE_SELECTED_GAME, payload: selectedGame });
};

export const setShowNames = showNames => dispatch => {
  dispatch({ type: UPDATE_SHOW_NAMES, payload: showNames });
};

export const setShowNumbers = showNumbers => dispatch => {
  dispatch({ type: UPDATE_SHOW_NUMBERS, payload: showNumbers });
};

export const updateFilterByMegas = showOnlyMegas => dispatch => {
  dispatch({ type: UPDATE_FILTER_BY_MEGAS, payload: showOnlyMegas });
};

export const updateShinySprites = showShiny => dispatch => {
  dispatch({ type: UPDATE_SHINY_SPRITES, payload: showShiny });
};

export const updateFilterByRegions = generations => dispatch => {
  dispatch({ type: UPDATE_FILTER_BY_GENERATION, payload: generations });
};

export const updateFilterByStages = stages => dispatch => {
  dispatch({ type: UPDATE_FILTER_BY_STAGE, payload: stages });
};

export const updateSearchCriteria = search => dispatch => {
  dispatch({ type: UPDATE_SEARCH_CRITERIA, payload: search });
};
export const updateFilterByLegendary = showOnlyLegendary => dispatch => {
  dispatch({ type: UPDATE_FILTER_BY_LEGENDARY, payload: showOnlyLegendary });
};
export const updateFilterByMythic = showOnlyMythic => dispatch => {
  dispatch({ type: UPDATE_FILTER_BY_MYTHIC, payload: showOnlyMythic });
};
export const updateFilterByPseudo = showOnlyPseudo => dispatch => {
  dispatch({ type: UPDATE_FILTER_BY_PSEUDO, payload: showOnlyPseudo });
};
