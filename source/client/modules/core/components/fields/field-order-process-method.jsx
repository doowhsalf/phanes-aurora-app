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
import TextField from "@mui/material/TextField";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {},
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class FieldOrderProcessMethod extends React.Component {
  constructor(props) {
    DEFCON9 && console.log("In FieldOrderProcessMethod...");
    super(props);
    this.state = {};
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes, fieldValue, disabled } = this.props;

    // Check if data is defined and if not just return
    if (fieldValue === undefined) {
      return "";
    }

    DEFCON9 && console.log(disabled);
    DEFCON9 && console.log(fieldValue);
    let myValue = fieldValue === "D" ? "Default" : "Express";
    return (
      <TextField
        disabled={disabled}
        label={i18n.__("Entity_Label_Field_order_process_method")}
        value={myValue}
      />
    );
  }
}

FieldOrderProcessMethod.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldOrderProcessMethod);
