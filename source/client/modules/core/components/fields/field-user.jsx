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
import Avatar from "@mui/material/Avatar";

const styles = (theme) => ({
  container: {
    display: "flex",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  avatar: {
    marginRight: 10,
    marginTop: 5,
  },
  row: {
    display: "flex",
    justifyContent: "marginLeft",
    marginTop: 19,
  },
});

class FieldUser extends React.Component {
  constructor(props) {
    DEFCON9 && console.log("In FieldDateTextfield...");
    super(props);
    this.state = {};
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes, user, label, disabled } = this.props;

    // Check if data is defined and if not just return
    if (user === undefined) {
      return "";
    }
    let fullWidthField = true;

    return (
      <div className={classes.row}>
        <Avatar alt={user.name} src={user.uri} className={classes.avatar} />
        <TextField
          fullWidth={fullWidthField}
          label={label}
          disabled={disabled}
          value={user.name}
        />
      </div>
    );
  }
}

FieldUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldUser);
