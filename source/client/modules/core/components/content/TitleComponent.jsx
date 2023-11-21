import React from "react";
import { renderLogo } from "../helpers/app-logo";

const TitleComponent = ({ title, subtitle, logo = false }) => {
  const containerStyle = {
    // position: "relative", // Positioning relative to the nearest positioned ancestor
    // top: "55px", // Set the top edge of the container to the center of the parent
    // left: "110px", // 89px from the left
    // textAlign: "left", // Align text to the left
  };

  const titleStyleTransparentNeptune = {
    fontSize: "12rem", // Large font size for the title
    color: "rgba(255, 255, 255, 0.89)", // White with transparency
    fontWeight: "bold", // Bold font for the title
    margin: 0, // Reset margin
    marginBottom: "-0.45em", // Small space between title and subtitle
    fontFamily: "Eurostile, sans-serif",
    textAlign: "right",
    // make shadow but more lighter
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", // Lighter shadow with reduced opacity
  };

  const titleStyleTransparent = {
    fontSize: "12rem", // Large font size for the title
    color: "rgba(255, 255, 255, 0.34)", // White with transparency
    fontWeight: "bold", // Bold font for the title
    margin: 0, // Reset margin
    marginBottom: "-0.45em", // Small space between title and subtitle
    fontFamily: "Eurostile, sans-serif",
    textAlign: "right",
  };

  const titleStyle = {
    fontSize: "4rem", // Large font size for the title
    color: "rgba(255, 255, 255, 0.89)", // White with transparency
    fontWeight: "bold", // Bold font for the title
    margin: 0, // Reset margin
    fontFamily: "Orbitron, sans-serif", // Assign EuroStyle Normal to the
  };

  const iconStyle = {
    margin: 0, // Reset margin
    marginRight: "-0.5em", // Small space between title and subtitle
    textAlign: "right",
    marginBottom: "5em", // Small space between title and subtitle
    // make shadow but more lighter
  };

  const subtitleStyle = {
    fontSize: "2rem", // Slightly smaller font size for the subtitle
    color: "rgba(255, 255, 255, 0.34)", // White with transparency
    fontWeight: "bold", // Bold font for the subtitle as well
    margin: 0, // Reset margin
    marginTop: "0.2em", // Slight space between title and subtitle
    fontFamily: "Orbitron, sans-serif", // Assign EuroStyle Normal to the
    textAlign: "right",
    // make shadow
    // textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", // Lighter shadow with reduced opacity
  };
  const subtitleStyleVersion = {
    fontSize: "1rem", // Slightly smaller font size for the subtitle
    color: "rgba(255, 255, 255, 0.34)", // White with transparency
    margin: 0, // Reset margin
    fontFamily: "EuroStyle Normal, sans-serif", // Assign EuroStyle Normal to the
  };
  const dividerStyle = {
    borderTop: "1px solid rgba(255, 255, 255, 0.89)", // Change color and size as needed
    width: "100%", // Adjust the width as needed
    margin: "0 auto", // This will center the divider if the container has a specific width
    marginTop: "0.8em", // Add some space between the title and divider
  };
  //    border: "1px solid rgba(255, 255, 255, 0.21)",

  // make a new classes structure to be used with logo. it shall have an empty css class  for classes.logo
  let classesLogo = { textAlign: "left" };
  //localStorage.setItem("themeMode", {"themeModeState":"false"});
  return (
    <div style={containerStyle}>
      <div style={titleStyleTransparent}>{title}</div>
      <div style={dividerStyle} /> {/* This is the divider */}
      <div style={subtitleStyle}>{subtitle}</div>
      {logo ? (
        <div style={iconStyle}>
          {renderLogo(classesLogo, 48, "auto", "light")}
        </div>
      ) : null}
    </div>
  );
};

export default TitleComponent;
