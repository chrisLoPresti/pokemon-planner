import { combineReducers } from 'redux';
import { ignoreActions } from 'redux-ignore';
import pokemonList from './pokemonListReducer';
import filters from './filtersReducer';
import users from './usersReducer';

export default combineReducers({
  pokemon: ignoreActions(pokemonList, ['UPDATE_SEARCH_CRITERIA']),
  filters,
  users
});
