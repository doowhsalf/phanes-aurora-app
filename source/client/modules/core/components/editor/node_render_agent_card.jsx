import React, { useState, useEffect, useRef } from "react";
import {
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  CardActionArea,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import ReactECharts from "echarts-for-react";
import FlippableCard from "../helpers/flippable-card";
import { lightGreen } from "@mui/material/colors";
import TimeAgoLive from "../fields/timeagolive/timeagolive";
import { useTheme } from "@mui/material/styles";
import { Avatar } from "@mui/material";

/*[
            "24h",
            "1day",
            "last7days",
            "1week",
            "last30days",
            "1month",
            "last12months",
            "1year",
          ]*/

const CustomAvatar = ({ icon: IconComponent, color: color }) => {
  const theme = useTheme();

  return (
    <Avatar
      style={{
        backgroundColor: color ? color : theme.palette.primary.light,
      }}
    >
      <IconComponent />
    </Avatar>
  );
};

function NodeCard({ node, title, description, body }) {

  // test if node is null or undefined and return null if so
  if (node === null || node === undefined) {
    return null;
  }
  const theme = useTheme();

  const [isFlipped, setIsFlipped] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
const handleClickEdit = (event) => {
  setAnchorEl(event.currentTarget);
};

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let labelTextStyle = {
    color: theme.palette.text.primary,
    animation: "fadeInColor 1s both",
    opacity: 1,
  };
  // Extract data based on the selected time period
const labelIcon = node && node.labelIcon !== undefined ? node.labelIcon : null;

  const frontContent = (
    <>
      <CardHeader
        action={
          <>
            <IconButton aria-label="settings" onClick={handleClick} size="large">
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={toggleFlip}>Edit</MenuItem>
            </Menu>
          </>
        }
        avatar={<CustomAvatar icon={labelIcon}></CustomAvatar>}
        title={node.labelText}
        titleTypographyProps={{ align: "left" }}
        subheader={node.labelInfo ? node.labelInfo : ""}
        subheaderTypographyProps={{ align: "left" }}
      />
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography variant="subtitle1">{description}</Typography>
        <Typography variant="h4" style={labelTextStyle} key={Date.now()}>
          {title}
        </Typography>
        <Typography variant="subtitle1" style={labelTextStyle}>
          {node.id}
        </Typography>
      </CardContent>
      <CardContent>
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="text2">{body}</Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" onClick={toggleFlip}>
          Edit
        </Button>
      </CardActions>
    </>
  );

  const backContent = (
    <>
      <CardHeader
        avatar={<CustomAvatar icon={labelIcon}></CustomAvatar>}
        title={node.labelText}
        titleTypographyProps={{ align: "left" }}
        subheader={node.labelInfo ? node.labelInfo : ""}
        subheaderTypographyProps={{ align: "left" }}
      />
      
      <CardContent>
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="text2">{"This is the edit page"}</Typography>
        </div>
      </CardContent>
      
    </>
  );



  return (
    <FlippableCard
      frontContent={frontContent}
      backContent={backContent}
      isFlipped={isFlipped}
      toggleFlip={toggleFlip}
      editBackgroundColor={theme.palette.primary.light}
      // viewBackgroundColor={lightGreen[800]}
    />
  );
}

export default NodeCard;

// Inline keyframes for fadeInColor
const fadeInColorKeyframes = `
  @keyframes fadeInColor {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// Append keyframes to the document
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(fadeInColorKeyframes, styleSheet.cssRules.length);
