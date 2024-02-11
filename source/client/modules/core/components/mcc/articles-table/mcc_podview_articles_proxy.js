import NodesTableData from "./mcc_podview_articles_table.jsx";
import Loading from "/client/loading.js";
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

DEFCON5 && console.log("In meters component, kicknodesing stuff");
/* 
    "_id" : "fibaro-tritonite-proxima-east/switch/33/events/fibaro => home assistant/power",
    "topic" : "fibaro-tritonite-proxima-east/switch/33/events/fibaro => home assistant/power",
    "sensorClass" : "power_sensor",
    "created" : "2023-09-10T14:53:54.928Z",
    "status" : "proposed",
    "context" : "CONTEXT: fibaro-tritonite-proxima-east/switch/33/events/fibaro => home assistant/power Device information: drencher.television with a value of 167.7"
}*/
export const composer = ({ context, searchText }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("In nodes meters composer");

  this.filter = (articles, searchText) => {
    if (articles) {
      const regex = new RegExp(".*" + searchText + ".*", "i");

      const filtered = articles.filter((article) => {
        DEFCON5 && console.log(article);
        // check if description is defined, if not set to empty string

        // let descriptionSearch =
        //   article.description !== undefined
        //     ? article.description.en !== undefined
        //       ? article.description.en
        //       : ""
        //     : "";
        // let nameSearch = article.name.en !== undefined ? article.name.en : "";

        // create a search string from revision data add add it to the search string
        var revisionSearch = "";
        if (article.revisions !== undefined) {
          article.revisions.forEach((revision) => {
            revisionSearch += revision.description;
            revisionSearch += revision.title;
            revisionSearch += revision.body;
            revisionSearch += revision.subheader;
            revisionSearch += revision.summary;
          });
        }

        const searchString = `${revisionSearch} ${article._id} ${article.ingress} ${article.status} ${article.status} ${article.languge} ${article.originalLanguage} ${article.originalLanguage} ${article.title} ${article.title} ${article.body} ${article.body} ${article.subheader} ${article.subheader} ${article.weight} ${article.weight} ${article.articleCode} ${article.articleCode} ${article.typeOfArticle} ${article.typeOfArticle} ${article.contentType} ${article.contentType} ${article._id} ${article._id} ${article.nid} `;
        return regex.test(searchString);
      });
      return filtered;
    }
  };

  if (Meteor.subscribe("contents.all").ready()) {
    const Selector = {};

    const nodes = Collections.Contents.find(Selector).fetch();

    let nodeConfigs =
      searchText !== undefined ? filter(nodes, searchText) : nodes;
    DEFCON3 && console.log(nodeConfigs);

    try {
      onData(null, { nodeConfigs });
    } catch (err) {
      DEFCON5 && console.log(err);
    }
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(NodesTableData);
