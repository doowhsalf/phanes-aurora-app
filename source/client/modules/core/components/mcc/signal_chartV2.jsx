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

export default class LineChart extends PureComponent {
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

    // first push all values as object into a common array
    // sort it by time
    // then read the sorted array and based on object push it to data objects for each signal

    let stuff = [];
    for (var i = 0; i < outboundSignals.length; i++) {
      stuff.push(outboundSignals[i]);
    }
    for (var i = 0; i < inboundSignals.length; i++) {
      stuff.push(inboundSignals[i]);
    }

    // console.log(stuff);
    stuff = stuff.sort(compare);

    // the syncer sync the date in a timeline with the original date from stuff and make sure both data objects has a data point at each syncer-data point;
    let syncer = [];
    let prevOutboundValue = 0;
    let prevInboundValue = 0;
    console.log("Check Stuff ");
    console.log(stuff);
    for (var i = 0; i < stuff.length; i++) {
      let item = {
        timehs: new Date(getField(stuff[i], "time") * 1000)
          .toISOString()
          .substr(11, 8),
        outboundValue:
          getField(stuff[i], "route") === "outbound"
            ? stuff[i].value
            : prevOutboundValue,
        inboundValue:
          getField(stuff[i], "route") === "inbound"
            ? stuff[i].value
            : prevInboundValue,
      };
      syncer.push(item);
      prevOutboundValue =
        getField(stuff[i], "route") === "outbound"
          ? stuff[i].value
          : prevOutboundValue;
      prevInboundValue =
        getField(stuff[i], "route") === "inbound"
          ? stuff[i].value
          : prevInboundValue;
    }

    // first create a unique sync

    console.log("Check Syncer ");
    console.log(syncer);

    // for (var i = 0; i < 100; i++) {
    //   xAxisData.push("Date" + i);
    //   data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
    //   data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    // }

    // let useLength =
    //   outboundSignals.length > inboundSignals.length
    //     ? outboundSignals.length
    //     : inboundSignals.length;

    // for (var i = 0; i < useLength; i++) {
    //   xAxisData.push(
    //     getField(outboundSignals[i], "time").length
    //       ? new Date(getField(outboundSignals[i], "time") * 1000)
    //           .toISOString()
    //           .substr(11, 8)
    //       : new Date(getField(inboundSignals[i], "time") * 1000)
    //           .toISOString()
    //           .substr(11, 8)
    //   );

    //   if (outboundSignals !== undefined) {
    //     if (outboundSignals[i] !== undefined) {
    //       data2.push(outboundSignals[i].value);
    //     }
    //   }
    //   if (inboundSignals !== undefined) {
    //     if (inboundSignals[i] !== undefined) {
    //       data1.push(inboundSignals[i].value);
    //     }
    //   }
    // }

    let useLength =
      outboundSignals.length > inboundSignals.length
        ? outboundSignals.length
        : inboundSignals.length;

    // for (var i = 0; i < stuff.length; i++) {
    //   xAxisData.push(
    //     new Date(getField(stuff[i], "time") * 1000).toISOString().substr(11, 8)
    //   );

    //   if (getField(stuff[i], "route") === "outbound") {
    //     data2.push(stuff[i].value);
    //   } else data1.push(stuff[i].value);
    // }

    for (var i = 0; i < syncer.length; i++) {
      xAxisData.push(getField(syncer[i], "timehs"));

      data1.push(syncer[i].inboundValue);
      data2.push(syncer[i].outboundValue);
    }

    return {
      backgroundColor: "rgba(0, 0, 0, 0.55)",
      title: {
        text: "History ",
        textStyle: {
          color: "rgb(255, 70, 131)",
        },
        top: 10,
        left: 10,
      },
      legend: {
        data: [inboundSignalId, outboundSignalId],
        textStyle: {
          color: "rgb(255, 70, 131)",
        },
        top: 10,
      },
      toolbox: {
        feature: {
          dataView: {
            title: "Data View",
            lang: ["Data View", "Close", "Refresh"],
          },

          magicType: {
            title: {
              line: "Switch to Line Chart",
              bar: "Switch to Bar Chart",
              stack: "Stack",
              tiled: "Tile",
            },
          },

          saveAsImage: {
            title: "Save as Image",
            lang: ["Right Click to Save Image"],
          },
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "rgb(255, 70, 131)",
          },
        },
      },
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgb(255, 70, 131)",
          },
        },
        axisLabel: {
          textStyle: {
            color: "rgb(255, 70, 131)",
            margin: 15,
          },
          formatter: function (data) {
            return data;
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgb(255, 70, 131)",
          },
        },
        axisLabel: {
          textStyle: {
            color: "rgb(255, 70, 131)",
            margin: 15,
          },
          formatter: function (data) {
            return data;
          },
        },
        axisTick: {
          show: false,
        },
      },
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 100,
          height: 24,
          textStyle: {
            color: "rgb(255, 70, 131)",
          },
        },
        {
          type: "inside",
          start: 0,
          end: 100,
        },

        // {
        //   show: true,
        //   yAxisIndex: 0,
        //   filterMode: "empty",
        //   width: 10,
        //   height: "80%",
        //   showDataShadow: false,
        //   left: "93%",
        // },
      ],
      series: [
        {
          name: inboundSignalId,
          type: "line",
          smooth: true,
          label: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          color: "#ccc",
          data: data1,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#AE62E8",
              },
              {
                offset: 1,
                color: "#DD5D98",
              },
            ]),
          },
          animationDelay: function (idx) {
            return idx * 10;
          },
        },
        {
          name: outboundSignalId,
          type: "line",
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#AE62E8",
              },
              {
                offset: 1,
                color: "#DD5D98",
              },
            ]),
          },
          data: data2,
          animationDelay: function (idx) {
            return idx * 10 + 100;
          },
        },
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: function (idx) {
        return idx * 5;
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
          style={{ height: "600px", width: "100%" }}
          className="react_for_echarts"
        />
      </div>
    );
  }
}
