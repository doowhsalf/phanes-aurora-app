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
import i18n from "meteor/universe:i18n";
import dataComposer from "../../composers/account/login.jsx";
import Component from "./_form.jsx";
import Typography from "@mui/material/Typography";
import withStyles from "@mui/styles/withStyles";
const Container = dataComposer(Component);
import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import AppConfig from "/client/configs/app";
import { createTheme } from "@mui/material/styles";

const styles = (theme) => ({
  link: {
    marginTop: theme.spacing(2),
  },

  login_page: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    top: 0,
    left: 0,
    padding: 0,
    margin: "auto",
    background:
      "url(https://sycorax.tritonite.io/neptune-pod) no-repeat center center fixed",
    backgroundSize: "cover",
  },

  login_container: {
    top: 250,
    width: 300,
    margin: "auto",
    marginTop: 100,
    backgroundColor: "rgba(255, 255, 255, 0.66)",
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
