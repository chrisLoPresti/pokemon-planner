import {
  UPDATE_SELECTED_POKEMON,
  LOAD_POKEMON_SUCCESS,
  LOAD_POKEMON_FAILURE,
  FILTER_POKEMON_SUCCESS,
  SET_POKEMON_LIST_LOADING,
  UPDATE_SELECTED_TEAM,
  SET_POKEMON_LIST_ERROR
} from "../actions/pokemonListActions/pokemonListActions";

const allPokemon = JSON.parse(localStorage.getItem("allPokemon")) || [];

const initialState = {
  allPokemon,
  selectedPokemon: {},
  filteredPokemon: allPokemon,
  selectedTeam: [],
  pokemonListError: null,
  loadingPokemon: false
};

const contentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_POKEMON_LIST_ERROR: {
      return {
        ...state,
        pokemonListError: payload
      };
    }
    case UPDATE_SELECTED_POKEMON: {
      return {
        ...state,
        selectedPokemon: payload,
        pokemonListError: null,
        loadingPokemon: false
      };
    }
    case LOAD_POKEMON_SUCCESS: {
      localStorage.setItem("allPokemon", JSON.stringify(payload));
      return {
        ...state,
        allPokemon: [...payload],
        filteredPokemon: [...payload],
        pokemonListError: null,
        loadingPokemon: false
      };
    }
    case LOAD_POKEMON_FAILURE: {
      return {
        ...state,
        loadingPokemon: false,
        pokemonListError: payload
      };
    }
    case FILTER_POKEMON_SUCCESS: {
      return {
        ...state,
        filteredPokemon: payload,
        loadingPokemon: false,
        pokemonListError: null
      };
    }
    case SET_POKEMON_LIST_LOADING: {
      return {
        ...state,
        loadingPokemon: true
      };
    }
    case UPDATE_SELECTED_TEAM: {
      return {
        ...state,
        selectedTeam: [...payload]
      };
    }
    default: {
      return state;
    }
  }
};

export default contentReducer;
