import React from "react";
import PropTypes from "prop-types";
import { Box, LinearProgress, Typography } from "@mui/material";

const SpreadingFactorIndicator = ({ sf }) => {
  const maxSF = 12;
  const minSF = 7;
  const progress = ((sf - minSF) / (maxSF - minSF)) * 100;

  return (
    <Box width="100px">
      <Typography variant="caption" display="block" gutterBottom>
        SF{sf}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        color={sf <= 10 ? "primary" : "secondary"}
      />
    </Box>
  );
};

SpreadingFactorIndicator.propTypes = {
  sf: PropTypes.number.isRequired,
};

export default SpreadingFactorIndicator;
