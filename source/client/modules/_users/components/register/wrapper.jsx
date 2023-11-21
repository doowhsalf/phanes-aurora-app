import React from "react";

import dataComposer from "../../composers/account/register.jsx";
import Component from "./_form.jsx";
import i18n from "meteor/universe:i18n";
import withStyles from '@mui/styles/withStyles';
const Container = dataComposer(Component);
import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import AppConfig from "/client/configs/app";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

import DynamicContainer from "../helpers/dynamic_container";

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
      "url(https://sycorax.tritonite.io/titania_common) no-repeat center center fixed",
    backgroundSize: "cover",
  },
});

class UserRegister extends React.Component {
  constructor(props) {
    //console.log("In OrderComponent constructor...");
    super(props);
  }

  render() {
    const { classes } = this.props;
    let morestuff = (
      <div>
        <p className="text-muted text-center">
          <small>{i18n.__("Label_RegisterForm_AccountExists")}</small>
        </p>
        <a style={{ color: "white" }} href="/login">
          {i18n.__("Label_RegisterForm_Login")}
        </a>
      </div>
    );
    return (
      <div className={classes.login_page}>
        <DynamicContainer
          subtitle={i18n.__("Label_RegisterForm_Register")}
          hint={i18n.__("Label_RegisterForm_RegisterInfo")}
          container={<Container token={this.props.token} />}
          more={morestuff}
        ></DynamicContainer>
      </div>
    );
  }
}
UserRegister.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UserRegister);

/*



render() {
    const { classes } = this.props;

    return (
      <div className={classes.login_page}>
        <div className={classes.login_container}>
          <h2 className="font-bold">
            {i18n.__("Label_RegisterForm_Register")}
          </h2>
          <p>{i18n.__("Label_RegisterForm_RegisterInfo")}</p>

          <Container token={this.props.token} />

          <p className="text-muted text-center">
            <small>{i18n.__("Label_RegisterForm_AccountExists")}</small>
          </p>
          <a href="/login">{i18n.__("Label_RegisterForm_Login")}</a>
        </div>
      </div>
    );
  }*/

/*

render() {
    const { classes } = this.props;
    let morestuff = (
      <div>
        <p className="text-muted text-center">
          <small>{i18n.__("Label_RegisterForm_AccountExists")}</small>
        </p>
        <a href="/login">{i18n.__("Label_RegisterForm_Login")}</a>
      </div>
    );
    return (
      <div className={classes.login_page}>
        <DynamicContainer
          subtitle={i18n.__("Label_RegisterForm_Register")}
          hint={i18n.__("Label_RegisterForm_RegisterInfo")}
          container={<Container token={this.props.token} />}
          more={morestuff}
        ></DynamicContainer>
      </div>
    );
  }



  */
