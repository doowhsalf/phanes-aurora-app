import {useDeps} from 'react-simple-di-extra';
import {composeWithTracker, composeAll} from 'react-komposer';

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
