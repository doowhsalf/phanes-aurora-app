import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { SignalState, SignalHistory } from "/lib/collections";
import {
    DEFCON9,
    DEFCON7,
    DEFCON5,
    DEFCON4,
    DEFCON3,
    DEFCON2,
    DEFCON1,
} from "/debug.json";

// c

export default function() {
    DEFCON3 && console.log("Setting up signalState");

    Meteor.publish("signalState.all", function() {
        DEFCON7 && console.log("In the subscribe function");

        // if (!this.userId) {
        //   throw new Meteor.Error(401, "Access denied");
        // }
        this.autorun(function(computation) {
            DEFCON7 && console.log("Subscribing SignalState");

            const Selector = {};

            let signalState = SignalState.find(Selector);
            DEFCON7 && console.log(signalState);

            return signalState;
        });
    });

    Meteor.publish("signalState.facility", function(facility) {
        DEFCON3 && console.log("In facility  subscribe function");
        check(facility, String);
        // if (!this.userId) {
        //   throw new Meteor.Error(401, "Access denied");
        // }
        this.autorun(function(computation) {
            DEFCON3 && console.log("*** Subscribing facility");

            const Selector = {
            _id: new RegExp(facility, "i")     
            };

            var sort = [
                ["route", 1.0]
            ];

            DEFCON3 && console.log(Selector);

            let signalState = SignalState.find(Selector, { sort: sort });
            DEFCON3 && console.log(signalState.fetch());

            return signalState;
        });
    });

    Meteor.publish("signalState.History", function(signalId) {
        DEFCON3 && console.log("In signalState  subscribe function");
        check(signalId, String);
        // if (!this.userId) {
        //   throw new Meteor.Error(401, "Access denied");
        // }
        this.autorun(function(computation) {
            DEFCON3 && console.log("Subscribing signalId");

            const Selector = {
                entityId: signalId,
            };

            var sort = [
                ["time", -1.0]
            ];

            DEFCON3 && console.log(Selector);

            let SignalHistoryData = SignalHistory.find(Selector, {
                sort: sort,
                limit: 400,
            });
            // DEFCON3 && console.log(SignalHistoryData.fetch());

            return SignalHistoryData;
        });
    });
}