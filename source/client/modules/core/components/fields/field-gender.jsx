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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Constants from "/lib/constants";

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
  formControl: {
    marginTop: 8,
    width: "100%",
  },
  formLabel: {
    marginTop: -5,
  },
  group: {
    display: "inline",
    marginLeft: 5,
  },
});

class FieldGender extends React.Component {
  constructor(props) {
    DEFCON9 && console.log("In FieldGender...");
    super(props);
    const { value } = this.props;
    DEFCON7 && console.log("Start value is");
    DEFCON7 && console.log(value);

    this.state = {
      value: value,
    };
  }

  componentWillReceiveProps(props) {
    const { resetInitState } = this.props;
    DEFCON7 && console.log("Will receive a new prop ");
    DEFCON7 && console.log(resetInitState);
    if (props.resetInitState !== resetInitState) {
      const { value } = this.props;
      DEFCON7 && console.log("Initate stuff ");
      this.setState({ value: value });
    }
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
    const { classes, value, disabled, fullwidth } = this.props;

    // Check if data is defined and if not just return
    //if (fieldValue === undefined) {
    //    return '';
    //  }
    DEFCON7 && console.log(value);

    return (
      <FormControl
        row="row"
        component="fieldset"
        className={classes.formControl}
        disabled={disabled}
      >
        <FormLabel className={classes.formLabel}>
          {i18n.__("Entity_Label_Field_gender")}
        </FormLabel>
        <RadioGroup
          fieldname={"field_gender"}
          className={classes.group}
          value={this.state.value}
          onChange={this.handleChange("field_gender")}
        >
          <FormControlLabel
            value={Constants.Gender.FEMALE}
            control={<Radio />}
            label={i18n.__("Entity_Label_Field_Gender_Female")}
          />
          <FormControlLabel
            value={Constants.Gender.MALE}
            control={<Radio />}
            label={i18n.__("Entity_Label_Field_Gender_Male")}
          />
        </RadioGroup>
      </FormControl>
    );
  }
}
FieldGender.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldGender);
