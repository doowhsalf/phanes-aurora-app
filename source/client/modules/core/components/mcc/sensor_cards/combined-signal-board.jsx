import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import BatteryLevel from "./battery-level-board";
import SignalStrength from "./rssi-signal-board";
import SpreadingFactorIndicator from "./sf-signal-board";

const SensorPanel = ({ sensorData }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      padding={2}
      // boxShadow={3}
      borderRadius="3px"
      bgcolor="background.default"
    >
      {/* do not render if the sensor data is not available */}
      {/* Battery Level Display */}

      {sensorData.batteryLevel !== -999 ? (
        <BatteryLevel batteryLevel={sensorData.batteryLevel} />
      ) : null}
      {/* RSSI Display */}
      {sensorData.rssi !== -999 ? (
        <SignalStrength rssi={sensorData.rssi} />
      ) : null}
      {/* Lora SF Display */}
      {sensorData.loraSF !== -999 ? (
        <SpreadingFactorIndicator sf={sensorData.loraSF} />
      ) : null}
    </Box>
  );
};

SensorPanel.propTypes = {
  sensorData: PropTypes.shape({
    batteryLevel: PropTypes.number,
    rssi: PropTypes.number,
    loraSF: PropTypes.number,
  }).isRequired,
};

export default SensorPanel;
