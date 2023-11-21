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
import Skeleton from "@mui/material/Skeleton";

import Iframe from "react-iframe";
import { renderGoogleMapCompany } from "../helpers/googlemap-iframe";
import { renderLogo } from "../helpers/app-logo";
import { contactInfo } from "../helpers/contact-info";

function _uniqueKey() {
  return Math.random() * Math.random();
}

const styles = (theme) => ({
  contentContainer: {
    // backgroundColor: "rgba(32, 29, 38, 0.95)",
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

  contentThemeLight: { color: "white" },
  contentThemeDark: {},

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
  img: {
    width: "100%",
    height: "auto",
  },
});

const initialState = {
  article: [],
  loading: true,
};

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    //this.getArticle();
  }

  getArticle = () => {
    // let content = this.getWithExpiry("article." + this.props.articleId);
    // if (content === null) {
    //   const { getArticle } = this.props;
    //   var query = {
    //     field_article_id: this.props.articleId,
    //   };
    //   DEFCON3 && console.log("Performing request to get Article ");
    //   DEFCON3 && console.log(this.props.articleId);
    //   Meteor.call("content.getArticle", query, (err, result) => {
    //     if (!err) {
    //       DEFCON3 && console.log("Result in client to handle ");
    //       DEFCON3 && console.log(result);
    //       this.setState({
    //         article:
    //           result.body !== undefined
    //             ? result.body
    //             : result.error[0].description,
    //         loading: false,
    //       });
    //       this.setWithExpiry(
    //         "article." + this.props.articleId,
    //         result.body,
    //         30000
    //       );
    //     } else {
    //       this.setState({
    //         article: "No result at this moment...",
    //       });
    //     }
    //   });
    // } else {
    //   this.setState({
    //     article: content,
    //     loading: false,
    //   });
    // }
  };

  setWithExpiry(key, value, ttl) {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  submit = () => {};

  close = () => {};

  handleChange = () => () => {};

  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };

  render() {
    const { classes, articles, contentpart } = this.props;
    const {} = this.state;
    let themeModeState = localStorage.getItem("themeMode")
      ? JSON.parse(localStorage.getItem("themeMode"))
      : true;
    let code = [];

    if (!articles.length) return "";
    DEFCON4 && console.log("Checking article");
    DEFCON4 && console.log(articles);

    switch (contentpart) {
      case "media.mainimage":
        code = [
          <div>
            <img className={classes.img} src={articles[0].field_image[0].url} />
          </div>,
        ];
        break;

      default:
        code = [
          <div>
            <div
              className={
                themeModeState
                  ? classes.contentThemeLight
                  : classes.contentThemeDark
              }
              dangerouslySetInnerHTML={{ __html: articles[0].body.value }}
            />
          </div>,
        ];
        break;
    }

    return <div>{code}</div>;
  }
}

Article.propTypes = {};

export default withStyles(styles)(Article);
