import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";

const MatrixComponent = ({ data }) => {
  const { labels, values } = data;
  const theme = useTheme();
  const labelColor = theme.palette.text.primary;
  const valueColor = theme.palette.text.secondary;
  const secondaryLightColor = theme.palette.primary.main;

  // fix an array of how many cells per row we want
  var space = [];
  if (labels.length === 4) {
    space = [4, 8, 4, 8];
  } else {
    space = [4, 4, 4, 4, 4, 4];
  }

  return (
    <Grid container spacing={2}>
      {labels.map((label, index) => (
        <Grid item xs={space[index]} key={index}>
          <Typography variant="caption" display="block" component="div">
            {label}
          </Typography>
          <Typography
            style={{ color: secondaryLightColor }}
            variant="caption"
            display="block"
            component="div"
          >
            {values[index]}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default MatrixComponent;
