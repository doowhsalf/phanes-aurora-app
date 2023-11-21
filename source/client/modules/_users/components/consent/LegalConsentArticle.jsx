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
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

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

                <IconButton>
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
