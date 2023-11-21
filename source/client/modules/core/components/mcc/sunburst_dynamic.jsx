import React, { PureComponent } from "react";
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
import withStyles from "@mui/styles/withStyles";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts/lib/echarts";
import { getField } from "../helpers/getField";
import { toolbox as features } from "echarts/lib/langEN";
function compare(a, b) {
  if (a.time < b.time) {
    return -1;
  }
  if (a.time > b.time) {
    return 1;
  }
  return 0;
}
const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    top: "auto",
    bottom: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.white,
  },
  inline: {
    display: "inline",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  BottomNavigation: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  cardDark: {
    marginRight: theme.spacing(0),
    minHeight: 72,
    backgroundColor: "rgba(29, 30, 31,1)",
  },
  cardLight: {
    marginRight: theme.spacing(0),
    minHeight: 72,
  },

  MccWindow: { overflow: "auto" },
  MccLineText: {
    backgroundColor: theme.palette.secondary.light,
    padding: 0,
    marginLeft: 10,
    borderRadius: 5,
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "calc(100vh - 50px)",
    backgroundColor: theme.palette.background.default,
  },
  channelList: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    borderRight: "1px solid",
    borderImage:
      "linear-gradient( to bottom, " +
      theme.palette.secondary.light +
      ", rgba(0, 0, 0, 0)) 1 100%",
    marginRight: 0,
    padding: theme.spacing(0),
    [theme.breakpoints.down("xl")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: 270,
      maxWidth: 270,
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 270,
      maxWidth: 270,
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  mcc: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  cardTransparent: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, " +
      "rgba(0,0,0,0.77) 34%, rgba(0,0,0,0.66) 55%)",
  },
  MccDark: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    backgroundColor: "rgba(29, 30, 31,1)",
    // borderWidth: "1px",
    // borderColor: "#ccc",
    // borderRightStyle: "solid",
    // borderLeftStyle: "solid",
  },
  MccLight: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    // borderWidth: "1px",
    // borderColor: "#ccc",
    // borderRightStyle: "solid",
    // borderLeftStyle: "solid",
  },

  textEditArea: {
    position: "fixed",
    // [theme.breakpoints.down("xs")]: {
    //   width: "calc(100vh - 290px)",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   width: "calc(100vh - 350px)",
    // },
    // [theme.breakpoints.up("md")]: {
    //   width: "calc(100vh - 350px)",
    //   width: "100%",
    // },
    width: "100%",

    bottom: 0,
    // backgroundColor: "red",
    padding: theme.spacing(1),
  },
});

var superOption = "sunburst";

class SunburstDynamic extends React.Component {
  constructor(props) {
    super(props);
    DEFCON5 && console.log("In Sunburst constructor...");
    this.state = {
      option: "sunburst",
    };
  }
  componentDidMount() {
    // window.setInterval(function () {
    //   // check if this.state.option is not undefined and then set superOption to treemap else sunburst (as strings)
    //   superOption = superOption === "sunburst" ? "treemap" : "sunburst";
    //   DEFCON5 && console.log("superOption", superOption);
    //   this.setState({ option: superOption });
    // }, 5000);
    window.setInterval(() => {
      superOption = superOption === "sunburst" ? "treemap" : "sunburst";
      DEFCON5 && console.log("superOption", superOption);
      this.setState({ option: superOption });
    }, 5000);
  }

  componentWillUnmount() {}

  getOption2 = () => {
    const {
      classes,
      signalId,
      inboundSignalId,
      outboundSignalId,
      outboundSignals,
      inboundSignals,
    } = this.props;

    var xAxisData = [];
    var data1 = [];
    var data2 = [];

    const item1 = {
      color: "#F54F4A",
    };
    const item2 = {
      color: "#FF8C75",
    };
    const item3 = {
      color: "#FFB499",
    };
    const item4 = {
      // Make a red color
      color: "#f3f333",
      
    };
    const data = [
      {
        children: [
          {
            value: 5,
            name: "Muff 1",
            children: [
              {
                value: 1,
                itemStyle: item1,
              },
              {
                value: 2,
                children: [
                  {
                    value: 5,
                    itemStyle: item4,
                  },
                ],
              },
              {
                children: [
                  {
                    value: 1,
                  },
                ],
              },
            ],
            itemStyle: item1,
          },
          {
            value: 10,
            children: [
              {
                value: 6,
                children: [
                  {
                    value: 1,
                    itemStyle: item1,
                  },
                  {
                    value: 1,
                  },
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                  {
                    value: 1,
                  },
                ],
                itemStyle: item3,
              },
              {
                value: 2,
                children: [
                  {
                    value: 1,
                  },
                ],
                itemStyle: item3,
              },
              {
                children: [
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                ],
              },
            ],
            itemStyle: item1,
          },
        ],
        itemStyle: item1,
      },
      {
        value: 9,
        children: [
          {
            value: 4,
            children: [
              {
                value: 2,
                itemStyle: item2,
              },
              {
                children: [
                  {
                    value: 1,
                    itemStyle: item1,
                  },
                ],
              },
            ],
            itemStyle: item1,
          },
          {
            children: [
              {
                value: 3,
                children: [
                  {
                    value: 1,
                  },
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                ],
              },
            ],
            itemStyle: item3,
          },
        ],
        itemStyle: item2,
      },
      {
        value: 7,
        children: [
          {
            children: [
              {
                value: 1,
                itemStyle: item3,
              },
              {
                value: 3,
                children: [
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                  {
                    value: 1,
                  },
                ],
                itemStyle: item2,
              },
              {
                value: 2,
                children: [
                  {
                    value: 1,
                  },
                  {
                    value: 1,
                    itemStyle: item1,
                  },
                ],
                itemStyle: item1,
              },
            ],
            itemStyle: item3,
          },
        ],
        itemStyle: item1,
      },
      {
        children: [
          {
            value: 6,
            children: [
              {
                value: 1,
                itemStyle: item2,
              },
              {
                value: 2,
                children: [
                  {
                    value: 2,
                    itemStyle: item2,
                  },
                ],
                itemStyle: item1,
              },
              {
                value: 1,
                itemStyle: item3,
              },
            ],
            itemStyle: item3,
          },
          {
            value: 3,
            children: [
              {
                value: 1,
              },
              {
                children: [
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                ],
              },
              {
                value: 1,
              },
            ],
            itemStyle: item3,
          },
        ],
        itemStyle: item1,
      },
    ];

    return {
      visualMap: {
        type: "continuous",
        min: 0,
        max: 10,
        inRange: {
          color: ["#2F93C8", "#AEC48F", "#FFDB5C", "#F98862"],
        },
      },
      series: {
        radius: [0, "90%"],
        type: "sunburst",
        sort: undefined,
                  animationDurationUpdate: 1000,

        universalTransition: true,

        emphasis: {
          focus: "ancestor",
        },
        data: data,
        label: {
          rotate: "radial",
        },
        levels: [],
        itemStyle: {
          color: "#ddd",
          borderWidth: 2,
          borderRadius: 7,
          borderWidth: 2,
        },
      },
    };
  };

  getOption = () => {
    const {
      classes,
      signalId,
      inboundSignalId,
      outboundSignalId,
      outboundSignals,
      inboundSignals,
    } = this.props;

    var xAxisData = [];
    var data1 = [];
    var data2 = [];

    const item1 = {
      color: "#F53333",
    };
    const item2 = {
      color: "#FF8888",
    };
    const item3 = {
      color: "#F44499",
    };
    const data = [
      {
        children: [
          {
            value: 5,
            name: "Muff 1",
            children: [
              {
                value: 1,
                itemStyle: item1,
              },
              {
                value: 2,
                children: [
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                ],
              },
              {
                children: [
                  {
                    value: 1,
                  },
                ],
              },
            ],
            itemStyle: item1,
          },
          {
            value: 10,
            children: [
              {
                value: 6,
                children: [
                  {
                    value: 1,
                    itemStyle: item1,
                  },
                  {
                    value: 1,
                  },
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                  {
                    value: 1,
                  },
                ],
                itemStyle: item3,
              },
              {
                value: 2,
                children: [
                  {
                    value: 1,
                  },
                ],
                itemStyle: item3,
              },
              {
                children: [
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                ],
              },
            ],
            itemStyle: item1,
          },
        ],
        itemStyle: item1,
      },
      {
        value: 9,
        children: [
          {
            value: 4,
            children: [
              {
                value: 2,
                itemStyle: item2,
              },
              {
                children: [
                  {
                    value: 1,
                    itemStyle: item1,
                  },
                ],
              },
            ],
            itemStyle: item1,
          },
          {
            children: [
              {
                value: 9,
                children: [
                  {
                    value: 1,
                  },
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                ],
              },
            ],
            itemStyle: item3,
          },
        ],
        itemStyle: item2,
      },
      {
        value: 17,
        children: [
          {
            children: [
              {
                value: 1,
                itemStyle: item3,
              },
              {
                value: 3,
                children: [
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                  {
                    value: 1,
                  },
                ],
                itemStyle: item2,
              },
              {
                value: 2,
                children: [
                  {
                    value: 1,
                  },
                  {
                    value: 1,
                    itemStyle: item1,
                  },
                ],
                itemStyle: item1,
              },
            ],
            itemStyle: item3,
          },
        ],
        itemStyle: item1,
      },
      {
        children: [
          {
            value: 6,
            children: [
              {
                value: 1,
                itemStyle: item2,
              },
              {
                value: 2,
                children: [
                  {
                    value: 2,
                    itemStyle: item2,
                  },
                ],
                itemStyle: item1,
              },
              {
                value: 1,
                itemStyle: item3,
              },
            ],
            itemStyle: item3,
          },
          {
            value: 3,
            children: [
              {
                value: 1,
              },
              {
                children: [
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                ],
              },
              {
                value: 1,
              },
            ],
            itemStyle: item3,
          },
        ],
        itemStyle: item1,
      },
    ];

    return {
      visualMap: {
        type: "continuous",
        min: 0,
        max: 10,
        inRange: {
          color: ["#2F93C8", "#AEC48F", "#FFDB5C", "#F98862"],
        },
      },
      series: {
        radius: [0, "90%"],
        type: "sunburst",
        sort: undefined,
        emphasis: {
          focus: "ancestor",
        },
        animationDurationUpdate: 1000,

        universalTransition: true,
        data: data,
        label: {
          rotate: "radial",
        },
        levels: [],
        itemStyle: {
          color: "#ddd",
          borderWidth: 2,
          borderRadius: 7,
          borderWidth: 2,
        },
      },
    };
  };

  render() {
    const { classes, signalId, SignalHistoryData } = this.props;

    // log this.state.option
    DEFCON5 && console.log("this.state.option ", this.state.option);

    // let code =
    //   "<ReactEcharts \n" +
    //   "  option={this.getOption()} \n" +
    //   "  style={{height: '600px', width: '100%'}}  \n" +
    //   "  className='react_for_echarts' />";
    return (
      <div>
        <ReactEcharts
          option={
            this.state.option === "treemap"
              ? this.getOption()
              : this.getOption2()
          }
          style={{ height: "400px", width: "100%" }}
          className="react_for_echarts"
        />
      </div>
    );
  }
}
SunburstDynamic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SunburstDynamic);
