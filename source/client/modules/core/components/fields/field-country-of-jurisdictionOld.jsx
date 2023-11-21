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
import classNames from "classnames";
import withStyles from '@mui/styles/withStyles';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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
  formControl: {
    marginTop: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
  group: {
    display: "inline",
    marginLeft: 5,
    marginTop: 10,
  },
});

class FieldCountryOfJurisdiction extends React.Component {
  constructor(props) {
    DEFCON9 && console.log("In FieldGender...");
    super(props);
    const { value } = this.props;
    DEFCON9 && console.log("Start value is");
    DEFCON9 && console.log(value);

    this.state = {
      value: value,
    };
  }

  handleChange = (name) => (event) => {
    DEFCON9 && console.log("Field update");
    DEFCON9 && console.log(name);
    DEFCON9 && console.log(event.target.value);
    this.setState({ value: event.target.value });
    this.updateEntity(name, event.target.value);
  };

  updateEntity(fieldname, value) {
    const { handleUpdateField } = this.props;
    handleUpdateField(fieldname, value);
  }

  render() {
    const { classes, value, disabled } = this.props;

    // Check if data is defined and if not just return
    //if (fieldValue === undefined) {
    //    return '';
    //  }
    DEFCON9 && console.log(value);
    let myValue = i18n.__("Entity_Label_FieldCountryOfJurisdiction_Denmark");

    switch (value) {
      case "SE":
        myValue = i18n.__("Entity_Label_FieldCountryOfJurisdiction_Sweden");
        break;
      case "FI":
        myValue = i18n.__("Entity_Label_FieldCountryOfJurisdiction_Finland");
      case "NO":
        myValue = i18n.__("Entity_Label_FieldCountryOfJurisdiction_Norway");
        break;
      default:
        myValue = i18n.__("Entity_Label_FieldCountryOfJurisdiction_Denmark");
        break;
    }

    return (
      <div>
        <FormControl
          component="fieldset"
          className={classes.formControl}
          disabled={disabled}
        >
          <FormLabel>
            {i18n.__("Entity_Label_Field_country_of_jurisdiction")}
          </FormLabel>
          <RadioGroup
            fieldname={"field_detailed_role_categories"}
            className={classes.group}
            row="row"
            value={this.state.value}
            onChange={this.handleChange("field_country_of_jurisdiction")}
          >
            <FormControlLabel
              value="DK"
              control={<Radio />}
              label={i18n.__("Entity_Label_FieldCountryOfJurisdiction_Denmark")}
            />
            <FormControlLabel
              value="SE"
              control={<Radio />}
              label={i18n.__("Entity_Label_FieldCountryOfJurisdiction_Sweden")}
            />
            <FormControlLabel
              value="NO"
              control={<Radio />}
              label={i18n.__("Entity_Label_FieldCountryOfJurisdiction_Norway")}
            />
            <FormControlLabel
              value="FI"
              control={<Radio />}
              label={i18n.__("Entity_Label_FieldCountryOfJurisdiction_Finland")}
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}
FieldCountryOfJurisdiction.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldCountryOfJurisdiction);
