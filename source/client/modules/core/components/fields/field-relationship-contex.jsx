import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class FieldRelationshipContext extends React.Component {
  constructor(props) {
    DEFCON9 && console.log("In FieldOrderProcessMethod...");
    super(props);
    this.state = {};
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const {
      field_relation_name,
      field_person_relation_tid,
      field_person_name,
      field_gender,
    } = this.props;

    DEFCON7 && console.log("Relationsobject");
    DEFCON7 && console.log(relation);
    DEFCON7 && console.log(field_gender);

    // Check if data is defined and if not just return

    let value = "";
    let prefix = "";
    switch (field_person_relation_tid) {
      case "1":
      case "5":
        prefix =
          field_gender == "K"
            ? i18n.__("RelationshipWithPersonIsDaughterInLaw")
            : i18n.__("RelationshipWithPersonIsSonInLaw");
        break;
      case "2":
      case "10":
        prefix =
          field_gender == "K"
            ? i18n.__("RelationshipWithPersonIsDoughter")
            : i18n.__("RelationshipWithPersonIsSon");
        break;
      case "3":
      case "9":
        prefix =
          field_gender == "K"
            ? i18n.__("RelationshipWithPersonIsMotherInLaw")
            : i18n.__("RelationshipWithPersonIsFatherInLaw");
        break;
      case "4":
      case "7":
        prefix =
          field_gender == "K"
            ? i18n.__("RelationshipWithPersonIsMother")
            : i18n.__("RelationshipWithPersonIsFather");
        break;

      case "6":
        prefix = i18n.__("RelationshipWithPersonIsPartner");
        break;

      case "8":
        prefix = i18n.__("RelationshipWithPersonIsCoworker");
        break;

      default:
        prefix = " Unkown relationship with ";
        break;
    }
    value = prefix + " " + field_person_name + " (" + field_relation_name + ")";

    return value;
  }
}

FieldRelationshipContext.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldRelationshipContext);
