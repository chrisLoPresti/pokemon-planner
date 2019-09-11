export const SUBSCRIBE_T0_USER_COUNT = "SUBSCRIBE_T0_USER_COUNT";
export const UPDATE_CURRENT_USERS = "SET_CURRENT_USERS";

export const subscribeToUserCount = () => dispatch => {
  dispatch({
    event: SUBSCRIBE_T0_USER_COUNT,
    handle: count => dispatch({ type: UPDATE_CURRENT_USERS, payload: count })
  });
};
