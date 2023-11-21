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
import Checkbox from "@mui/material/Checkbox";

const styles = (theme) => ({
  checkbox: {
    marginLeft: theme.spacing(1),
    marginRight: 5,
  },
});

class FieldCheckbox extends React.Component {
  constructor(props) {
    DEFCON9 && console.log("In FieldCheckbox...");
    super(props);
    const { value } = this.props;
    DEFCON9 && console.log("Start value is");
    DEFCON9 && console.log(value);

    this.state = {
      checked: value == 1 ? true : false,
    };
  }

  componentWillReceiveProps(props) {
    const { resetInitState } = this.props;
    DEFCON7 && console.log("Will receive a new prop ");
    DEFCON7 && console.log(resetInitState);
    if (props.resetInitState !== resetInitState) {
      const { value } = this.props;
      DEFCON7 && console.log("Initate stuff ");
      this.setState({ checked: value == 1 ? true : false });
    }
  }

  handleChange = (name) => (event) => {
    DEFCON9 && console.log("Field update");
    DEFCON9 && console.log(name);
    DEFCON9 && console.log(event.target.checked);
    this.setState({ checked: event.target.checked });
    this.updateEntity(name, event.target.checked);
  };

  updateEntity(fieldname, value) {
    const { handleUpdateField } = this.props;
    handleUpdateField(fieldname, value);
  }
  render() {
    const { fieldname, classes, label, disabled } = this.props;
    DEFCON7 && console.log(fieldname);
    DEFCON7 && console.log(this.state.checked);

    return (
      <Checkbox
        className={classes.checkbox}
        disabled={disabled}
        checked={this.state.checked}
        label={label}
        onChange={this.handleChange(fieldname)}
      />
    );
  }
}
FieldCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldCheckbox);
