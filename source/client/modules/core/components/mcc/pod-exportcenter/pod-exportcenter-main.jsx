import React from "react";
import { Grid, Container, Paper, Typography, Divider } from "@mui/material";
import PublicationList from "./pod-exportcenter-publicationlist";
import Meta from "./pod-exportcenter-meta";
import Query from "./pod-exportcenter-query";
import TimeFrame from "./pod-exportcenter-timeframe";
import PublishComponent from "./pod-exportcenter-publish";
import FrequencyComponent from "./pod-exportcenter-freq";
import FormatComponent from "./pod-exportcenter-format";

function ExportCenter() {
  return (
    // write the title of the page here
    <>
      <Typography variant="h4">Export Center</Typography>
      <Grid container spacing={2}>
        {/* Current list of publications */}
        <Grid item xs={12}>
          <Paper variant="outlined" style={{ padding: "16px" }}>
            <Typography variant="h6">Publications List</Typography>
            <PublicationList />
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper variant="outlined" style={{ padding: "16px", minHeight: "348px" }}>
            <Typography variant="h6">Meta Information</Typography>
            <Meta> </Meta>
          </Paper>
        </Grid>
        {/* 2. Query */}
        <Grid item xs={4}>
          <Paper variant="outlined" style={{ padding: "16px", minHeight: "348px" }}>
            <Typography variant="h6">Query</Typography>
            <Query />
          </Paper>
        </Grid>
        {/* 3. Time-Frame */}
        <Grid item xs={4}>
          <Paper variant="outlined" style={{ padding: "16px", minHeight: "348px" }}>
            <Typography variant="h6">Time-Frame</Typography>
            <TimeFrame> </TimeFrame>
          </Paper>
        </Grid>
        {/* 4. Frequency */}
        <Grid item xs={4}>
          <Paper variant="outlined" style={{ padding: "16px", minHeight: "348px" }}>
            <Typography variant="h6">Frequency</Typography>
            <FrequencyComponent> </FrequencyComponent>
          </Paper>
        </Grid>
        {/* 5. Format */}
        <Grid item xs={4}>
          <Paper variant="outlined" style={{ padding: "16px", minHeight: "348px" }}>
            <Typography variant="h6">Format</Typography>
            <FormatComponent></FormatComponent>{" "}
          </Paper>
        </Grid>
        {/* 6. Publish Method */}
        <Grid item xs={4}>
          <Paper variant="outlined" style={{ padding: "16px", minHeight: "348px" }}>
            <Typography variant="h6">Publish Method</Typography>
            <PublishComponent></PublishComponent>
          </Paper>
        </Grid>

        {/* Details Containers */}
        {/* 1. Meta Information */}
      </Grid>
    </>
  );
}

export default ExportCenter;
