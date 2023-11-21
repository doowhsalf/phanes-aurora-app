import React from "react";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import i18n from "meteor/universe:i18n";

import Typography from "@mui/material/Typography";
import withStyles from '@mui/styles/withStyles';
import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import AppConfig from "/client/configs/app";
import LegalConsentArticle from "../../composers/consent/LegalConsentArticle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
const containerSpace = 2;

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(12),
    // flexGrow: 1,
    // padding: theme.spacing(0),
    // backgroundColor: "#F8F9FA",
  },
  gridRoot: {
    marginBottom: theme.spacing(1),
  },
  link: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    background:
      "linear-gradient(to bottom, rgba(29, 30, 31, 0.89) 0%, " +
      "rgba(29, 30, 31, 0.89) 34%, rgba(0,0,0,0.79) 55%)",
  },
  login_page: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    top: 0,
    left: 0,
    padding: 0,
    margin: "auto",
    background:
      "url(https://sycorax.tritonite.io/titania_common) no-repeat center center fixed",
    backgroundSize: "cover",
  },

  login_container: {
    top: 250,
    width: 300,
    margin: "auto",
    marginTop: 100,
    // backgroundColor: "rgba(255, 255, 255, 0.66)",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, " +
      "rgba(0,0,0,0.44) 34%, rgba(0,0,0,0.34) 55%)",
    borderRadius: 3,
    padding: 15,
    overflow: "hidden",
  },
  content: {
    top: 250,
    width: 300,
    margin: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.66)",
    borderRadius: 3,
    padding: 15,
    overflow: "hidden",
  },
  color: {
    background: "rgba(255, 255, 255, 0.66)",
    width: 430,
    height: 330,
  },
  blur: {
    background:
      "url(https://sycorax.tritonite.io/titania_common) no-repeat center center fixed",
    top: 250,
    width: 300,
    position: "relative",
    top: "-15px",
    left: "-15px",
    borderRadius: 3,
    padding: 15,
    overflow: "hidden",
    "-webkit-filter": "blur(8px)",
    "-moz-filter": "blur(8px)",
    filter: "blur(8px)",
  },
  button: {
    marginTop: 20,
  },
  alignRight: {
    float: "right",
  },
});
class UserConcent extends React.Component {
  constructor() {
    super();
    this.state = {
      changedArticles: {},
    };
  }

  changeArticle(articleId, isChecked) {
    let changedArticlesObject = {};
    Object.assign(changedArticlesObject, this.state.changedArticles);

    changedArticlesObject[articleId] = {
      accepted: isChecked,
      _id: articleId,
    };
    this.setState({ changedArticles: changedArticlesObject });
  }

  saveArticles() {
    const { saveArticles } = this.props;

    if (saveArticles) {
      let articles = this.state.changedArticles;
      const articlesArray = [];

      //map object properties to real array
      for (let property in articles) {
        if (articles.hasOwnProperty(property)) {
          const value = articles[property];
          articlesArray.push({ _id: value._id, accepted: value.accepted });
        }
      }
      saveArticles(articlesArray);
    }
  }

  render() {
    const {
      children,
      consentGiven,
      consentStatus,
      userConsentArticles,
      classes,
    } = this.props;

    let stuff = [];

    if (userConsentArticles) {
      userConsentArticles.map((article) => {
        const changedArticle = this.state.changedArticles[article._id];

        if (changedArticle) {
          article.accepted = changedArticle.accepted;
        }
        let item = (
          <Grid key={article.nid} item xs={12} sm={12} md={12} lg={12} xl={12}>
            <LegalConsentArticle
              key={article.nid}
              article={article}
              consentStatus={consentStatus[article.nid]}
              checkArticle={(id) => this.changeArticle(id, true)}
              clearArticle={(id) => this.changeArticle(id, false)}
            />
          </Grid>
        );
        stuff.push(item);
      });
    }

    if (consentGiven) {
      return <div className="xcontainer">{children}</div>;
    } else {
      return (
        <div className={classes.root}>
          <h1>{i18n.__("Label_LegalConsent_Title")}</h1>

          <Grid container spacing={containerSpace}>
            {stuff}
          </Grid>
          <div className={classes.alignRight}>
            <Button
              color="primary"
              className={classes.button}
              children={i18n.__("Label_LegalConsent_Save")}
              onClick={() => this.saveArticles()}
              variant={"contained"}
            />
          </div>
        </div>
      );
    }
  }
}

UserConcent.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UserConcent);
