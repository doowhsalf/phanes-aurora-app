import SignalHistory from "../components/mcc/mcc_signal_history";
import Loading from "../../../loading.js";
import { useDeps, composeWithTracker, composeAll } from "mantra-core-extra";
// import mongodb from "mongodb";
// var BSONRegExp = mongodb.BSONRegExp;
import {
    DEFCON9,
    DEFCON7,
    DEFCON5,
    DEFCON4,
    DEFCON3,
    DEFCON2,
    DEFCON1,
} from "/debug.json";
import Constants from "/lib/constants";

DEFCON5 && console.log("SignalHistory stuff");

export const composer = ({ context, signalId }, onData) => {
    const { Meteor, Collections } = context();
    DEFCON5 && console.log("SignalHistory");
    DEFCON5 && console.log("signalId");
    DEFCON5 && console.log(signalId);

    if (Meteor.subscribe("signalState.History", signalId).ready()) {
        const rStart = / /;
        const rEnd = / /;

        const Selector = {
            entityId: signalId,
        };

        // var sort = [["route", 1.0]];

        const SignalHistoryData = Collections.SignalHistory.find(Selector)
            .limit(400)
            .fetch();
        DEFCON5 && console.log("SignalHistory");
        DEFCON5 && console.log(SignalHistoryData);

        try {
            onData(null, { signalId, SignalHistoryData });
        } catch (err) {
            DEFCON5 && console.log(err);
        }
    }
};

export const depsMapper = (context, actions) => ({
    getArticle: actions.content.getArticle,
    context: () => context,
});

export default composeAll(
    composeWithTracker(composer, Loading),
    useDeps(depsMapper)
)(SignalHistory);