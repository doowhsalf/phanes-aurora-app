import { useDeps, composeWithTracker, composeAll } from 'mantra-core-extra';
import Loading from "../../../../loading";
import LegalConsentArticle from '../../components/consent/LegalConsentArticle.jsx';

export const composer = ({ context }, onData) => {

    const { LocalState, Collections } = context();
    onData(null, {});
};

// export const _depsMapper = (context, actions) => ({
export const depsMapper = (context, actions) => ({
    context: () => context,

});

export default composeAll(
    composeWithTracker(composer, Loading),
    useDeps(depsMapper)
)(LegalConsentArticle);