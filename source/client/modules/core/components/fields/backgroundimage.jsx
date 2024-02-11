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
import PropTypes from "prop-types";
import classNames from "classnames";
import { alpha } from "@mui/material/styles";
import withStyles from '@mui/styles/withStyles';
import Link from "@mui/material/Link";
import LinkIcon from "@mui/icons-material/Link";
import Typography from "@mui/material/Typography";

const styles = (theme) => ({
  overlayCss: {
    background:
      "linear-gradient(to top, " +
      alpha(theme.palette.background.default, 0.0) +
      " 0%, " +
      alpha(theme.palette.background.default, 0.0) +
      " 100%)",

    position: "fixed",
    top: 0,
    left: 0,
    height: "calc(100vh)",
    width: "100%",
    zIndex: -9999,
  },
  overlayCssFromTheme: {
    background:
      "linear-gradient(to top, " +
      alpha(theme.palette.primary.dark, 0.21) +
      " 0%, " +
      alpha(theme.palette.primary.main, 0.34) +
      " 100%)",

    position: "fixed",
    top: 0,
    left: 0,
    height: "calc(100vh)",
    width: "100%",
    zIndex: -9999,
  },
  linkPosition: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: theme.spacing(1),
    margin: theme.spacing(1),
  },
});

// background:  "linear-gradient(to top, rgb(121, 108, 191, .21) 0%, rgba(123, 68, 126, 0.90)  100%)",

const initialState = {
  uri: "",
  photographer: "",
  publisher: "",
  publisherUri: "",
  publisherName: "",
  bgcss: { zIndex: 0 },
  themeUri: "",
};

class BackgroundImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    let bgImage = this.props.themeImageUrl ? this.props.themeImageUrl : "";

    DEFCON3 && console.log("Starting up background image");

    DEFCON3 && console.log(this.props.themeImageUrl);

    this.state = {
      themeUri: bgImage,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.themeImageUrl !== this.props.themeImageUrl) {
      this._getThemeStuff();
    }
  }

  componentDidMount() {
    DEFCON3 && console.log("Making componentDidMount");
    this._getThemeStuff();
  }

  _getThemeStuff() {
    DEFCON3 && console.log("Making request");
    const { classes, themeImageUrl, context, noOverlay } = this.props;
    DEFCON3 && console.log(themeImageUrl);

    if (themeImageUrl) {
      var themeStuff = themeImageUrl.split("/");
    }

    let thisContext = context !== undefined ? context : "phanes-aurora";

    let callMethod = themeImageUrl
      ? themeStuff[2] + "/query"
      : thisContext + "/meta";

    Meteor.call(
      "sycorax.dynamic.async",
      "https://sycorax.tritonite.io/" + callMethod,
      (err, result) => {
        DEFCON3 && console.log("Response");
        DEFCON3 && console.log(err);
        DEFCON3 && console.log(result);
        DEFCON3 && console.log(themeImageUrl);

        let overlayGradiantCss = {
          background:
            "linear-gradient(to top, rgb(121, 108, 191, .21) 0%, rgba(123, 68, 126, 0.90)  100%)",
          position: "fixed",
          top: 0,
          left: 0,
          height: "calc(100vh)",
          width: "100%",
          zIndex: -9999,
        };

        let overlayGradient = noOverlay ? {} : classNames.overlayCss;

        if (!err) {
          let imageClass =
            " url(" +
            (themeImageUrl
              ? themeImageUrl + ") no-repeat center center fixed "
              : result.uri + ") no-repeat center center fixed ");
          let bgCss = {
            position: "fixed",
            top: 0,
            left: 0,
            height: "calc(100vh)",
            width: "100%",
            minHeight: "100%",
            minWidth: "100%",
            background: imageClass,
            backgroundSize: "cover",
            WebkitBackgroundSize: "cover",
            MozBackgroundSize: "cover",
            OBackgroundSize: "cover",
            zIndex: -10000,
          };

          this.setState({
            uri: result.uri,
            photographer: result.photographer,
            bgcss: bgCss,
            overlayCss: overlayGradient,
            publisherUri: result.publisherUri,
            publisherName: result.publisherName,
          });
        }
      }
    );
  }

  render() {
    DEFCON9 && console.log("In BackgroundImage...");

    const { classes, noOverlay } = this.props;

    // let bgImage = themeImageUrl ? themeImageUrl : this.state.uri;
    DEFCON5 && console.log(this.state);

    return (
      <div>
        <div style={this.state.bgcss}></div>
        <div className={noOverlay ? null : classes.overlayCss}></div>
        <div
          className={"dynamic " + classes.linkPosition}
          // style={{ position: "fixed", bottom: 20, left: 20 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <LinkIcon
              style={{
                fontSize: 16,
                color: "rgba(255, 255, 255, 0.6)",
              }}
            />
            <span
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              <Typography
                style={{
                  fontSize: 10,
                }}
                variant="subtitle2"
              >
                {"Photo by "}
              </Typography>
            </span>
            <span>
              <Link
                href={this.state.publisherUri}
                className={classes.link}
                target="_blank"
                underline="hover"
                color="textPrimary"
              >
                <Typography
                  style={{
                    fontSize: 10,
                  }}
                  variant="subtitle2"
                >
                  {this.state.photographer +
                    " from " +
                    this.state.publisherName}
                </Typography>{" "}
              </Link>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

BackgroundImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BackgroundImage);

/*

 /* contentContainer: {
        background:
            "linear-gradient(to top, rgb(121, 108, 191, .21) 0%, " +
            "rgba(123, 68, 126, 0.90) " +
            " 100%)",
        minWidth: "100%",
        minHeight: "100vh",

        : "linear-gradient(to bottom, rgba(29, 30, 31, 0.89), rgba(117, 19, 93, 0.0)),";
    },*/
