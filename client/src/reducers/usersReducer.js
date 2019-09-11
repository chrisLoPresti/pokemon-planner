import { UPDATE_CURRENT_USERS } from '../actions/socketActions/socketActions';

const initialState = {
  usersOnline: -1
};

const contentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CURRENT_USERS: {
      return {
        ...state,
        usersOnline: payload
      };
    }
    default: {
      return state;
    }
  }
};

export default contentReducer;
