import React from "react";
import PropTypes from "prop-types";
import Battery20Icon from "@mui/icons-material/Battery20";
import Battery50Icon from "@mui/icons-material/Battery50";
import Battery80Icon from "@mui/icons-material/Battery80";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import { Typography, Box } from "@mui/material";

const BatteryLevel = ({ batteryLevel }) => {
  let adjustedBatteryLevel = Math.round(batteryLevel);

  // Ensure battery level is within 0-100% range
  if (adjustedBatteryLevel < 0) adjustedBatteryLevel = 0;
  if (adjustedBatteryLevel > 100) adjustedBatteryLevel = 100;

  let Icon;
  if (adjustedBatteryLevel < 25) Icon = Battery20Icon;
  else if (adjustedBatteryLevel < 50) Icon = Battery50Icon;
  else if (adjustedBatteryLevel < 75) Icon = Battery80Icon;
  else Icon = BatteryFullIcon;

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1" style={{ marginRight: "10px" }}>
        Battery Level:
      </Typography>
      <Icon color={adjustedBatteryLevel >= 50 ? "success" : "error"} />
      <Typography variant="body2" style={{ marginLeft: "5px" }}>
        {adjustedBatteryLevel}%
      </Typography>
    </Box>
  );
};

BatteryLevel.propTypes = {
  batteryLevel: PropTypes.number.isRequired,
};

export default BatteryLevel;
