import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function PodStatistics({ stats }) {
  return (
    <Card variant="none">
      <CardContent>
        {stats.map((stat, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            mb={1} // Some margin-bottom for spacing between lines
          >
            <Typography variant="body1">
              {stat.label} ({stat.category}):
            </Typography>
            <Typography variant="body1">{stat.kpi}</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
