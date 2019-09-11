import { combineReducers} from "redux";
import session from "./session";
import cognito from "./cognito";

export default combineReducers({
  session,
  cognito
})