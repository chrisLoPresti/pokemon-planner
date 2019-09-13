export const UPDATE_FILTER_BY_TYPES = 'UPDATE_FILTER_BY_TYPES';
export const UPDATE_SHOW_NAMES = 'UPDATE_SHOW_NAMES';
export const UPDATE_SHOW_NUMBERS = 'UPDATE_SHOW_NUMBERS';
export const UPDATE_FILTER_BY_MEGAS = 'UPDATE_FILTER_BY_MEGAS';
export const UPDATE_FILTER_BY_GENERATION = 'UPDATE_FILTER_BY_GENERATION';
export const UPDATE_FILTER_BY_STAGE = 'UPDATE_FILTER_BY_STAGE';
export const UPDATE_FILTER_ERROR = 'UPDATE_FILTER_ERROR';
export const UPDATE_SEARCH_CRITERIA = 'UPDATE_SEARCH_CRITERIA';
export const UPDATE_FILTER_BY_LEGENDARY = 'UPDATE_FILTER_BY_LEGENDARY';
export const UPDATE_FILTER_BY_MYTHIC = 'UPDATE_FILTER_BY_MYTHIC';
export const UPDATE_FILTER_BY_PSEUDO = 'UPDATE_FILTER_BY_PSEUDO';
export const UPDATE_SHINY_SPRITES = 'UPDATE_SHINY_SPRITES';
export const UPDATE_EXCLUDED_POKEMON = 'UPDATE_EXCLUDED_POKEMON';
export const UPDATE_SELECTED_GAME = 'UPDATE_SELECTED_GAME';
export const UPDATE_ALL_FILTERS = 'UPDATE_ALL_FILTERS';

const mapping = {
  onlyTypes: UPDATE_FILTER_BY_TYPES,
  onlyMegas: UPDATE_FILTER_BY_MEGAS,
  onlyRegions: UPDATE_FILTER_BY_GENERATION,
  onlyStages: UPDATE_FILTER_BY_STAGE,
  onlyLegendary: UPDATE_FILTER_BY_LEGENDARY,
  onlyMythic: UPDATE_FILTER_BY_MYTHIC,
  onlyPseudo: UPDATE_FILTER_BY_PSEUDO,
  excludedPokemon: UPDATE_EXCLUDED_POKEMON,
  onlyGame: UPDATE_SELECTED_GAME
};

export const updateAllFilters = newFilters => dispatch => {
  dispatch({ type: UPDATE_ALL_FILTERS, payload: newFilters });
};

export const updateFilterValue = (type, value) => dispatch => {
  dispatch({ type: mapping[type], payload: value });
};

export const updateFilterError = error => dispatch => {
  dispatch({ type: UPDATE_FILTER_ERROR, payload: error });
};

export const updateFilterByExcluded = excludedPokemon => dispatch => {
  dispatch({ type: UPDATE_EXCLUDED_POKEMON, payload: excludedPokemon });
};
export const setShowNames = showNames => dispatch => {
  dispatch({ type: UPDATE_SHOW_NAMES, payload: showNames });
};

export const setShowNumbers = showNumbers => dispatch => {
  dispatch({ type: UPDATE_SHOW_NUMBERS, payload: showNumbers });
};

export const updateShinySprites = showShiny => dispatch => {
  dispatch({ type: UPDATE_SHINY_SPRITES, payload: showShiny });
};

export const updateSearchCriteria = search => dispatch => {
  dispatch({ type: UPDATE_SEARCH_CRITERIA, payload: search });
};
