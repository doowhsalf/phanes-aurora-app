import {
  useDeps,
  composeWithTracker,
  composeAll
} from 'mantra-core-extra';
import ContactDialog from '../components/ContactDialog.jsx';


export const depsMapper = (context, actions) => ({
  submitQuestion: actions.contact.sendQuestion,
  clearErrors: actions.contact.clearErrors,
  context: () => context
});


export default composeAll(
  useDeps(depsMapper)
)(ContactDialog);
