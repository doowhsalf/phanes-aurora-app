import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Paper,
  Typography,
  Divider,
  Button,
  CardActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Meta from "./content-meta";
import ContentMeta from "./conten-meta-render";
import ContentMetaRevision from "./content-meta-revision";
import BodyRender from "./conten-body-render";
import MarkdownRender from "./conten-body-render-markdown";
import ContentCode from "./content-codes";
import {
  getField,
  getFieldObject,
  getFieldDate,
  getFieldDateTime,
  getFieldBoolean,
} from "../../helpers/getField";
import { Switch, FormControlLabel } from "@mui/material";
import OrderTable from "./workorder/workOrdersCustomerOrder";
import RequestTranslationOrder from "./workorder/order-workorder-proxy";

import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

import Revisions from "./content-revisions";
import Translations from "./content-translations";
import LanguageAvatar from "./languageAvatar";
import ChangeMasterLanguageProxy from "./changeMasterLanguage/content-update-masterLanguage-proxy";
import UpdateStatusToArchiveOrActive from "./archiveContent/content-update-archiveContent-proxy";
function ContentScreen(data) {
  const [showContent, setShowContent] = React.useState(false);

  // make sure selectedRevision is using the first revision as default that is published and master as default

  // Assuming we want the first "published" revision or just the first revision if none are marked as "published"
  // For demonstration, this example will just use the first revision as a fallback
  const defaultRevision = data.contentNode.revisions[0] || {};

  const [selectedRevision, setSelectedRevision] = useState({
    title: defaultRevision.title || data.contentNode.title,
    summary: "", // Placeholder for summary as it's not included in your provided data structure
    body: defaultRevision.body || data.contentNode.body,
    language: defaultRevision.language || data.contentNode.language,
    status: defaultRevision.status || data.contentNode.status,
    version: defaultRevision.version || data.contentNode.version,
    updatedAt: defaultRevision.updatedAt || data.contentNode.updatedAt,
    updatedBy: defaultRevision.updatedBy || data.contentNode.updatedBy,
    revision: defaultRevision.revision || data.contentNode.revision,
  });
  let theme = useTheme();
  DEFCON5 && console.log("Display content screen component");
  DEFCON5 && console.log(data.contentNode);
  const handleRevisionSelect = (revision) => {
    DEFCON5 && console.log("Selected revision: ", revision);

    setSelectedRevision({
      title: revision.title,
      summary: revision.summary || "", // Fallback to an empty string if summary isn't available
      body: revision.body,
      language: revision.language,
      status: revision.status,
      masterArticle: revision.masterArticle,
      version: revision.version,
      updatedAt: revision.updatedAt,
      updatedBy: revision.updatedBy,
      revision: revision.revision,
    });
  };
  const handleLanguageChange = (newLanguage) => {
    console.log("New master language:", newLanguage);
    // Implement your update logic here
  };
  return (
    // write the title of the page here
    <>
      <Container
        maxWidth="false"
        style={{ marginTop: "75px", padding: theme.spacing(4) }}
      >
        <Typography variant="h4" gutterBottom>
          Content screen
        </Typography>
        {/* make a label if the content is archived, set color to error light */}
        {getField(data.contentNode, "status") === "archived" && (
          <Typography variant="h6" gutterBottom color="error.light">
            Please not that this content is archived
          </Typography>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardActions>
              {/* Toggle Switch for Showing/Hiding Content */}
              <FormControlLabel
                control={
                  <Switch
                    checked={showContent}
                    onChange={() => setShowContent(!showContent)}
                  />
                }
                label="Show/Hide Markdown and HTML"
              />
              <ChangeMasterLanguageProxy
                contentId={data.contentNode._id}
                currentLanguage={data.contentNode.masterLanguage}
                languages={data.contentNode.languages}
                onLanguageChange={handleLanguageChange}
              />
              <RequestTranslationOrder
                order={data.contentNode}
              ></RequestTranslationOrder>
              <UpdateStatusToArchiveOrActive
                contentId={data.contentNode._id}
                status={data.contentNode.status}
              ></UpdateStatusToArchiveOrActive>
              <Button variant="outlined" color="primary">
                New revision
              </Button>
            </CardActions>
          </Grid>

          <Grid item xs={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  style={{ padding: "16px", minHeight: "348px" }}
                >
                  <Typography variant="h6">Meta Information</Typography>
                  <Divider
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      borderTop: "dotted 1px",
                      borderColor: "rgba(128, 128, 128, 0.21)",
                    }}
                  />
                  <ContentMeta contentNode={data.contentNode}> </ContentMeta>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  style={{ padding: "16px", minHeight: "348px" }}
                >
                  <Typography variant="h6">Document codes</Typography>
                  <Divider
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      borderTop: "dotted 1px",
                      borderColor: "rgba(128, 128, 128, 0.21)",
                    }}
                  />
                  <ContentCode contentNode={data.contentNode} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  style={{ padding: "16px", minHeight: "348px" }}
                >
                  <Typography variant="h6">Images</Typography>
                  <Divider
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      borderTop: "dotted 1px",
                      borderColor: "rgba(128, 128, 128, 0.21)",
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper variant="outlined" style={{ padding: theme.spacing(2) }}>
                  <ContentMetaRevision contentNode={selectedRevision} />
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  style={{ padding: "16px", minHeight: "348px" }}
                >
                  <div>
                    <div
                      style={{ fontSize: "24px" }}
                      dangerouslySetInnerHTML={{
                        __html: getField(selectedRevision, "title"),
                      }}
                    />
                  </div>
                  <Divider
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      borderTop: "dotted 1px",
                      borderColor: "rgba(128, 128, 128, 0.21)",
                    }}
                  />{" "}
                  <Typography variant="h6">Ingress</Typography>
                  <Divider
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      borderTop: "dotted 1px",
                      borderColor: "rgba(128, 128, 128, 0.21)",
                    }}
                  />
                  <Paper
                    style={{
                      marginTop: "8px",
                      marginBottom: "8px",

                      paddingTop: "4px",
                      paddingBottom: "4px",
                      paddingRight: "8px",
                      paddingLeft: "8px",
                      minHeight: "50px",
                    }}
                  >
                    <Typography variant="Body2 ">
                      <div styles={{ fontSize: "12px" }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: getField(selectedRevision, "summary"),
                          }}
                        />
                      </div>
                    </Typography>
                  </Paper>
                  <Typography variant="h6">Body</Typography>
                  <Divider
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      borderTop: "dotted 1px",
                      borderColor: "rgba(128, 128, 128, 0.21)",
                    }}
                  />
                  <Paper
                    style={{
                      marginTop: "8px",
                      marginBottom: "4px",

                      paddingTop: "4px",
                      paddingBottom: "4px",
                      paddingRight: "8px",
                      paddingLeft: "8px",
                      minHeight: "320px",
                    }}
                  >
                    <Typography variant="Body2 ">
                      <div styles={{ fontSize: "12px" }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: getField(selectedRevision, "body"),
                          }}
                        />
                      </div>
                    </Typography>
                  </Paper>
                  <Typography variant="h6">Meta</Typography>
                  <Divider
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      borderTop: "dotted 1px",
                      borderColor: "rgba(128, 128, 128, 0.21)",
                    }}
                  />
                  <Paper
                    style={{
                      marginTop: "8px",
                      marginBottom: "4px",

                      paddingTop: "4px",
                      paddingBottom: "4px",
                      paddingRight: "8px",
                      paddingLeft: "8px",
                      minHeight: "320px",
                    }}
                  >
                    <Typography variant="Body2 ">
                      <div styles={{ fontSize: "12px" }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: getField(selectedRevision, "meta"),
                          }}
                        />
                      </div>
                    </Typography>
                  </Paper>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  style={{ padding: "16px", minHeight: "348px" }}
                >
                  <Typography variant="h6">Revisions</Typography>
                  <Divider
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      borderTop: "dotted 1px",
                      borderColor: "rgba(128, 128, 128, 0.21)",
                    }}
                  />
                  <Revisions
                    contentNode={data.contentNode}
                    onSelect={handleRevisionSelect}
                  />
                  <CardActions style={{ paddingLeft: 0 }}>
                    <RequestTranslationOrder
                      title="Request Translation Order"
                      order={data.contentNode}
                      language={selectedRevision.language}
                      revision={selectedRevision.revision}
                    ></RequestTranslationOrder>
                  </CardActions>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {showContent && (
                <>
                  <Grid item xs={6}>
                    <Paper
                      variant="outlined"
                      style={{ padding: "16px", minHeight: "348px" }}
                    >
                      <Typography variant="h6">Document text</Typography>
                      <Divider
                        style={{
                          marginTop: 4,
                          marginBottom: 4,
                          borderTop: "dotted 1px",
                          borderColor: "rgba(128, 128, 128, 0.21)",
                        }}
                      />
                      <BodyRender contentNode={selectedRevision} />
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper variant="outlined" style={{ padding: "16px" }}>
                      <Typography variant="h6">Markdown</Typography>
                      <Divider
                        style={{
                          marginTop: 4,
                          marginBottom: 4,
                          borderTop: "dotted 1px",
                          borderColor: "rgba(128, 128, 128, 0.21)",
                        }}
                      />
                      <MarkdownRender initialHtml={selectedRevision.body} />
                    </Paper>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  style={{ padding: "16px", minHeight: "348px" }}
                >
                  <Typography variant="h6">Orders</Typography>
                  <Divider
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      borderTop: "dotted 1px",
                      borderColor: "rgba(128, 128, 128, 0.21)",
                    }}
                  />
                  <OrderTable contentId={data.contentNode._id}></OrderTable>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  style={{ padding: "16px", minHeight: "348px" }}
                >
                  <Typography variant="h6">Comments</Typography>
                  <Divider
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      borderTop: "dotted 1px",
                      borderColor: "rgba(128, 128, 128, 0.21)",
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Current list of publications */}

        {/* 4. Frequency */}

        {/* 5. Format */}

        {/* 6. Publish Method */}
      </Container>
    </>
  );
}

// make a function that renders a html document but add extra line breaks after each paragraph and keep the html tags in place, it will be used to display html documents in a readable format
function _fixHtml(html) {
  let result = "";
  let htmlArray = html.split("</p>");
  htmlArray.forEach((element) => {
    result = result + element + "</p><br/>";
  });
  return result;
}

export default ContentScreen;
