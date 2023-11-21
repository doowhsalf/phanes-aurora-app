import GudrunContentServices from "../lib/drupal/services.js";
import {
  Meteor
} from "meteor/meteor";
import Constants from "/lib/constants";
import dateFormat from "dateformat";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";
export default class Order {
  constructor(Meteor = undefined) {
    this.user = Meteor.user();
  }

  testConnectionContent() {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      services.test_connection();
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }
  orderQuery(searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      let orders = services.queryOrder(searchText);
      DEFCON5 && console.log("Ok, get something from order ");

      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  queryOrderByPersonId(searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      let orders = services.queryOrderByPersonId(searchText);
      DEFCON5 && console.log("Ok, get something from order ");

      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  process(request) {
    try {
      let services = new GudrunContentServices();
      DEFCON3 && console.log("Request process of order");
      let orders = services.processOrder(request);
      DEFCON3 && console.log("Ok, get some reply");

      return orders;
    } catch (error) {
      DEFCON3 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  queryRecentOrders() {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      let orders = services.queryRecentOrders();
      DEFCON5 && console.log("Ok, get something from order ");

      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  queryOrderState(state, limit) {
    try {
      let services = new GudrunContentServices();
      DEFCON3 && console.log("queryOrderState");
      let orders = services.queryOrderState(state, limit);
      DEFCON3 && console.log("Ok, get something from order ");

      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }

  motherchecks() {
    try {
      let services = new GudrunContentServices();
      DEFCON3 && console.log("Sending motherchecks Gundrun");
      let orders = services.motherchecks();
      DEFCON3 && console.log("Ok, get something from motherchecks ");

      return orders;
    } catch (error) {
      DEFCON3 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }



  queryOrderByOrderId(searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      let orders = services.queryOrderByOrderId(searchText);
      DEFCON5 && console.log("Ok, get something from order ");

      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }
  updateOrderByOrderId(order) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      let result = services.updateOrderByOrderId(order);
      DEFCON5 && console.log("Ok, update done - check result... ");

      return result;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }
  createUpdatePersonOrder(order) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      // DEFCON5 && console.log(this.user);
      var now = new Date();
      order['field_order_state'] = 271;
      order['field_orderid'] = '';
      order['field_creator'] = this.user.uid;
      order['field_responsible'] = this.user.uid;
      order['field_order_process_method'] = order['field_order_process_method'] ? order['field_order_process_method'] : Constants.OrderProcessMethod.EXPRESS;
      order['field_effective_date'] = dateFormat(now, "yyyy-mm-dd");



      let result = services.createPersonOrder(order);
      DEFCON5 && console.log("Ok, update done - check result... ");

      return result;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }


  getNameTypes() {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Getting getNameTypes");
      let result = services.getTerms("nametype");
      DEFCON5 && console.log("Ok, update done - check result... ");

      return result;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }
  getTerms(termtype) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Getting getTerms");
      let result = services.getTerms(termtype);
      DEFCON5 && console.log("Ok, update done - check result... ");

      return result;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }
  queryTerms(termtype, searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Getting queryTerms");
      let result = services.queryTerms(termtype, searchText);
      DEFCON5 && console.log("Ok, update done - check result... ");

      return result;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }
  queryTermsCountry(dataContext) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Getting queryTermsCountry");
      let result = services.queryTermsCountry(dataContext);
      DEFCON5 && console.log("Ok, update done - check result... ");

      return result;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }
  queryPersonById(searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Sending notification to Gundrun");
      let orders = services.queryPersonById(searchText);
      DEFCON5 && console.log("Ok, get something from person-object ");

      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }
  queryPerson(searchText, meta) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Query stuff from Gudrun");
      DEFCON5 && console.log("Check Meta structure");
      DEFCON5 && console.log(meta);
      let orders = services.queryPerson(searchText, meta);
      DEFCON5 && console.log("Ok, get something from person-object ");

      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }
  queryRoleAdvanced(searchText, queryRoles) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Query stuff ADVANCED ROLE from Gudrun");
      DEFCON5 && console.log("Check queryRoles structure");
      DEFCON5 && console.log(queryRoles);
      let orders = services.queryRoleAdvanced(
        searchText,
        queryRoles);
      DEFCON5 && console.log("Ok, get something from ROLE person-object ");
      DEFCON5 && console.log(orders);
      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }
  queryPersonAdvanced(searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Query stuff from Gudrun");
      let orders = services.queryPersonAdvanced(searchText);
      DEFCON5 && console.log("Ok, get something from person-object ");
      DEFCON5 && console.log(orders);
      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }
  livestream(searchText) {
    try {
      let services = new GudrunContentServices();
      DEFCON5 && console.log("Get livestream");
      let orders = services.livestream(searchText);
      DEFCON5 && console.log("Ok, get something from order ");

      return orders;
    } catch (error) {
      DEFCON5 && console.log(error);
      throw new Meteor.Error("", "", JSON.stringify(error));
    }
  }
}
