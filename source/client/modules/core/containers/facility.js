import Facility from "../components/mcc/facility";
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

DEFCON5 && console.log("In mcc component, kickmccing stuff");

export const composer = ({ context, facilityId }, onData) => {
    const { Meteor, Collections } = context();
    DEFCON5 && console.log("In mcc component composer");
    DEFCON5 && console.log("facilityId");
    DEFCON5 && console.log(facilityId);

    if (Meteor.subscribe("signalState.facility", facilityId).ready()) {
        const rStart = / /;
        const rEnd = / /;

        const Selector = {
            _id: new RegExp(facility, "i")     
     };

        var sort = [
            ["route", 1.0]
        ];

        const signals = Collections.SignalState.find().fetch(Selector);
        DEFCON3 && console.log("Signals");
        DEFCON3 && console.log(signals);

        if (Meteor.subscribe("mccConfig.one", facilityId).ready()) {
            const rStart = / /;
            const rEnd = / /;

            const Selector = {
                _id: facilityId,
            };

            var facilityList = Collections.MccConfig.find().fetch(Selector);
            var facility = facilityList[0];
            DEFCON5 && console.log("facility");
            DEFCON5 && console.log(facility);
            // DEFCON5 && console.log(Selector);
            // prep the signalIdInbound and signalIdOutbound
            let inboundSignalId = facilityId + "_UC01_GT32_MV_inbound";
            let outboundSignalId = facilityId + "_UC01_GT31_MV_outbound";

            // get data for signal (inbound and outbound mv)
            if (Meteor.subscribe("signalState.History", inboundSignalId).ready()) {
                const SelectorI = {
                    entityId: inboundSignalId,
                };
                const inboundSignals =
                    Collections.SignalHistory.find(SelectorI).fetch();
                DEFCON5 && console.log("inboundSignals");
                DEFCON5 && console.log(inboundSignals);
                if (Meteor.subscribe("signalState.History", outboundSignalId).ready()) {
                    const SelectorO = {
                        entityId: outboundSignalId,
                    };
                    const outboundSignals =
                        Collections.SignalHistory.find(SelectorO).fetch();
                    DEFCON5 && console.log("outboundSignals");
                    DEFCON5 && console.log(outboundSignals);

                    try {
                        onData(null, {
                            signals,
                            facility,
                            outboundSignals,
                            inboundSignals,
                            inboundSignalId,
                            outboundSignalId,
                        });
                    } catch (err) {
                        DEFCON5 && console.log(err);
                    }
                }
            }
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
)(Facility);