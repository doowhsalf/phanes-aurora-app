import React from "react";
import withStyles from "@mui/styles/withStyles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1),
  },
  small: {
    display: "flex",
    alignItems: "left",
  },
  flagAvatar: {
    width: 30,
    height: 30,
    marginRight: theme.spacing(1),
  },
  flagAvatarSmall: {
    width: 18,
    height: 18,
    marginRight: theme.spacing(0.5),
  },
});

const availableLanguages = [
  { code: "EN-GB", label: "English" },
  { code: "SV", label: "Swedish" },
  { code: "FI", label: "Finnish" },
  { code: "RO", label: "Romanian" },
];

// Placeholder function for fetching the full language name and flag image URL
// You should replace this with an actual implementation based on your project needs
const getLanguageDetails = (languageCode) => {
  // This URL is a placeholder. You'll need to use a real URL or method to fetch flag images.
  const imageUrl = `/tri-flags/lang-${languageCode.toLowerCase()}.jpg`;
  const languageName = availableLanguages.find(
    (lang) => lang.code === languageCode
  ).label;

  return { imageUrl, languageName };
};

class LanguageAvatar extends React.Component {
  render() {
    const { languageCode, classes, small } = this.props;
    const { imageUrl, languageName } = getLanguageDetails(languageCode);

    return (
      <div className={small ? classes.small : classes.root}>
        <Avatar
          alt={languageName}
          src={imageUrl}
          className={small ? classes.flagAvatarSmall : classes.flagAvatar}
        />
        <Typography variant={small ? "caption" : "body1"}>
          {languageName}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(LanguageAvatar);
