import React, { useState, useEffect, useRef } from "react";
import {
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import echarts from "echarts/lib/echarts";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import ReactECharts from "echarts-for-react";
import FlippableCard from "../../../helpers/flippable-card";
import { lightGreen } from "@mui/material/colors";
import TimeAgoLive from "../../../fields/timeagolive/timeagolive";
import ExportDataDialog from "../export-data-dialog";
import CombinedSignalBoard from "../combined-signal-board";
import BackgroundX from "../card-background";
/*[
            "24h",
            "1day",
            "last7days",
            "1week",
            "last30days",
            "1month",
            "last12months",
            "1year",
          ]*/
function SensorCard({ sensorData, historyData }) {
  // check if sensorData is null or undefined and return null if so
  if (sensorData === null || sensorData === undefined) {
    return null;
  }
  if (!historyData) {
    return <div>Loading...</div>;
  }

  const theme = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [timePeriod, setTimePeriod] = useState("24h");
  const [prevHumidity, setPrevHumidity] = useState(null);
  const previousHumidityRef = useRef(sensorData.humidity);
  const displayedData =
    historyData && historyData[timePeriod] ? historyData[timePeriod] : {};

  useEffect(() => {
    // Only update the previous humidity when the current humidity changes
    if (sensorData.humidity !== prevHumidity) {
      setPrevHumidity(sensorData.humidity);
    }
  }, [sensorData.humidity]);

  useEffect(() => {
    previousHumidityRef.current = prevHumidity;
  }, [prevHumidity]);

  let sensorChangeStyle = {
    // set default color to theme.palette.primary.main
    color: theme.palette.primary.main, // Default color to see if any color is applied
    animation: "fadeInColor 1s both",
    opacity: 1,
  };
  let sensorChangeStyleSecondary = {
    // set default color to theme.palette.primary.main
    color: "#FF9800", // Default color to see if any color is applied
    animation: "fadeInColor 1s both",
    opacity: 1,
  };
  // if (previousHumidityRef.current !== null) {
  //   if (sensorData.humidity > previousHumidityRef.current) {
  //     sensorChangeStyle.color = theme.palette.primary.light; // For increased humidity
  //   } else if (sensorData.humidity < previousHumidityRef.current) {
  //     sensorChangeStyle.color = theme.palette.primary.dark; // For decreased humidity
  //   } else {
  //     sensorChangeStyle.color = theme.palette.primary.main; // No change in humidity
  //   }
  // }

  const getTitleForPeriod = (period) => {
    switch (period) {
      case "24h":
        return "Last 24 hours";
      case "1day":
        return displayedData.dates
          ? `${displayedData.dates[0]} - ${displayedData.dates.slice(-1)}`
          : "";
      case "1week":
        return "Last 7 days";
      case "1month":
        const currentMonth = new Date().toLocaleString("default", {
          month: "long",
        });
        return currentMonth;
      case "1year":
        return "Last 12 months";
      case "last7days":
        return "Last 7 days";
      case "last30days":
        return "Last 30 days";
      case "last12months":
        return "Last 12 months";
      default:
        return "";
    }
  };

  // set TimeAgoDate to CET
  let timeAgoDate = new Date(sensorData.lastTimestamp);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Extract data based on the selected time period
  const chartTitle = getTitleForPeriod(timePeriod);
  /*
const chartOptions = {
    backgroundColor: theme.palette.paper,
    xAxis: {
      type: "category",
      data: displayedData.dates || [],
      axisLabel: {
        color: "#aaa",
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#aaa",
      },
    },
    series: [
      {
        data: displayedData.values || [],
        type: "line",
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#FFA726", // A bright orange at the start
            },
            {
              offset: 1,
              color: "#FF5722", // A deeper orange shade towards the bottom
            },
          ]),
        },
        lineStyle: {
            color: "#FF9800" // A consistent orange for the line itself
        },
        animationDelay: function (idx) {
          return idx * 10;
        },
      },
    ],
};


 */

  let areaStyleHumitidy = {
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
    lineStyle: {
      color: "#AE62E8",
    },
  };

  let areaStyleTemperature = {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#FFA726",
      },
      {
        offset: 1,
        color: "#FF5722",
      },
    ]),
    lineStyle: {
      color: "#FF9800",
    },
  };

  let areaStyleBattery = {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#4CAF50",
      },
      {
        offset: 1,
        color: "#1B5E20",
      },
    ]),
    lineStyle: {
      color: "#4CAF50",
    },
  };

  let areaStylePower = {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#2196F3",
      },
      {
        offset: 1,
        color: "#0D47A1",
      },
    ]),
    lineStyle: {
      color: "#2196F3",
    },
  };

  const chartOptions = {
    backgroundColor: theme.palette.paper,
    xAxis: {
      type: "category",
      data: displayedData.dates || [],
      axisLabel: {
        color: "#aaa",
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#aaa",
      },
    },
    series: [
      {
        data: displayedData.values || [],
        type: "line",
        smooth: "true",
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#FFA726", // A bright orange at the start
            },
            {
              offset: 1,
              color: "#FF5722", // A deeper orange shade towards the bottom
            },
          ]),
        },
        lineStyle: {
          color: "#FF9800", // A consistent orange for the line itself
        },
        animationDelay: function (idx) {
          return idx * 10;
        },
      },
    ],
  };

  const frontContent = (
    <>
      <CardHeader
        action={
          <>
            <IconButton aria-label="settings" onClick={handleClick} size="large">
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={toggleFlip}>Edit</MenuItem>
            </Menu>
          </>
        }
        title={"Humidity"}
        titleTypographyProps={{ align: "left" }}
        subheader={sensorData.name}
        subheaderTypographyProps={{ align: "left" }}
      />
      <CardContent
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h4"
            style={sensorChangeStyleSecondary}
            key={Date.now()}
          >
            {sensorData.humidity}%rh
          </Typography>
          <Typography variant="subtitle1" style={sensorChangeStyle}>
            <TimeAgoLive dateToProcess={timeAgoDate} /> -{" "}
            {sensorData.lastTimestamp.substring(0, 16)}
          </Typography>
          <Typography variant="body2">
            {"Technical id: " + sensorData.id}
          </Typography>
        </div>

        <CombinedSignalBoard
          sensorData={{
            batteryLevel: sensorData.batteryLevel
              ? sensorData.batteryLevel
              : null,
            rssi: sensorData.rssi ? sensorData.rssi : null,
            loraSF: sensorData.loraSF ? sensorData.loraSF : null,
          }}
        />
      </CardContent>

      <CardContent>
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {["24h", "1day", "1week", "1month", "1year"].map((period) => (
            <Button
              key={period}
              variant={timePeriod === period ? "outlined" : "text"}
              style={{
                // color: "white",
                fontSize: "12px",
                // borderColor: "white", // this line sets the border color to white
              }}
              onClick={() => setTimePeriod(period)}
            >
              {period}
            </Button>
          ))}
        </div>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          {chartTitle}
        </Typography>
        <ReactECharts option={chartOptions} />
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<FavoriteIcon />}>
          Favorite
        </Button>
        <Button size="small" startIcon={<ShareIcon />}>
          Share
        </Button>
        <Button size="small" startIcon={<EditIcon />} onClick={toggleFlip}>
          Edit
        </Button>

        <ExportDataDialog data={displayedData} />
      </CardActions>
    </>
  );

  const backContent = (
    <>
      <CardContent>
        <div>Edit Content Here</div>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<FavoriteIcon />}>
          Favorite
        </Button>
        <Button size="small" startIcon={<ShareIcon />}>
          Share
        </Button>
        <Button size="small" startIcon={<EditIcon />} onClick={toggleFlip}>
          Edit
        </Button>
        <Button size="small" startIcon={<FileDownloadIcon />}>
          Export
        </Button>
      </CardActions>
    </>
  );

  return (
    <FlippableCard
      frontContent={frontContent}
      backContent={backContent}
      isFlipped={isFlipped}
      toggleFlip={toggleFlip}
      // editBackgroundColor={lightGreen[800]}
      // viewBackgroundColor={lightGreen[800]}
      cardHeight={"700px"}
    />
  );
}
SensorCard.defaultProps = {
  historyData: {},
};
export default SensorCard;

// Inline keyframes for fadeInColor
const fadeInColorKeyframes = `
  @keyframes fadeInColor {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// Append keyframes to the document
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(fadeInColorKeyframes, styleSheet.cssRules.length);
/*

frontContent,
  backContent,
  isFlipped,
  toggleFlip,
  editBackgroundColor,
  viewBackgroundColor,*/
