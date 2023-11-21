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


    
    let webkitDep = {
      type: "force",
      categories: [
        {
          name: "HTMLElement",
          keyword: {},
          base: "HTMLElement",
        },
        {
          name: "WebGL",
          keyword: {},
          base: "WebGLRenderingContext",
        },
        {
          name: "SVG",
          keyword: {},
          base: "SVGElement",
        },
        {
          name: "CSS",
          keyword: {},
          base: "CSSRule",
        },
        {
          name: "Other",
          keyword: {},
        },
      ],
      nodes: [
        {
          name: "AnalyserNode",
          value: 1,
          category: 4,
        },
        {
          name: "AudioNode",
          value: 1,
          category: 4,
        },
        {
          name: "Uint8Array",
          value: 1,
          category: 4,
        },
        {
          name: "Float32Array",
          value: 1,
          category: 4,
        },
        {
          name: "ArrayBuffer",
          value: 1,
          category: 4,
        },
        {
          name: "ArrayBufferView",
          value: 1,
          category: 4,
        },
        {
          name: "Attr",
          value: 1,
          category: 4,
        },
        {
          name: "Node",
          value: 1,
          category: 4,
        },
        {
          name: "Element",
          value: 1,
          category: 4,
        },
        {
          name: "AudioBuffer",
          value: 1,
          category: 4,
        },
        {
          name: "AudioBufferCallback",
          value: 1,
          category: 1,
        },
        {
          name: "AudioBufferSourceNode",
          value: 1,
          category: 4,
        },
        {
          name: "AudioSourceNode",
          value: 1,
          category: 2,
        },
        {
          name: "AudioGain",
          value: 1,
          category: 4,
        },
        {
          name: "AudioParam",
          value: 1,
          category: 4,
        },
        {
          name: "AudioContext",
          value: 1,
          category: 3,
        },
        {
          name: "AudioDestinationNode",
          value: 1,
          category: 4,
        },
        {
          name: "AudioListener",
          value: 1,
          category: 4,
        },
        {
          name: "BiquadFilterNode",
          value: 1,
          category: 4,
        },
        {
          name: "ChannelMergerNode",
          value: 1,
          category: 4,
        },
        {
          name: "ChannelSplitterNode",
          value: 1,
          category: 4,
        },
        {
          name: "ConvolverNode",
          value: 1,
          category: 4,
        },
        {
          name: "DelayNode",
          value: 1,
          category: 5,
        },
        {
          name: "DynamicsCompressorNode",
          value: 1,
          category: 4,
        },
        {
          name: "GainNode",
          value: 1,
          category: 4,
        },
        {
          name: "MediaElementAudioSourceNode",
          value: 1,
          category: 4,
        },
        {
          name: "MediaStreamAudioDestinationNode",
          value: 1,
          category: 4,
        },
        {
          name: "MediaStreamAudioSourceNode",
          value: 1,
          category: 4,
        },
        {
          name: "OscillatorNode",
          value: 1,
          category: 4,
        },
        {
          name: "PannerNode",
          value: 1,
          category: 4,
        },
        {
          name: "ScriptProcessorNode",
          value: 1,
          category: 4,
        },
        {
          name: "WaveShaperNode",
          value: 1,
          category: 4,
        },
        {
          name: "WaveTable",
          value: 1,
          category: 4,
        },
        {
          name: "CanvasRenderingContext",
          value: 1,
          category: 4,
        },
        {
          name: "HTMLCanvasElement",
          value: 1,
          category: 0,
        },
        {
          name: "CanvasRenderingContext2D",
          value: 1,
          category: 4,
        },
        {
          name: "ImageData",
          value: 1,
          category: 4,
        },
      ],
      links: [
        {
          source: 0,
          target: 1,
        },
        {
          source: 0,
          target: 2,
        },
        {
          source: 0,
          target: 3,
        },
        {
          source: 4,
          target: 4,
        },
        {
          source: 5,
          target: 4,
        },
        {
          source: 6,
          target: 7,
        },
        {
          source: 6,
          target: 8,
        },
        {
          source: 9,
          target: 3,
        },
        {
          source: 10,
          target: 9,
        },
      ],
    };

    return {
      legend: {
        data: ["HTMLElement", "WebGL", "SVG", "CSS", "Other"],
      },
      series: [
        {
          type: "graph",
          layout: "force",
          animation: false,
          label: {
            position: "right",
            formatter: "{b}",
          },
          draggable: true,
          data: webkitDep.nodes.map(function (node, idx) {
            node.id = idx;
            return node;
          }),
          categories: webkitDep.categories,
          force: {
            edgeLength: 5,
            repulsion: 20,
            gravity: 0.2,
          },
          edges: webkitDep.links,
          lineStyle: {
            color: "source",
            curveness: 0.3,
            color: "#ddd",
          },
          
        },
      ],
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
    series: [{
        type: 'graph',
        data: [
            { id: 'node1', name: 'Node 1', x: 100, y: 100 },
            { id: 'node2', name: 'Node 2', x: 200, y: 100 },
            { id: 'node3', name: 'Node 3', x: 150, y: 150 },
            { id: 'node4', name: 'Node 4', x: 100, y: 200 },
            { id: 'node5', name: 'Node 5', x: 200, y: 200 },
        ],
        links: [
            { source: 'node1', target: 'node2' },
            { source: 'node1', target: 'node3' },
            { source: 'node1', target: 'node4' },
            { source: 'node2', target: 'node5' },
            { source: 'node3', target: 'node5' },
            { source: 'node4', target: 'node5' },
        ],
        layout: 'none',
        symbolSize: 50,
        roam: true,
        label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
        },
        lineStyle: {
            color: '#999'
        },
        // Add emphasis and onclick event handler to each node
        itemStyle: {
            emphasis: {
                focus: {
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 2,
                        shadowBlur: 10,
                        shadowColor: '#aaa'
                    },
                    label: {
                        color: '#333'
                    }
                },
                onclick: function(params) {
                    console.log('Node clicked:', params.name);
                }
            }
        }
    }]
}
   
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
          option={this.getOption()}
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
