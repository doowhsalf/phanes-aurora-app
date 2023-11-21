import NodesTableData from "../components/mcc/ontology_table";
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
    "_id" : "chilled_water_system",
    "description" : {
        "en" : "The equipment, devices and conduits that handle the production and distribution of chilled water in a building"
    },
    "foldername" : "System",
    "id" : "chilled_water_system",
    "name" : {
        "en" : "Chilled Water System"
    },
    "ontology" : "Brick",
    "superclass" : [
        "water_system"
    ],
    "type" : "system",
    "updated" : "2023-03-22T11:12:03.828Z",
    "updatedAsDateString" : "Wed Mar 22 2023"
}

*/
DEFCON5 && console.log("In Ontology component, kicknodesing stuff");

export const composer = ({ context, searchText }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("In nodes component composer");

  this.filter = (articles, searchText) => {
    if (articles) {
      const regex = new RegExp(".*" + searchText + ".*", "i");

      const filtered = articles.filter((article) => {
        DEFCON5 && console.log(article);
        // check if description is defined, if not set to empty string

        let descriptionSearch =
          article.description !== undefined
            ? article.description.en !== undefined
              ? article.description.en
              : ""
            : "";
        let nameSearch = article.name.en !== undefined ? article.name.en : "";

        const searchString = `${article._id} ${article.foldername} ${nameSearch} ${descriptionSearch} ${article.ontology} ${article.type} `;
        return regex.test(searchString);
      });
      return filtered;
    }
  };

  if (Meteor.subscribe("ontology.all").ready()) {
    const Selector = {};

    const nodes = Collections.Ontology.find(Selector).fetch();

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
  getArticle: actions.content.getArticle,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(NodesTableData);
