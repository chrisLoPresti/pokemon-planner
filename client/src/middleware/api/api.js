import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const cache = setupCache({
  maxAge: 15 * 60 * 1000
});

const http = axios.create({
  adapter: cache.adapter,
  baseURL: "/api/"
});

const verbs = {
  CREATE: "post",
  LOAD: "get",
  UPDATE: "put"
};

export const CALL_API = "Call API";

export default () => next => action => {
  const { [CALL_API]: callAPI, ...params } = action;
  if (typeof callAPI === "undefined") {
    return next(action);
  }
  const {
    endpoint,
    headers = {},
    types,
    schema = d => d,
    useCache = false,
    body = {}
  } = callAPI;

  const actionWith = nextAction => {
    const { [CALL_API]: del, ...finalAction } = { ...action, ...nextAction };
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  const verb = verbs[requestType.split("_").shift()];
  next(actionWith({ type: requestType }));

  let options = null;
  if (verb === verbs.LOAD) {
    options = {
      cache: {
        exclude: {
          filter: () => !useCache,
          query: !Object.keys(params).length
        }
      },
      headers,
      params
    };
  } else {
    options = { ...params };
  }

  return http[verb](endpoint, body, options).then(
    ({ data }) =>
      next(
        actionWith({
          payload: schema(data),
          type: successType
        })
      ),
    error =>
      next(
        actionWith({
          error: error.message,
          type: failureType
        })
      )
  );
};
