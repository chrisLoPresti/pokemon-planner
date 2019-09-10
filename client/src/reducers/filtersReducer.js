import {
  UPDATE_SEARCH_CRITERIA,
  UPDATE_FILTER_BY_TYPES,
  UPDATE_SHOW_NAMES,
  UPDATE_SHOW_NUMBERS,
  UPDATE_FILTER_BY_MEGAS,
  UPDATE_FILTER_BY_GENERATION,
  UPDATE_FILTER_BY_STAGE,
  UPDATE_FILTER_BY_LEGENDARY,
  UPDATE_FILTER_BY_MYTHIC,
  UPDATE_FILTER_BY_PSEUDO,
  UPDATE_FILTER_ERROR,
  UPDATE_SHINY_SPRITES,
  UPDATE_EXCLUDED_POKEMON,
  UPDATE_SELECTED_GAME
} from "../actions/filterActions/filterActions";

const initialState = {
  filterByTypes: [],
  search: "",
  showNames: false,
  showNumbers: true,
  showOnlyLegendary: false,
  showOnlyMythic: false,
  showOnlyPseudo: false,
  showOnlyMegas: false,
  filterByRegions: [],
  filterByStages: [],
  filtersError: null,
  shiny: false,
  excludedPokemon: [],
  selectedGame: ""
};

const contentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_FILTER_BY_TYPES: {
      return {
        ...state,
        filterByTypes: payload,
        filtersError: null
      };
    }
    case UPDATE_SELECTED_GAME: {
      return {
        ...state,
        selectedGame: payload,
        filtersError: null
      };
    }
    case UPDATE_EXCLUDED_POKEMON: {
      return {
        ...state,
        excludedPokemon: payload,
        filtersError: null
      };
    }
    case UPDATE_SHINY_SPRITES: {
      return {
        ...state,
        shiny: payload,
        filtersError: null
      };
    }
    case UPDATE_SHOW_NAMES: {
      return {
        ...state,
        showNames: payload,
        filtersError: null
      };
    }
    case UPDATE_SHOW_NUMBERS: {
      return {
        ...state,
        showNumbers: payload,
        filtersError: null
      };
    }
    case UPDATE_FILTER_BY_MEGAS: {
      return {
        ...state,
        showOnlyMegas: payload,
        filtersError: null
      };
    }
    case UPDATE_FILTER_BY_LEGENDARY: {
      return {
        ...state,
        showOnlyLegendary: payload,
        filtersError: null
      };
    }
    case UPDATE_FILTER_BY_MYTHIC: {
      return {
        ...state,
        showOnlyMythic: payload,
        filtersError: null
      };
    }
    case UPDATE_FILTER_BY_PSEUDO: {
      return {
        ...state,
        showOnlyPseudo: payload,
        filtersError: null
      };
    }
    case UPDATE_FILTER_BY_GENERATION: {
      return {
        ...state,
        filterByRegions: payload,
        filtersError: null
      };
    }
    case UPDATE_SEARCH_CRITERIA: {
      return {
        ...state,
        search: payload,
        filtersError: null
      };
    }
    case UPDATE_FILTER_BY_STAGE: {
      return {
        ...state,
        filterByStages: payload,
        filtersError: null
      };
    }
    case UPDATE_FILTER_ERROR: {
      return {
        ...state,
        filtersError: payload
      };
    }
    default: {
      return state;
    }
  }
};

export default contentReducer;
