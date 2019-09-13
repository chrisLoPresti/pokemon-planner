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
  UPDATE_SELECTED_GAME,
  UPDATE_ALL_FILTERS
} from '../actions/filterActions/filterActions';
import { stages } from '../constants/filters';

const initialState = {
  onlyTypes: [],
  search: '',
  showNames: false,
  showNumbers: true,
  onlyLegendary: false,
  onlyMythic: false,
  onlyPseudo: false,
  onlyMegas: false,
  onlyRegions: [],
  onlyStages: [],
  filtersError: null,
  shiny: false,
  excludedPokemon: [],
  onlyGame: ''
};

const contentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_ALL_FILTERS: {
      return {
        ...state,
        ...payload
      };
    }
    case UPDATE_FILTER_BY_TYPES: {
      return {
        ...state,
        onlyTypes: payload,
        filtersError: null
      };
    }
    case UPDATE_SELECTED_GAME: {
      return {
        ...state,
        onlyGame: payload,
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
        onlyMegas: payload,
        filtersError: null
      };
    }
    case UPDATE_FILTER_BY_LEGENDARY: {
      return {
        ...state,
        onlyLegendary: payload,
        filtersError: null
      };
    }
    case UPDATE_FILTER_BY_MYTHIC: {
      return {
        ...state,
        onlyMythic: payload,
        filtersError: null
      };
    }
    case UPDATE_FILTER_BY_PSEUDO: {
      return {
        ...state,
        onlyPseudo: payload,
        filtersError: null
      };
    }
    case UPDATE_FILTER_BY_GENERATION: {
      return {
        ...state,
        onlyRegions: payload,
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
        onlyStages: payload,
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
