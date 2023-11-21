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
import TextField from "@mui/material/TextField";

const styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

class FieldText extends React.Component {
  constructor(props) {
    DEFCON9 && console.log("In FieldDateTextfield...");
    super(props);
    this.state = {};
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { variant, classes, label, value } = this.props;

    // Check if data is defined and if not just return
    let thisVariant = variant === undefined ? "outlined" : variant;

    /*if (variant === undefined) {
      let thisVariant = "outline";
    } else {
      let thisVariant = variant;
    }*/

    let inputProps = { readOnly: true };
    return (
      <TextField
        variant="outlined"
        disabled={true}
        label={label}
        value={value}
        className={classes.textField}
        InputProps={inputProps}
      />
    );
  }
}

FieldText.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldText);
