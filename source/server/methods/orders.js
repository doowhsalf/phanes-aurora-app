import {
  Meteor
} from "meteor/meteor";
import {
  check,
  Match
} from "meteor/check";
import Order from "../lib/order.js";
import {
  Users
} from '/lib/collections';

import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";
import Constants from "/lib/constants";
DEFCON5 && console.log("In Order server part");

export default function () {
  Meteor.methods({
    "orders.testconnection"() {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      DEFCON5 && console.log("orders.testconnection ");
      const order = new Order(Meteor);

      this.unblock();
      order.testConnectionContent();
      DEFCON5 && console.log("testConnectionSent");
      return true;
    }
  });
  Meteor.methods({
    "orders.orderquery"(searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(searchText, String);

      DEFCON5 && console.log("orders.Query stuff");
      const order = new Order(Meteor);

      this.unblock();
      const orders = order.orderQuery(searchText);
      DEFCON5 && console.log("OrderQuery sent with search string : ".searchText);

      return orders;
    }
  });
  Meteor.methods({
    "orders.queryOrderByOrderId"(searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(searchText, String);

      DEFCON5 && console.log("orders.Query stuff");
      const order = new Order(Meteor);

      this.unblock();
      const orders = order.queryOrderByOrderId(searchText);
      DEFCON5 && console.log("OrderQuery sent with search string : ".searchText);

      return orders;
    }
  });

  Meteor.methods({
    "orders.queryOrderByPersonId"(searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(searchText, String);

      DEFCON5 && console.log("orders.Query stuff");
      const order = new Order(Meteor);

      this.unblock();
      const orders = order.queryOrderByPersonId(searchText);
      DEFCON5 && console.log("OrderQuery for Personid sent with search string : ".searchText);

      return orders;
    }
  });

  Meteor.methods({
    "orders.queryRecentOrders"() {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      //check(searchText, String);

      DEFCON5 && console.log("orders.Query stuff");
      const order = new Order(Meteor);

      this.unblock();
      const orders = order.queryRecentOrders();
      DEFCON5 && console.log("OrderQuery for Personid sent with search string : ".searchText);

      return orders;
    }
  });

  Meteor.methods({
    "orders.updateOrderByOrderId"(content_order) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      DEFCON5 && console.log(content_order);

      check(content_order, Object);
      //check(content_order.field_orderid, String);
      let userObj = Meteor.users.findOne(this.userId);

      DEFCON5 && console.log("orders.update stuff");
      DEFCON5 && console.log(content_order);
      DEFCON5 && console.log(userObj);

      const order = new Order(Meteor);
      content_order.meta_acting_user = userObj.uid;
      this.unblock();
      const response = order.updateOrderByOrderId(content_order);
      DEFCON5 && console.log("Called drupal service and received response");
      DEFCON5 && console.log(response);

      return response;
    }
  });
  Meteor.methods({
    "orders.createUpdatePersonOrder"(content_order) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      DEFCON5 && console.log("Create Order");
      DEFCON5 && console.log(content_order);
      check(content_order, Object);

      const order = new Order(Meteor);

      this.unblock();
      const response = order.createUpdatePersonOrder(content_order);
      DEFCON5 && console.log("Called drupal service and received response");
      DEFCON5 && console.log(response);

      return response;
    }
  });
  Meteor.methods({
    "orders.getNameTypes"() {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }

      DEFCON5 && console.log("Server orders.getNameTypes");
      const order = new Order(Meteor);
      this.unblock();
      const response = order.getNameTypes();
      DEFCON5 && console.log("Called drupal service and received Nametypes");
      DEFCON5 && console.log(response);

      return response;
    }
  });
  Meteor.methods({
    "orders.getTerms"(termtype) {
      check(termtype, String);

      DEFCON5 && console.log("Server orders.getTerms");
      const order = new Order(Meteor);
      this.unblock();
      const response = order.getTerms(termtype);
      DEFCON5 && console.log("Called drupal service and received getTerms");
      return response;
    }
  });
  Meteor.methods({
    "orders.queryTerms"(termtype, searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(termtype, String);
      check(searchText, String);

      DEFCON5 && console.log("Server orders.queryTerms");
      const order = new Order(Meteor);
      this.unblock();
      const response = order.queryTerms(termtype, searchText);
      DEFCON5 && console.log("Called drupal service and received queryTerms");
      DEFCON5 && console.log(response);

      return response;
    }
  });
  Meteor.methods({
    "orders.queryTermsCountry"(dataContext) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(dataContext, String);

      DEFCON5 && console.log("Server orders.queryTerms");
      const order = new Order(Meteor);
      this.unblock();
      const response = order.queryTermsCountry(dataContext);
      DEFCON5 && console.log("Called drupal service and received queryTerms");
      DEFCON5 && console.log(response);

      return response;
    }
  });
  Meteor.methods({
    "orders.queryPersonById"(searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(searchText, String);

      DEFCON5 && console.log("Person.Query stuff");
      const order = new Order(Meteor);

      this.unblock();
      const orders = order.queryPersonById(searchText);
      DEFCON5 && console.log("queryPersonById sent with search string : ".searchText);

      return orders;
    }
  });
  Meteor.methods({
    "orders.queryPerson"(searchText, meta) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(searchText, String);
      check(meta, String);

      DEFCON5 && console.log("Person.Query stuff");
      const order = new Order(Meteor);

      this.unblock();
      const orders = order.queryPerson(searchText, meta);
      DEFCON5 && console.log("queryPerson sent with search string : ".searchText);

      return orders;
    }
  });
  Meteor.methods({
    "orders.queryPersonAdvanced"(searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(searchText, String);

      DEFCON5 && console.log("Person.Query stuff");
      const order = new Order(Meteor);

      this.unblock();
      const orders = order.queryPersonAdvanced(searchText);
      DEFCON5 && console.log("queryPerson sent with search string : ".searchText);

      return orders;
    }
  });
  Meteor.methods({
    "orders.queryRoleAdvanced"(searchText, queryRoles) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(searchText, String);
      check(queryRoles, Object);

      DEFCON5 && console.log("Person.Query stuff");
      const order = new Order(Meteor);

      this.unblock();
      const orders = order.queryRoleAdvanced(searchText, queryRoles);
      DEFCON5 && console.log("queryPerson sent with search string : ".searchText);

      return orders;
    }
  });
  Meteor.methods({
    "orders.livestream"(searchText) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(searchText, String);
      //let userObj = Meteor.users.findOne(this.userId);

      DEFCON3 && console.log("Livestream check");
      DEFCON3 && console.log(this.userId);
      //DEFCON3 && console.log(userObj);


      const order = new Order(Meteor);

      this.unblock();
      const orders = order.livestream(searchText);
      DEFCON5 && console.log("livestream sent with search string : ".searchText);

      return orders;
    }
  });
  Meteor.methods({
    "orders.motherchecks"() {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      //check(searchText, String);
      //let userObj = Meteor.users.findOne(this.userId);

      DEFCON3 && console.log("motherchecks check");
      DEFCON3 && console.log(this.userId);
      //DEFCON3 && console.log(userObj);


      const order = new Order(Meteor);

      this.unblock();
      const orders = order.motherchecks();
      DEFCON5 && console.log("motherchecks sent");

      return orders;
    }
  });
  Meteor.methods({
    "orders.process"(query) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      check(query, Object);

      DEFCON3 && console.log("Order Process ServerSide");
      const order = new Order(Meteor);

      this.unblock();
      const orders = order.process(query);
      DEFCON3 && console.log("Process Order Request: ");
      DEFCON3 && console.log(query);

      return orders;
    }
  });
  Meteor.methods({
    "orders.queryOrderState"(state, limit) {
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      DEFCON3 && console.log("Query Orderstate");

      check(state, String);
      check(limit, String);

      const order = new Order(Meteor);

      this.unblock();
      const orders = order.queryOrderState(state, limit);
      DEFCON3 && console.log("state, limit: ");
      DEFCON3 && console.log(state);
      DEFCON3 && console.log(limit);

      return orders;
    }
  });
}
