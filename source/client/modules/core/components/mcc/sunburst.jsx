import React, { PureComponent } from "react";
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

export default class Sunburst extends PureComponent {
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
      color: "#F54F4A",
    };
    const item2 = {
      color: "#FF8C75",
    };
    const item3 = {
      color: "#FFB499",
    };
    const data = [
      {
        children: [
          {
            value: 5,
            name: 'Muff 1',
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

  render() {
    const { classes, signalId, SignalHistoryData } = this.props;

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
