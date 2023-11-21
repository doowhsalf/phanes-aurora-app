import { useDeps, composeWithTracker, composeAll } from 'mantra-core-extra';
import Loading from '../../../../loading';
import LegalConsent from '../../components/consent/LegalConsent.jsx';
import { Meteor } from "meteor/meteor";

export const composer = ({ context }, onData) => {

    const { LocalState, Collections } = context();

    if (Meteor.subscribe('consent.forCurrentUser').ready()) {
        const userConsentArticles = Collections.UsersConsent.find({ status: 'active' }).fetch();

        Meteor.call('consent.isGiven', (err, consentGiven) => {
            if (consentGiven) {
                onData(null, { consentGiven });
            } else {
                Meteor.call('consent.getConsentStatus', (err, consentStatus) => {
                    onData(null, { userConsentArticles, consentGiven, consentStatus });
                })
            }
        })
    }

};

// export const _depsMapper = (context, actions) => ({
export const depsMapper = (context, actions) => ({
    context: () => context,
    saveArticles: actions.consent.saveArticles,
});

export default composeAll(
    composeWithTracker(composer, Loading),
    useDeps(depsMapper)
)(LegalConsent);