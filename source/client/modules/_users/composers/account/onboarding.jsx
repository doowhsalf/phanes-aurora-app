import { useDeps } from "react-simple-di-extra";
import { composeWithTracker, composeAll } from "react-komposer";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

export const composer = ({ context, clearErrors }, onData) => {
  const { LocalState } = context();
  const { Meteor, Collections } = context();

  const error = LocalState.get("LOGIN_ERROR");
  //onData(null, { error });
  DEFCON3 && console.log("onbarding container - Getting stuff from secrets");

  if (Meteor.subscribe("secrets.all").ready()) {
    const secrets = Collections.Secrets.find().fetch();
    DEFCON3 && console.log("The secret is...");
    DEFCON3 && console.log(secrets);

    try {
      onData(null, { secrets, error });
    } catch (err) {
      DEFCON5 && console.log(err);
    }
  }

  DEFCON3 && console.log("onbarding container");

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._account.login,
  clearErrors: actions._account.loginErrorClear,
  context: () => context,
});

export default (component) =>
  composeAll(composeWithTracker(composer), useDeps(depsMapper))(component);
