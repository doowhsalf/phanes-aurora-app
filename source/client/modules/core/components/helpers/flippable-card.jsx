import React, { useState, useEffect, useRef } from "react";
import { Card, IconButton, CardContent, CardHeader } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme, backgroundColor }) => ({
  backgroundColor: backgroundColor || "default",
  perspective: 1000,
  overflow: "hidden",
  width: "100%",
}));

const CardInner = styled("div")(({ theme, flipped }) => ({
  transformStyle: "preserve-3d",
  transition: "transform 0.6s",
  transform: flipped ? "rotateY(180deg)" : "none",
  position: "relative",
  width: "100%",
  height: "100%",
}));

const CardFront = styled("div")(({ theme }) => ({
  backfaceVisibility: "hidden",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
}));

const CardBack = styled("div")(({ theme }) => ({
  backfaceVisibility: "hidden",
  transform: "rotateY(180deg)",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
}));

function FlippableCard({
  frontContent,
  backContent,
  isFlipped,
  toggleFlip,
  editBackgroundColor,
  viewBackgroundColor,
}) {
  const theme = useTheme();
  const defaultBackgroundColor = theme.palette.background.paper

  // check if isFlipped is set and in that case use editBackgroundColor otherwise use viewBackgroundColor
  var backgroundColor = isFlipped ? editBackgroundColor : viewBackgroundColor;

  const backgroundColorToUse = backgroundColor || defaultBackgroundColor;

  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState("auto");

  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(`${cardRef.current.scrollHeight}px`);
    }
  }, [cardRef, isFlipped]); // Adding isFlipped as a dependency in case flipping changes the content height

  return (
    <StyledCard
      ref={cardRef}
      variant="outlined"
      backgroundColor={backgroundColorToUse}
      style={{ height: cardHeight }}
    >
      <CardInner flipped={isFlipped}>
        <CardFront>{frontContent}</CardFront>
        <CardBack>
          {backContent}
          <CardHeader
            action={
              <IconButton aria-label="go-back" onClick={toggleFlip} size="large">
                <ArrowBackIcon />
              </IconButton>
            }
          />
        </CardBack>
      </CardInner>
    </StyledCard>
  );
}

export default FlippableCard;
