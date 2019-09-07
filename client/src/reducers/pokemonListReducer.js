import {
  UPDATE_SELECTED_POKEMON,
  LOAD_POKEMON_SUCCESS,
  LOAD_POKEMON_FAILURE,
  SET_POKEMON_LIST_LOADING,
  UPDATE_SELECTED_TEAM,
  SET_POKEMON_LIST_ERROR,
  SET_FILTERED_POKEMON_TOTAL
} from "../actions/pokemonListActions/pokemonListActions";

const mostRecentUpdate = "2019-09-07";

const allPokemonDecision = () => {
  const lastStoredUpdate = JSON.parse(localStorage.getItem("lastStoredUpdate"));
  var currentDate = new Date();
  if (!lastStoredUpdate || currentDate < new Date(mostRecentUpdate)) {
    localStorage.removeItem("lastStoredUpdate");
    localStorage.removeItem("lastStoredUpdate");
    localStorage.setItem("lastStoredUpdate", JSON.stringify(currentDate));
    return [];
  } else {
    return JSON.parse(localStorage.getItem("allPokemon")) || [];
  }
};

const allPokemon = allPokemonDecision();

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
  totalFilteredPokemon: allPokemon ? allPokemon.length : 0
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
