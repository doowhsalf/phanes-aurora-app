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

import Iframe from "react-iframe";
import { renderGoogleMapCompany } from "../helpers/googlemap-iframe";
import { renderLogo } from "../helpers/app-logo";
import { contactInfo } from "../helpers/contact-info";

function _uniqueKey() {
  return Math.random() * Math.random();
}

const styles = (theme) => ({
  backGroundImage: {
    height: "100%",
    overflow: "hidden",

    background:
      "url(https://sycorax.tritonite.io/phanes-aurora) no-repeat center center fixed",
    backgroundSize: "cover",
  },

  contentContainer: {
    backgroundColor: "rgba(32, 29, 38, 0.95)",
    overflow: "auto",
    padding: theme.spacing(4),
  },
  paper: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(0),
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
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

  button: {},
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
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
});

const initialState = {
  article: [],
};

class Restore extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.getArticle();
  }

  getArticle = () => {
    const { getArticle } = this.props;
    var query = {
      field_article_id: "onboarding-start",
    };
    getArticle(query, (err, response) => {
      if (err) {
        DEFCON5 && console.log("getArticle: Error getting Article");
        DEFCON5 && console.log(err);
      } else {
        DEFCON3 && console.log(response);

        this.setState({
          article: response.body,
        });
      }
    });
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
        <Typography variant={"h3"}>Om oss</Typography>
      </div>,
    ];

    return (
      <div className={classes.backGroundImage}>
        <Container
          style={{ marginTop: 100 }}
          className={classes.contentContainer}
          maxWidth="md"
        >
          <Grid container={true} spacing={2}>
            <Grid item={true} md={12}>
              <div dangerouslySetInnerHTML={{ __html: this.state.article }} />

              {renderLogo(classes)}
            </Grid>
          </Grid>
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

Restore.propTypes = {};

export default withStyles(styles)(Restore);
