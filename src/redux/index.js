/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import reducer from "./modules/reducer";

let store = null;

if (process.env.DEBUG === "true") {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk, logger))
  );
} else {
  const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);
  // store = createStore(reducer, applyMiddleware(thunk));
}

/**
 * @return Redux Store
 */
export default function configureStore() {
  return store;
}
/* eslint-enable */
