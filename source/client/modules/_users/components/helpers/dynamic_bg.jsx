import React from "react";
import {
  DEFCON9,
  DEFCON7,
  DEFCON3,
  DEFCON4,
  DEFCON5,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import Typography from "@mui/material/Typography";
import withStyles from "@mui/styles/withStyles";
// const Container = dataComposer(Component);
import PropTypes from "prop-types";
import AppConfig from "/client/configs/app";
import Dividier from "@mui/material/Divider";

const styles = (theme) => ({});

const initialState = {
  uri: "",
  photographer: "",
};
class DynamicBg extends React.Component {
  constructor(props) {
    //console.log("In OrderComponent constructor...");
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    DEFCON3 && console.log("Making request");

    /*
Meteor.call("channels.add", articleId, channelId, (err, result) => {
      if (callback) {
        callback(err, result);
      }
    });*/

    Meteor.call(
      "sycorax.dynamic.async",
      "https://sycorax.tritonite.io/neptune-pod/meta",
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
          });
        }
      }
    );
  }

  render() {
    const { classes } = this.props;

    DEFCON3 && console.log("Render bg");
    DEFCON3 && console.log(this.state);
    // if (this.state.photographer === undefined) return <div></div>;

    // let imageClass =
    //   "url(" + this.state.uri + ")  no-repeat center center fixed";

    // let bgCss = {
    //   position: "absolute",
    //   width: "100%",
    //   height: "100%",
    //   zIndex: 1,
    //   top: 0,
    //   left: 0,
    //   padding: 0,
    //   margin: "auto",
    //   background: imageClass,
    //   backgroundSize: "cover",
    // };
    DEFCON3 && console.log(this.state.bgCss);

    return <div style={this.state.bgcss}></div>;
  }
}
DynamicBg.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DynamicBg);
