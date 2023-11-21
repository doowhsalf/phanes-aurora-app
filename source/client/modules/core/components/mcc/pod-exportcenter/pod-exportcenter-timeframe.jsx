import React from "react";

import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";

function TimeFrameComponent() {
  return (
    <>
      <Typography>Select Time Frame:</Typography>
      <RadioGroup defaultValue="lastKnownValue">
        <FormControlLabel
          value="lastKnownValue"
          control={<Radio />}
          label="Last Known Value"
        />
        <FormControlLabel
          value="historicalData"
          control={<Radio />}
          label="Historical Data"
        />
        <FormControlLabel
          value="customRange"
          control={<Radio />}
          label="Custom Date Range"
        />
      </RadioGroup>
      {/* You can conditionally render date pickers based on the selection above */}
      <TextField type="date" label="From" />
      <TextField type="date" label="To" />
    </>
  );
}

export default TimeFrameComponent;
