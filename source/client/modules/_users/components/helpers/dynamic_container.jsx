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
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
// const Container = dataComposer(Component);
import PropTypes from "prop-types";
import AppConfig from "/client/configs/app";
import Dividier from "@material-ui/core/Divider";
import Bg from "../helpers/dynamic_bg";
import Link from "@material-ui/core/Link";
import LinkIcon from "@material-ui/icons/Link";
import { alpha } from "@material-ui/core/styles/colorManipulator";

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
      alpha(theme.palette.secondary.dark, 0.89) +
      " 0%, " +
      alpha(theme.palette.secondary.main, 0.66) +
      " 100%)",
    borderRadius: 3,
    padding: 15,
    overflow: "hidden",
  },
  dynamic_container2: {
    top: 250,
    width: 300,
    margin: "auto",
    marginTop: 100,
    color: "white",
    margin: "auto",

    background:
      "linear-gradient(to top, rgba(123, 68, 126, .66) 0%, " +
      theme.palette.primary.dark +
      " 100%)",
    "-webkit-backdrop-filter": "blur(4px)",
    "-o-backdrop-filter": "blur(4px)",
    "-moz-backdrop-filter": "blur(4px)",
    "backdrop-filter": "blur(4px)",
    borderRadius: 6,
    padding: 15,
    overflow: "hidden",
  },
  dynamic_container5: {
    top: 250,
    width: 300,
    margin: "auto",
    marginTop: 100,
    color: "white",
    margin: "auto",

    background: "linear-gradient(to top, rgba(1, 1, 1, 0.89) 0%, #8E72BD 100%)",
    borderRadius: 6,
    padding: 15,
    overflow: "hidden",
  },
  dynamic_container3: {
    top: 250,
    width: 300,
    margin: "auto",
    marginTop: 100,
    color: "white",
    margin: "auto",
    borderRadius: 6,
    padding: 15,
    overflow: "hidden",
    background:
      "linear-gradient(0% -5%, rgba(0, 0, 0, 0.08)  0%, #8E72BD 20%, #A473B6 40%, #7F6BBB 60%, #A473B6 70%, rgba(0, 0, 0, 0.08)  100%)",
    background:
      "-moz-linear-gradient(0% -5%,rgba(0, 0, 0, 0.08) 0%, #8E72BD 20%, #A473B6 40%, #7F6BBB 60%, #A473B6 70%, rgba(0, 0, 0, 0.08)  100%)",
    background:
      "-webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0, rgba(0, 0, 0, 0.08)), color-stop(0.2, #8E72BD), color-stop(0.4, #A473B6), color-stop(0.6, #7F6BBB), color-stop(0.8, #A473B6), color-stop(1, rgba(0, 0, 0, 0.08)))",
    "-o-animation": "anime 17.5s infinite",
    "-ms-animation": "anime 17.5s infinite",
    "-moz-animation": "anime 17.5s infinite,",
    "-webkit-animation": "anime 17.5s infinite",
  },
  dynamic_container4: {
    top: 250,
    width: 300,
    margin: "auto",
    marginTop: 100,
    color: "white",
    margin: "auto",
    borderRadius: 6,
    padding: 15,
    overflow: "hidden",
    background:
      "linear-gradient(0% -15%, #7F6BBB 0%, #8E72BD 20%, ##A473B6 40%, #C87EA9 60%, #E598A1 80%, #ECA4A5 100%)",
    background:
      "-moz-linear-gradient(0% -15%, #7F6BBB 0%, #8E72BD 20%, ##A473B6 40%, #C87EA9 60%, #E598A1 80%, #ECA4A5 100%)",
    background:
      "-webkit-gradient(linear, 0% -15%, 100% 100%, color-stop(0, #7F6BBB), color-stop(0.2, #8E72BD), color-stop(0.4, #A473B6), color-stop(0.6, #C87EA9), color-stop(0.8, #E598A1), color-stop(1, #ECA4A5))",
    "-o-animation": "anime 17.5s infinite",
    "-ms-animation": "anime 17.5s infinite",
    "-moz-animation": "anime 17.5s infinite,",
    "-webkit-animation": "anime 17.5s infinite",
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
      "https://sycorax.tritonite.io/titania/meta",
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
