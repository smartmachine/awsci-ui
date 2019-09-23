import { combineReducers} from "redux";
import session from "./session";
import cognito from "./cognito";
import userInfo from "./userInfo";

export default combineReducers({
  session,
  cognito,
  userInfo
})