import React from "react";
import i18n from "meteor/universe:i18n";
import dataComposer from "../../composers/account/setpassword.jsx";
// import dataComposer from '../../composers/passwordForm.jsx';
import Component from "./_setform.jsx";
import _ from "lodash";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const Container = dataComposer(Component);
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
class SetPassword extends React.Component {
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
            container={<Container token={this.props.token} />}
            more={morestuff}
          ></DynamicContainer>
        </div>
        ;
      </div>
    );
  }
}
SetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SetPassword);