import {
  UPDATE_SEARCH_CRITERIA,
  UPDATE_FILTER_BY_TYPES,
  UPDATE_SHOW_NAMES,
  UPDATE_SHOW_NUMBERS,
  UPDATE_FILTER_BY_MEGAS,
  UPDATE_FILTER_BY_GENERATION,
  UPDATE_FILTER_BY_STAGE,
  UPDATE_FILTER_ERROR
} from "../actions/filterActions/filterActions";

const initialState = {
  filterByTypes: [],
  search: "",
  showNames: false,
  showNumbers: true,
  showOnlyMegas: false,
  filterByGenerations: [],
  filterByStages: [],
  filtersError: null
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
    case UPDATE_FILTER_BY_GENERATION: {
      return {
        ...state,
        filterByGenerations: payload,
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
