import React from "react";

import { Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";

function FrequencyComponent() {
  return (
    <>
      <Typography>Select Frequency:</Typography>
      <RadioGroup defaultValue="">
        <FormControlLabel value="daily" control={<Radio />} label="Daily" />
        <FormControlLabel value="hourly" control={<Radio />} label="Hourly" />
        <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
      </RadioGroup>
    </>
  );
}

export default FrequencyComponent;
