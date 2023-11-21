import {
  Random
} from "meteor/random";
import {
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";

export default {
  queryOrder({
    LocalState,
    FlowRouter
  }, query, callback) {
    DEFCON5 && console.log("searchOrder action");
    Meteor.call("orders.orderquery", query, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Result in client to handle ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  queryOrderByOrderId({
    LocalState,
    FlowRouter
  }, query, callback) {
    DEFCON5 && console.log("searchOrder queryOrderByOrderId ");
    Meteor.call("orders.queryOrderByOrderId", query, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Result in client to handle ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },


  updateOrderByOrderId({
    LocalState,
    FlowRouter
  }, order, callback) {
    DEFCON5 && console.log("update order ");
    Meteor.call("orders.updateOrderByOrderId", order, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Result in client to handle ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  queryRecentOrders({
    LocalState,
    FlowRouter
  }, callback) {
    DEFCON5 && console.log("Query queryRecentOrders ");
    Meteor.call("orders.queryRecentOrders", (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Result in client to handle ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  queryOrderState({
    LocalState,
    FlowRouter
  }, state, query_limit, callback) {
    DEFCON5 && console.log("Query queryOrderState ");
    Meteor.call("orders.queryOrderState", state, query_limit, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Result in client to handle ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  queryOrderByPersonId({
    LocalState,
    FlowRouter
  }, order, callback) {
    DEFCON5 && console.log("Query order by Personid ");
    Meteor.call("orders.queryOrderByPersonId", order, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Result in client to handle ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  saveNewOrder({
    LocalState,
    FlowRouter
  }, order, callback) {
    DEFCON5 && console.log("Create a new order");
    DEFCON5 && console.log(order);

    Meteor.call("orders.createUpdatePersonOrder", order, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Result in client to handle ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  getNameTypesFromService({
    LocalState,
    FlowRouter
  }, callback) {
    DEFCON5 && console.log("getNameTypesFromService");
    DEFCON5 && console.log("Getting the term... ");
    Meteor.call("orders.getNameTypes", (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Result in client to handle ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  getSSNService({
    LocalState,
    FlowRouter
  }, callback) {
    DEFCON5 && console.log("getNameTypesFromService");
    DEFCON5 && console.log("Getting the terms from action... ");
    Meteor.call("orders.getTerms", "ssntype", (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Result in client to handle ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  getTermsService({
    LocalState,
    FlowRouter
  }, termtype, callback) {
    DEFCON5 && console.log("getNameTypesFromService");
    DEFCON5 && console.log("Getting the terms from action... ");
    Meteor.call("orders.getTerms", termtype, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Result in client to handle ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  queryTermsService({
    LocalState,
    FlowRouter
  }, termtype, searchtext, callback) {
    DEFCON5 && console.log("queryTermsService");
    DEFCON5 && console.log("Query the terms from action... ");
    Meteor.call("orders.queryTerms", termtype, searchtext, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Result in client to handle ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  queryTermsCountry({
    LocalState,
    FlowRouter
  }, dataContext, callback) {
    DEFCON5 && console.log("queryTermsService");
    DEFCON5 && console.log("Query the terms from action... ");
    Meteor.call("orders.queryTermsCountry", dataContext, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Result in client to handle ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  queryPersonById({
    LocalState,
    FlowRouter
  }, query, callback) {
    DEFCON5 && console.log("searchOrder queryPersonById ");
    Meteor.call("orders.queryPersonById", query, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("PERSON DATA in client to handle ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  queryPerson({
    LocalState,
    FlowRouter
  }, query, meta, callback) {
    DEFCON5 && console.log("searchOrder in Action object queryPerson ");
    Meteor.call("orders.queryPerson", query, meta, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("entity query ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  queryPersonAdvanced({
    LocalState,
    FlowRouter
  }, query, callback) {
    DEFCON5 && console.log("searchOrder in Action object queryPerson ");
    Meteor.call("orders.queryPersonAdvanced", query, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("entity query ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  queryRoleAdvanced({
    LocalState,
    FlowRouter
  }, query, queryRoles, callback) {
    DEFCON5 && console.log("searchOrder in Action object queryPerson ");
    Meteor.call("orders.queryRoleAdvanced", query, queryRoles, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("entity query ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  livestream({
    LocalState,
    FlowRouter
  }, query, callback) {
    DEFCON5 && console.log("LiveStream Search  ");
    Meteor.call("orders.livestream", query, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Livestream query ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  motherchecks({
    LocalState,
    FlowRouter
  }, callback) {
    DEFCON5 && console.log("Motherchecks Search  ");
    Meteor.call("orders.motherchecks", (err, result) => {
      if (!err) {
        DEFCON5 && console.log("MotherChecks query ");
        DEFCON5 && console.log(result);
        callback(err, result);
      }
    });
  },

  processOrder({
    LocalState,
    FlowRouter
  }, query, callback) {
    DEFCON5 && console.log("Process Order");
    Meteor.call("orders.process", query, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("After Process ");
        DEFCON5 && console.log(result);
        callback(err, result);
      } else {
        DEFCON5 && console.log("ERROR - PROCESSORDER");
      }
    });
  },

  clearErrors({
    LocalState
  }) {
    return LocalState.set("FILES_ERROR", null);
  }
};
