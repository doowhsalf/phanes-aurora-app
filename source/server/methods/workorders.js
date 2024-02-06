import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// import _ from 'lodash';
import { Random } from "meteor/random";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import { WorkOrders } from "/lib/collections";

export default function () {
  Meteor.methods({
    async "workorder.new"(customerOrderId, workorderclass, payload) {
      check(customerOrderId, String);
      check(workorderclass, String);
      check(payload, Object);

      DEFCON5 && console.log("workorder.new");

      const doWork = async () => {
        // create a new mongo document with the payload and the workorderclass
        // also create a readable workorderId created by yyyymmddhhmmss + the first 4 chars of the workorderclass
        // use the workorderId as the _id of the mongo document
        // return the workorderId

        // first make the workoreder id string


        // get agent information from collection bil_agent based on customerId in the payload
        let query = {
          _id: payload.customerId,
        };

        let workorderId =
          new Date()
            .toISOString()
            .replace(/[^0-9]/g, "")
            .substring(0, 14) + workorderclass.substring(0, 6);

        // now create the mongo document
        let workorder = {
          _id: workorderId,
          contentId: customerOrderId,
          workorderclass: workorderclass,
          payload: payload,
          status: 1000,
          created: new Date(),
          modified: new Date(),
          createdBy: Meteor.userId(),
          modifiedBy: Meteor.userId(),
        };

        DEFCON5 && console.log(workorder);

        // now insert the document
        let result = WorkOrders.insert(workorder);

        DEFCON5 && console.log("workorder.new result: ");
        DEFCON5 && console.log(result);

        // now return the workorderId
        return workorderId;
      };

      try {
        return await doWork();
      } catch (e) {
        throw new Meteor.Error(e.error, e.reason);
      }
    },
  });
}
