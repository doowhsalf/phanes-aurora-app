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
import Component from "./_form.jsx";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
const Container = dataComposer(Component);
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import AppConfig from "/client/configs/app";
import { createTheme } from "@material-ui/core/styles";
import DynamicContainer from "../helpers/dynamic_container";

const styles = (theme) => ({
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
      "url(https://sycorax.tritonite.io/titania) no-repeat center center fixed",
    backgroundSize: "cover",
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
      <div >
        <DynamicContainer
          subtitle={i18n.__("Header_Login_Login")}
          hint={i18n.__("Header_Login_EnterHint")}
          container={<Container />}
        ></DynamicContainer>
      </div>
    );
  }
}
UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UserLogin);
/* <div className={classes.login_page}>
        <div className={classes.dynamic_container2}>
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
      </div>*/
