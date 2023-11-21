import {
  useDeps,
  composeWithTracker,
  composeAll
} from 'mantra-core-extra';
import Loading from '../../../loading.js';
import AppToolbar from '../components/AppToolbar.jsx';

export const composer = ({
                           context
                         }, onData) => {

  const {
    LocalState,
    authCommon
  } = context();

  const {
    userSubReady,
    email,
  } = authCommon();

  if (userSubReady) {
    onData(null, {
      email,
    });
  } else {
    onData(null, {
      email: "",
    });
  }
};


export const depsMapper = (context, actions) => ({
  clearErrors: actions.contact.clearErrors,
  context: () => context
});


export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(AppToolbar);
