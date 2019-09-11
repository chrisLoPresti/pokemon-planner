import { combineReducers } from 'redux';
import { ignoreActions } from 'redux-ignore';
import pokemon from './pokemonListReducer';
import filters from './filtersReducer';
import users from './usersReducer';

export default combineReducers({
  pokemon,
  filters,
  users
});
