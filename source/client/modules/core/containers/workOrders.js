import NodesTableData from "../components/mcc/order_workorders";
import Loading from "../../../loading.js";
import { useDeps, composeWithTracker, composeAll } from "mantra-core-extra";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

/*

{
    "_id" : "20230628201844Tran",
    "workorderclass" : "TransmitResetWo",
    "payload" : {
        "orderid" : NumberInt(29690),
        "workorderclass" : "TransmitResetWo",
        "whyDescription" : "testing again"
    },
    "status" : "pending",
    "created" : ISODate("2023-06-28T20:18:44.196+0000"),
    "modified" : ISODate("2023-06-28T20:18:44.196+0000"),
    "createdBy" : null,
    "modifiedBy" : null
}

*/
DEFCON5 && console.log("In OrderByStatus component, kicknodesing stuff");

export const composer = ({ context, searchText }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("In nodes component composer");

  this.filter = (articles, searchText) => {
    if (articles) {
      const regex = new RegExp(".*" + searchText + ".*", "i");

      const filtered = articles.filter((article) => {
        DEFCON5 && console.log(article);
        // make a string of all companies since they are an array

        const searchString = `${article._id} ${article.workorderclass} ${article.status} ${article.created} ${article.modified} ${article.createdBy} ${article.modifiedBy} ${article.payload}  `;
        return regex.test(searchString);
      });
      return filtered;
    }
  };

  if (Meteor.subscribe("workorders.search").ready()) {
    const dataSelector = {};
    // var projection = {
    //   _id: "$_id",
    //   JSONFieldContentParsed: "$JSONFieldContentParsed",
    //   ID_AdvertPublishStatus: "$ID_AdvertPublishStatus",
    //   CustomerOrderNumber: "$CustomerOrderNumber",
    // };

    DEFCON5 && console.log("Get all nodes");
    /*      */
    // DEFCON5 && console.log(usersWithAvatars);
    var sort = [["_id", 1]];

    DEFCON5 && console.log("Get all nodes");
    let start = new Date().getTime();
    // DEFCON5 && console.log(usersWithAvatars);
    const nodes = Collections.WorkOrders.find(dataSelector, {
      sort,
      limit: 500,
    }).fetch();

    let end = new Date().getTime();
    let executionTime = end - start;
    DEFCON5 && console.log("EXECUTION TIME: " + executionTime);
    DEFCON5 && console.log("DONE Get all nodes");
    let orders = nodes;
    if (searchText !== undefined && searchText.trim() !== "") {
      orders = filter(nodes, searchText);
    }

    DEFCON3 && console.log(orders);

    try {
      onData(null, { orders });
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
)(NodesTableData);
