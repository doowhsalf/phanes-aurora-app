import ClientSearchDetailsRelations from "../components/clientsearch/clientsearchdetailsrelations";
import Loading from "../../../loading.js";
import {useDeps, composeWithTracker, composeAll} from "mantra-core-extra";
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

DEFCON5 && console.log("In ClientSearchDetailsRelations component, kickstarting stuff");


export const composer = ({context, relations}, onData) => {
    const {Meteor, Collections} = context();


    //it just returns relations so second sort has to be done on person (check age)
    //const relationsGrouped = groupRelations(relations);
    const personOrder = getPersonOrderFromRelations(relations);

    try {

      const relatedPersonIds = relations.map(
        relation => relation.RelationPersonID
      );
      const fetchPerson = (relatedPersonIds) => {
        return Collections.Persons
          .find({PersonID: {"$in": relatedPersonIds}})
          .map(person => {
            const personSort = personOrder.find(po => po.personId === person.PersonID);
            const personRelation = relations.find(relation => relation.RelationPersonID === person.PersonID);
            person.SortIndex = personSort && personSort.sortIndex ? personSort.sortIndex : -1;
            person.RelationType = personSort && personSort.relationType ? personSort.relationType : "";
            person.RelationDescription = personRelation && personRelation.RelationDescription ? personRelation.RelationDescription : "";
            person.RelationID = personRelation && personRelation.RelationID ? personRelation.RelationID : "";
            return person;
          });
      };

      const sortByRelationTypeAndAge = persons =>
      {
        if (persons)
        {
          return persons.sort((a,b) =>
          {
            if (a.SortIndex < b.SortIndex)
            {
              return -1;
            }
            if (a.SortIndex > b.SortIndex)
            {
              return 1;
            }

            if (a.SortIndex === b.SortIndex)
            {
              const aFullDate = `${a.BirthDateYear}-${a.BirthDateMonth}-${a.BirthDateDay}`;
              const bFullDate = `${b.BirthDateYear}-${b.BirthDateMonth}-${b.BirthDateDay}`;
              return aFullDate > bFullDate;
            }

          });
        }

        return persons;
      };

      let relatedPersons = fetchPerson(relatedPersonIds);
      relatedPersons = sortByRelationTypeAndAge(relatedPersons);

      if (Meteor.subscribe('persons.byIds', relatedPersonIds).ready()) {
        relatedPersons = fetchPerson(relatedPersonIds);
        relatedPersons = sortByRelationTypeAndAge(relatedPersons);
        onData(null, {relations, relatedPersons});
      }
      onData(null, {relations, relatedPersons});

    } catch
      (err) {
      DEFCON5 && console.log(err);
      onData(err);
    }
  }
;

const getPersonOrderFromRelations = (relations) => {
  const relationSortOrder = ["Mor", "Far", "Partner", "Dotter",
    "Son", "Svärmor", "Svärfar", "Svärdotter", "Svärson", "Känd medarbetare"];

  return relations.map(relation => {
    return {
      sortIndex: relationSortOrder.findIndex(rso => rso === relation.RelationType),
      personId: relation.RelationPersonID,
      relationType: relation.RelationType
    }
  });

};


export const depsMapper = (context, actions) => ({
  queryPerson: actions.order.queryPerson,
  queryPersonAdvanced: actions.order.queryPersonAdvanced,
  queryRoleAdvanced: actions.order.queryRoleAdvanced,
  queryTermsService: actions.order.queryTermsService,
  getTermsService: actions.order.getTermsService,
  queryTermsCountry: actions.order.queryTermsCountry,
  findPerson: actions.search.findPerson,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(ClientSearchDetailsRelations);
