import React from "react";
import dataComposer from "../../composers/account/password.jsx";
// import dataComposer from '../../composers/passwordForm.jsx';
import Component from "./_form.jsx";
import i18n from "meteor/universe:i18n";
import { withStyles } from "@material-ui/core/styles";
const Container = dataComposer(Component);
import Link from "@material-ui/core/Link";
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
class UserPassword extends React.Component {
  constructor(props) {
    //console.log("In OrderComponent constructor...");
    super(props);
  }

  render() {
    const { classes } = this.props;
    let morestuff = (
      <div>
        <p className="text-muted text-center">
          <small>{i18n.__("Header_ForgotPassword_Remember")}</small>
        </p>
        <a style={{ color: "white" }} href="/login">
          {i18n.__("Label_RegisterForm_Login")}
        </a>
      </div>
    );
    return (
      <div className={classes.login_page}>
        <div className={classes.login_page}>
          <DynamicContainer
            subtitle={i18n.__("Header_ForgotPassword_Password")}
            container={<Container />}
            more={morestuff}
          ></DynamicContainer>
        </div>
        ;
      </div>
    );
  }
}
UserPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UserPassword);

/*


<div className={classes.login_container}>
            <h2 className="font-bold">{i18n.__('Header_ForgotPassword_Password')}</h2>



            <Container/>

            <p className="text-muted text-center">
              <small>{i18n.__('Header_ForgotPassword_Remember')}</small>
            </p>
            <a href="/login">
              {i18n.__("Label_RegisterForm_Login")}
            </a>
          </div>


import React from 'react';
import i18n from 'meteor/universe:i18n';
import dataComposer from '../../composers/account/password.jsx';
// import dataComposer from '../../composers/passwordForm.jsx';
import Component from './_form.jsx';

const Container = dataComposer(Component);

export default class extends React.Component {

  render() {
    return (
      <div className="titania-login">

        <div className="bs-docs-section clearfix">

          <div className="ibox-content">

            <h2 className="font-bold">{i18n.__('Header_ForgotPassword_Password')}</h2>
            <p>
              {i18n.__('Header_ForgotPassword_EnterHint')}
            </p>

            <Container/>

            <p className="text-muted text-center">
              <small>{i18n.__('Header_ForgotPassword_Remember')}</small>
            </p>
            <a className="btn btn-sm btn-white btn-block" href="/login">{i18n.__('Link_ForgotPassword_Login')} </a>

          </div>
          <hr/>
        </div>
      </div>

    );
  }
}


*/
