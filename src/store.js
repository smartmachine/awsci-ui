import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import {createLogger} from "redux-logger";

const loggerMiddleware = createLogger();



export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunk,
      loggerMiddleware
    )
  )
}