import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import SignalCellular0Bar from "@mui/icons-material/SignalCellular0Bar";
import SignalCellular1Bar from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular2Bar from "@mui/icons-material/SignalCellular2Bar";
import SignalCellular3Bar from "@mui/icons-material/SignalCellular3Bar";
import SignalCellular4Bar from "@mui/icons-material/SignalCellular4Bar";

const SignalStrength = ({ rssi }) => {
  let Icon;
  if (rssi >= -70) Icon = SignalCellular4Bar;
  else if (rssi >= -85) Icon = SignalCellular3Bar;
  else if (rssi >= -100) Icon = SignalCellular2Bar;
  else if (rssi >= -115) Icon = SignalCellular1Bar;
  else Icon = SignalCellular0Bar;
  console.log("rssi", rssi);
  return (
    <Box>
      <Icon color={rssi >= -70 ? "success" : "error"} />
      {rssi}
    </Box>
  );
};

SignalStrength.propTypes = {
  rssi: PropTypes.number.isRequired,
};

export default SignalStrength;
