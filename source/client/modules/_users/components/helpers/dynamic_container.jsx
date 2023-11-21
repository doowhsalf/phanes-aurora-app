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
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import withStyles from "@mui/styles/withStyles";
// const Container = dataComposer(Component);
import PropTypes from "prop-types";
import AppConfig from "/client/configs/app";
import Dividier from "@mui/material/Divider";
import Bg from "../helpers/dynamic_bg";
import Link from "@mui/material/Link";
import LinkIcon from "@mui/icons-material/Link";

const styles = (theme) => ({
  divider: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  content_container_master: {
    ctop: 250,
    width: 400,
    margin: "auto",
    marginTop: 100,
    color: "white",
    margin: "auto",
    background:
      "linear-gradient(to bottom, " +
      alpha(theme.palette.secondary.dark, 0.95) +
      " 0%, " +
      alpha(theme.palette.secondary.main, 0.66) +
      " 100%)",
    borderRadius: 3,
    padding: 15,
    overflow: "hidden",
    "-webkit-backdrop-filter": "blur(4px)",
    "-o-backdrop-filter": "blur(4px)",
    "-moz-backdrop-filter": "blur(4px)",
    "backdrop-filter": "blur(4px)",
  },

  "@keyframes anime": {
    "0%": {
      top: "0",
    },
    "50%": {
      top: "50",
    },
    "100%": {
      top: "0",
    },
  },
  "@-webkit-keyframes anime": {
    "0%": {
      top: "0",
    },
    "50%": {
      top: "50",
    },
    "100%": {
      top: "0",
    },
  },
});

const initialState = {
  uri: "",
  photographer: "",
  publisher: "",
  publisherUri: "",
  publisherName: "",
  bgcss: { zIndex: 0 },
};

class DynamicContainer extends React.Component {
  constructor(props) {
    //console.log("In OrderComponent constructor...");
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    DEFCON3 && console.log("Making request");

    Meteor.call(
      "sycorax.dynamic.async",
      "https://sycorax.tritonite.io/phanes-aurora/meta",
      (err, result) => {
        DEFCON3 && console.log("Response");
        DEFCON3 && console.log(err);
        DEFCON3 && console.log(result);

        if (!err) {
          let imageClass =
            "url(" + result.uri + ")  no-repeat center center fixed";
          let bgCss = {
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 0,
            top: 0,
            left: 0,
            padding: 0,
            margin: "auto",
            background: imageClass,
            backgroundSize: "cover",
          };

          this.setState({
            uri: result.uri,
            photographer: result.photographer,
            bgcss: bgCss,
            publisherUri: result.publisherUri,
            publisherName: result.publisherName,
          });
        }
      }
    );
  }
  render() {
    const { classes, subtitle, hint, container, more } = this.props;

    return (
      <div style={this.state.bgcss}>
        <div className={classes.content_container_master + " system-blur"}>
          <Typography variant="subtitle1" gutterBottom>
            {subtitle}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {hint}
          </Typography>

          {container}
          {more}
          <Dividier className={classes.divider} />
          <Typography variant="caption" gutterBottom className={classes.link}>
            {AppConfig.version + " " + AppConfig.version_build_date}
          </Typography>
        </div>
        <div style={{ position: "fixed", bottom: 20, left: 20 }}>
          <div
            className="dynamic"
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
DynamicContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DynamicContainer);

/* Photo by Agung Pandit Wiguna from Pexels */
