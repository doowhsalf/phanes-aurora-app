// import LoginForm from '../components/Login/LoginForm.jsx';
import { useDeps } from "react-simple-di-extra";
import { composeWithTracker, composeAll } from "react-komposer";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState } = context();
  const error = LocalState.get("LOGIN_ERROR");
  onData(null, { error });

  DEFCON7 && console.log("LOGIN CONTAINER");

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._account.login,
  clearErrors: actions._account.loginErrorClear,
  context: () => context
});

export default component =>
  composeAll(composeWithTracker(composer), useDeps(depsMapper))(component);
