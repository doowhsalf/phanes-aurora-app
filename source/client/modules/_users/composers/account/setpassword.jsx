import {useDeps} from 'react-simple-di-extra';
import {composeWithTracker, composeAll} from 'react-komposer';
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";

export const composer = ({context, clearErrors, token}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('SETPASSWORD_ERROR');
  onData(null, {error, token});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._setPassword.setPassword,
  clearErrors: actions._setPassword.setPasswordErrorClear,
  context: () => context
});

export default (component) => composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(component);
