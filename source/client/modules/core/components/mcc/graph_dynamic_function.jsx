import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const GraphChart = () => {
  const chartRef = useRef(null);


  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const option = {
      series: [
        {
          type: "graph",
          data: [
            { id: "node1", name: "Node 1", x: 100, y: 100 },
            { id: "node2", name: "Node 2", x: 200, y: 100 },
            { id: "node3", name: "Node 3", x: 150, y: 150 },
            { id: "node4", name: "Node 4", x: 100, y: 200 },
            { id: "node5", name: "Node 5", x: 200, y: 200 },
          ],
          links: [
            { source: "node1", target: "node2" },
            { source: "node1", target: "node3" },
            { source: "node1", target: "node4" },
            { source: "node2", target: "node5" },
            { source: "node3", target: "node5" },
            { source: "node4", target: "node5" },
          ],
          layout: "none",
          symbolSize: 50,
          roam: true,
          label: {
            show: true,
            fontSize: 14,
            fontWeight: "bold",
          },
          lineStyle: {
            color: "#999",
          },
          itemStyle: {
            emphasis: {
              focus: {
                itemStyle: {
                  borderColor: "#fff",
                  borderWidth: 2,
                  shadowBlur: 10,
                  shadowColor: "#aaa",
                },
                label: {
                  color: "#333",
                },
              },
              onclick: function (params) {
                console.log("Node clicked:", params.name);
              },
            },
          },
        },
      ],
    };

    chart.setOption(option);

    chart.on("click", function (params) {
      console.log("Node clicked:", params.name);
    });

    return () => {
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>;
};

export default GraphChart;
