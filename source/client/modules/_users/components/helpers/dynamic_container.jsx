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
import Grid from "@mui/material/Grid";
import TitleComponent from "../../../core/components/fields/title-component";
import BackgroundImage from "../../../core/components/fields/backgroundimage.jsx";

const styles = (theme) => ({
  divider: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  contentCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // top: "275px", // Keep the top distance constant
    // right: "105px", // Start from the center horizontally

    // Responsive adjustments for smaller screens
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: "auto",
      top: "105px", // Keep the top distance constant
      left: "50%", // Center horizontally
      transform: "translateX(-50%)", // Center horizontally on smaller screens
    },
  },
  content_container_master: {
    color: "white",
    "mix-blend-mode": "normal",
    border: "1px solid rgba(255, 255, 255, 0.21)",
    width: 480,
    margin: "auto",
    borderRadius: 3,
    padding: 15,
    overflow: "hidden",
    // Apply a blur effect to the background
    backdropFilter: "blur(48px)", // You can adjust the px value to increase/decrease the blur effect
    WebkitBackdropFilter: "blur(48px)", // For Safari compatibility
    "-webkit-backdrop-filter": "blur(48px)",
    "-o-backdrop-filter": "blur(48px)",
    "-moz-backdrop-filter": "blur(48px)",
    "backdrop-filter": "blur(48px)",
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
  // componentDidMount() {
  //   DEFCON3 && console.log("Making request");

  //   Meteor.call(
  //     "sycorax.dynamic.async",
  //     "https://sycorax.tritonite.io/phanes-aurora/meta",
  //     (err, result) => {
  //       DEFCON3 && console.log("Response");
  //       DEFCON3 && console.log(err);
  //       DEFCON3 && console.log(result);

  //       if (!err) {
  //         let imageClass =
  //           "url(" + result.uri + ")  no-repeat center center fixed";
  //         let bgCss = {
  //           position: "absolute",
  //           width: "100%",
  //           height: "100%",
  //           zIndex: 0,
  //           top: 0,
  //           left: 0,
  //           padding: 0,
  //           margin: "auto",
  //           background: imageClass,
  //           backgroundSize: "cover",
  //         };

  //         this.setState({
  //           uri: result.uri,
  //           photographer: result.photographer,
  //           bgcss: bgCss,
  //           publisherUri: result.publisherUri,
  //           publisherName: result.publisherName,
  //         });
  //       }
  //     }
  //   );
  // }
  render() {
    const { classes, subtitle, hint, container, more } = this.props;

    return (
      <div>
        <BackgroundImage></BackgroundImage>
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
            <TitleComponent
              title="Aurora"
              subtitle="Insightful Context Awareness"
            />
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
            <div className={classes.loginCard}>
              <div className={classes.content_container_master}>
                <Typography variant="subtitle1" gutterBottom>
                  {subtitle}
                </Typography>
                <Typography variant="caption" gutterBottom>
                  {hint}
                </Typography>

                {container}
                {more}
                <Dividier className={classes.divider} />
                <Typography
                  variant="caption"
                  gutterBottom
                  className={classes.link}
                >
                  {AppConfig.version + " " + AppConfig.version_build_date}
                </Typography>
              </div>
            </div>
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
            }}
          ></Grid>
        </Grid>
        {/* <div style={{ position: "fixed", bottom: 20, left: 20 }}>
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
        </div> */}
      </div>
    );
  }
}
DynamicContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DynamicContainer);

/* Photo by Agung Pandit Wiguna from Pexels */
