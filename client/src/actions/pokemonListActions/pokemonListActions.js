import { CALL_API } from '../../middleware/api';
import { pokemonListScheme } from '../schemas/pokemonSchemas';

export const UPDATE_SELECTED_POKEMON = 'UPDATE_SELECTED_POKEMON';
export const LOAD_POKEMON_REQUEST = 'LOAD_POKEMON_REQUEST';
export const LOAD_POKEMON_SUCCESS = 'LOAD_POKEMON_SUCCESS';
export const LOAD_POKEMON_FAILURE = 'LOAD_POKEMON_FAILURE';
export const FILTER_POKEMON_SUCCESS = 'FILTER_POKEMON_SUCCESS';
export const SET_POKEMON_LIST_LOADING = 'SET_POKEMON_LIST_LOADING';
export const UPDATE_SELECTED_TEAM = 'UPDATE_SELECTED_TEAM';
export const SET_POKEMON_LIST_ERROR = 'SET_POKEMON_LIST_ERROR';
export const SET_FILTERED_POKEMON_TOTAL = 'SET_FILTERED_POKEMON_TOTAL';

const fetchPokemonList = () => ({
  [CALL_API]: {
    endpoint: 'pokemon/pokemonList',
    types: [LOAD_POKEMON_REQUEST, LOAD_POKEMON_SUCCESS, LOAD_POKEMON_FAILURE],
    useCache: true,
    schema: pokemonListScheme
  }
});

const setPokemonListLoading = () => {
  return { type: SET_POKEMON_LIST_LOADING };
};

export const setFilteredPokemonTotal = total => dispatch => {
  dispatch({ type: SET_FILTERED_POKEMON_TOTAL, payload: total });
};

export const setPokemonListError = error => dispatch => {
  dispatch({ type: SET_POKEMON_LIST_ERROR, payload: error });
};

export const loadPokemonListRequest = () => dispatch => {
  dispatch(setPokemonListLoading());
  return setTimeout(() => {
    dispatch(fetchPokemonList());
  }, 2000);
};

export const updateSelectedTeam = selectedTeam => dispatch => {
  dispatch({
    type: UPDATE_SELECTED_TEAM,
    payload: selectedTeam
  });
};

export const updateSelectedPokemon = selectedPokemon => dispatch => {
  dispatch({
    type: UPDATE_SELECTED_POKEMON,
    payload: selectedPokemon
  });
};
