import {
  UPDATE_SELECTED_POKEMON,
  LOAD_POKEMON_SUCCESS,
  LOAD_POKEMON_FAILURE,
  SET_POKEMON_LIST_LOADING,
  UPDATE_SELECTED_TEAM,
  SET_POKEMON_LIST_ERROR,
  SET_FILTERED_POKEMON_TOTAL
} from "../actions/pokemonListActions/pokemonListActions";
import Cookies from "js-cookie";
const dev = process.env.NODE_ENV === "development";

const allPokemon = dev
  ? JSON.parse(localStorage.getItem("allPokemon")) || []
  : Cookies.get("allPokemon") || [];

const initialState = {
  allPokemon: allPokemon,
  selectedPokemon: {
    count: 0
  },
  selectedTeam: {
    count: 0,
    hasMega: false
  },
  pokemonListError: null,
  loadingPokemon: false,
  pokemonLoaded: allPokemon.length ? true : false,
  totalFilteredPokemon: allPokemon.length ? allPokemon.length : 0
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
      if (dev) {
        JSON.parse(localStorage.getItem("allPokemon"));
      } else {
        Cookies.set("allPokemon", payload, { expires: 7 });
      }
      return {
        ...state,
        allPokemon: payload,
        pokemonLoaded: true,

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
    case SET_POKEMON_LIST_LOADING: {
      return {
        ...state,
        loadingPokemon: true
      };
    }
    case UPDATE_SELECTED_TEAM: {
      return {
        ...state,
        selectedTeam: payload
      };
    }
    case SET_FILTERED_POKEMON_TOTAL: {
      return {
        ...state,
        totalFilteredPokemon: payload
      };
    }
    default: {
      return state;
    }
  }
};

export default contentReducer;
