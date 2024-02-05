import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import Slide from "@mui/material/Slide";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import withStyles from "@mui/styles/withStyles";
import PropTypes from "prop-types";
import SnackBarMessage from "../fields/snackbar-message";
import Container from "@mui/material/Container";
import Article from "../../containers/article";
import Iframe from "react-iframe";
import { renderGoogleMapCompany } from "../helpers/googlemap-iframe";
import { renderLogo } from "../helpers/app-logo";
import { contactInfo } from "../helpers/contact-info";
import Login from "../../../_users/components/loginsimple/wrapper";
import BackgroundDynamic from "../fields/backgroundimage";
import TitleComponent from "../fields/title-component";
function _uniqueKey() {
  return Math.random() * Math.random();
}
import Paper from "@mui/material/Paper";

/*
 background: url(images/bg.jpg) no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  overflow: hidden;
*/

const styles = (theme) => ({
  // backGroundImage: {
  //   height: "100%",
  //   overflow: "hidden",

  //   background:
  //     "url(https://sycorax.tritonite.io/phanes-aurora) no-repeat center center fixed",
  //   backgroundSize: "cover",
  // },

  contentContainer: {
    backgroundColor: "rgba(32, 29, 38, 0.95)",
    overflow: "auto",
    color: "white",
    padding: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(5),
    "-webkit-backdrop-filter": "blur(4px)",
    "-o-backdrop-filter": "blur(4px)",
    "-moz-backdrop-filter": "blur(4px)",
    "backdrop-filter": "blur(4px)",
  },
  loginCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // top: "275px", // Keep the top distance constant
    // right: "105px", // Start from the center horizontally

    // Responsive adjustments for smaller screens
    [theme.breakpoints.down('sm')]: {
      width: "90%",
      height: "auto",
      top: "105px", // Keep the top distance constant
      left: "50%", // Center horizontally
      transform: "translateX(-50%)", // Center horizontally on smaller screens
    },
  },

  paper: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(5),
  },
  dialog: {
    fullWidth: "100%",
  },
  textFieldInput: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  iframeBox: {
    marginTop: theme.spacing(2),
    width: "100%",
    height: 600,
  },
  iframe: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    filter: "grayscale(3)",
  },
  textFieldMulti: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  login: { padding: theme.spacing(1) },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  logo: {
    float: "right",
    maxWidth: 100,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    borderRadius: "50%",
  },
});

const initialState = {
  article: [],
};

class Start extends React.Component {
  constructor(props) {
    super(props);
    DEFCON3 && console.log("Start.jsx constructor");

    this.state = initialState;
  }

  componentDidMount() {
    var relayTimer = Meteor.settings.relayTimer;
    relayTimer = 120000;
    // if (relayTimer === undefined) {
    //   relayTimer = 5000;
    // }

    DEFCON3 && console.log("Timer is set to");
    DEFCON3 && console.log(relayTimer);

    this.interval = setInterval(() => {
      let user_logged_in = !!Meteor.userId() ? true : false;
      if (!user_logged_in) {
        DEFCON4 && console.log("AutoReload page if user is not logged in");
        FlowRouter.reload();
      }
    }, relayTimer);

    //this.getArticle();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getArticle = () => {
    const { getArticle } = this.props;
    var query = {
      field_article_id: "start",
    };
    // getArticle(query, (err, response) => {
    //   if (err) {
    //     DEFCON5 && console.log("getArticle: Error getting Article");
    //     DEFCON5 && console.log(err);
    //   } else {
    //     DEFCON4 && console.log(response);

    //     this.setState({
    //       article: response.body,
    //     });
    //   }
    // });
  };

  submit = () => {};

  close = () => {};

  handleChange = () => () => {};

  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };

  render() {
    const { classes } = this.props;
    const {} = this.state;

    DEFCON3 && console.log("Rendering Start.jsx");

    let user_logged_in = !!Meteor.userId() ? true : false;

    return (
      <div className={classes.backGroundImage}>
        <BackgroundDynamic />

        <Grid container spacing={2} style={{ height: "100vh" }}>
          {/* Upper Left - Title */}
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            {!user_logged_in && (
              <TitleComponent
                title="Aurora"
                subtitle="Advancing Knowledge, Defining Tomorrow."
                manufactory="tritonite.io"
              />
            )}
          </Grid>

          {/* Upper Right */}
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              alignItems: "flex-end", // Align items to the end of the container on the cross axis
              justifyContent: "center", // Align items to the end of the container on the main axis
            }}
          >
            {!user_logged_in && (
              <>
                <div className={classes.loginCard}>
                  <Login className={classes.login} />
                </div>
              </>
            )}
          </Grid>

          {/* Lower Left */}
          <Grid item xs={6}>
            {/* Content here if needed */}
          </Grid>

          {/* Lower Right - Login */}
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              paddingLeft: "43px",
            }}
          ></Grid>
        </Grid>

        <SnackBarMessage
          open={this.state.openSnackbar}
          handleSnackbarClose={this.handleSnackbarClose}
          variant="warning"
          message={this.state.snackbarMessage}
        />
      </div>
    );
  }
}

Start.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Start);
