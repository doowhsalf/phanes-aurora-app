import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import darkTheme from "./themedark";

echarts.registerTheme("dark", darkTheme);// Register the theme with ECharts
//echarts.registerTheme("dark");

function PerformanceChart({ value, label }) {
  const getOption = () => {
    return {
      series: [
        {
          type: "gauge",
          detail: { formatter: "{value}%" },
          data: [{ value: value, name: label }],
        },
      ],
      // ... (any other necessary configurations)
    };
  };

  return (
    <ReactECharts
      option={getOption()}
      notMerge={true}
      lazyUpdate={true}
      theme="dark"
    />
  );
}

export default PerformanceChart;
