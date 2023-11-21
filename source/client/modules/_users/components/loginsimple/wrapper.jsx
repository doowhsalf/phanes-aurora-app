import React from "react";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import i18n from "meteor/universe:i18n";
import dataComposer from "../../composers/account/login.jsx";
import Component from "../login/_form.jsx";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
const Container = dataComposer(Component);
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import AppConfig from "/client/configs/app";


const styles = (theme) => ({
  link: {
    marginTop: theme.spacing(2),
  },

  login_page: {},

  login_container: {
    color: "white",
    width: "100%",
    // minWidth: 240,
    margin: "auto",
    background:
      "linear-gradient(to top, " +
      theme.palette.secondary.light +
      " 0%, " +
      theme.palette.secondary.dark +
      " 100%)",
    borderRadius: 3,
    padding: 15,
    overflow: "hidden",
  },
});

class UserLogin extends React.Component {
  constructor(props) {
    //console.log("In OrderComponent constructor...");
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.login_page}>
        <div className={classes.login_container}>
          <Typography variant="subtitle1" gutterBottom>
            {i18n.__("Header_Login_Login")}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {i18n.__("Header_Login_EnterHint")}
          </Typography>

          <Container />
          <Typography variant="caption" gutterBottom className={classes.link}>
            {AppConfig.version + " " + AppConfig.version_build_date}
          </Typography>
        </div>
      </div>
    );
  }
}
UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UserLogin);
/*
 <div className="tri-login">
        <div className="bs-docs-section clearfix">
          <div className="ibox-content">
            <div className="ibox-header" />*/
