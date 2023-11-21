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
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";

import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

export default class extends React.Component {
  constructor() {
    super();
    this.state = { checked: false, cardExpanded: false };
  }

  handleExpand = () =>
    this.setState({ cardExpanded: !this.state.cardExpanded });

  createMarkup(content) {
    return { __html: content };
  }

  updateCheck(event, isInputChecked) {
    const { article, checkArticle, clearArticle } = this.props;

    if (isInputChecked !== undefined) {
      if (checkArticle && isInputChecked) {
        checkArticle(article._id);
      }
      if (clearArticle && !isInputChecked) {
        clearArticle(article._id);
      }
    }
  }

  render() {
    const { article, consentStatus } = this.props;

    const articleText = (article && article.body && article.body.value) || (
      <div />
    );
    const articleTitle = (article && article.title) || "";
    const articleAccepted =
      !!(article && article.accepted) &&
      consentStatus &&
      consentStatus.sameVersion;

    return (
      <div className="consent-article">
        <Card className="consent-card">
          <CardHeader
            title={articleTitle}
            onClick={this.handleExpand}
            action={
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={articleAccepted}
                      onChange={(event, isInputChecked) =>
                        this.updateCheck(event, isInputChecked)
                      }
                    />
                  }
                  label={i18n.__("Label_ConsentArticle_Hint")}
                />

                <IconButton size="large">
                  <ExpandMoreIcon />
                </IconButton>
              </div>
            }
          ></CardHeader>

          <Collapse in={this.state.cardExpanded} timeout="auto" unmountOnExit>
            <CardContent>
              <div className="article-legal">
                <div dangerouslySetInnerHTML={this.createMarkup(articleText)} />
              </div>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}
