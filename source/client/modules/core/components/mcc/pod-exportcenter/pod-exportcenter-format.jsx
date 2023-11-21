import React from "react";

import { Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";

function FormatComponent() {
  return (
    <>
      <Typography>Select Format:</Typography>
      <RadioGroup defaultValue="">
        <FormControlLabel value="csv" control={<Radio />} label="CSV" />
        <FormControlLabel value="json" control={<Radio />} label="JSON" />
        <FormControlLabel value="excel" control={<Radio />} label="Excel" />
        <FormControlLabel value="xml" control={<Radio />} label="XML" />
      </RadioGroup>
    </>
  );
}

export default FormatComponent;
