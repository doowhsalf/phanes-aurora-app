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
  backGroundImage: {
    height: "100%",
    overflow: "hidden",

    background:
      "url(https://sycorax.tritonite.io/neptune-pod) no-repeat center center fixed",
    backgroundSize: "cover",
  },

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
    this.state = initialState;
  }

  componentDidMount() {
    var relayTimer = Meteor.settings.relayTimer;
    relayTimer = 120000;
    // if (relayTimer === undefined) {
    //   relayTimer = 5000;
    // }

    DEFCON5 && console.log("Timer is set to");
    DEFCON5 && console.log(relayTimer);

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

    const header = [
      <div key={_uniqueKey()}>
        <Typography variant={"h3"}>{i18n.__("Label_Welcome")}</Typography>
      </div>,
    ];

    let user_logged_in = !!Meteor.userId() ? true : false;
    DEFCON4 && console.log("User login status: " + user_logged_in);
    let formSpacing = !user_logged_in ? 8 : 12;

    return (
      <div className={classes.backGroundImage}>
        <BackgroundDynamic />
        {/* <div
          style={{
            background:
              "url(https://sycorax.tritonite.io/neptune-pod) no-repeat center center fixed",
            backgroundSize: "cover",
            position: "fixed",
            minWidth: "100%",
            minHeight: "100%",
            right: 0,
            bottom: 0,
            zIndex: -10000,
            left: 0,
            backgroundSize: "cover",
            top: 0,
            opacity: this.state.loading ? 0 : 1,
            transition: "opacity, 2s ease-in-out",
          }}
        >
          <source id="mp4" src="/assets/newsroom1.mp4" type="video/mp4" />
        </div> */}
        <Container style={{ marginTop: 100 }} maxWidth="md">
          <Paper elevation={0} className={classes.contentContainer}>
            <Grid container={true} spacing={8}>
              <Grid item={true} md={formSpacing}>
                {/* <div dangerouslySetInnerHTML={{ __html: this.state.article }} /> */}
                <Article articleId={"start"} />
                {user_logged_in ? (
                  <div>
                    {contactInfo()}
                    {renderGoogleMapCompany(classes)}
                    {renderLogo(classes)}
                  </div>
                ) : (
                  <div>
                    {contactInfo()}
                    {renderGoogleMapCompany(classes)}
                    {renderLogo(classes)}
                  </div>
                )}
              </Grid>
              {!user_logged_in ? (
                <Grid item={true} md={4}>
                  <Login className={classes.login} />
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Paper>
        </Container>
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
