import React from "react";

import { Card, CardContent, Typography } from "@mui/material";

export default function PodDetails({ pod }) {
  return (
    <Card variant="none">
      <CardContent>
        <Typography variant="h6">Name: {pod.name}</Typography>
        <Typography>Description: {pod.description}</Typography>
        <Typography>
          Activation Date: {new Date(pod.activationDate).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
