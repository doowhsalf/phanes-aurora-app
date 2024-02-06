import React, { useState, useEffect } from "react";
import { Grid, Container, Paper, Typography, Divider } from "@mui/material";
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
import RequestTranslationOrder from "./workorder/wo_request_translation_order";
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

/* the documemnt 
{
    "_id" : "17177",
    "translationSetNodeId" : "16848",
    "masterArticle" : false,
    "articleCode" : [
        ""
    ],
    "nid" : "17177",
    "version" : "1",
    "createdAt" : "2024-01-22T14:45:46.588Z",
    "updatedAt" : "2024-01-22T14:45:46.588Z",
    "createdBy" : "system",
    "updatedBy" : "system",
    "language" : "en",
    "originalLanguage" : "English",
    "status" : "draft",
    "revisions" : [
        {
            "createdAt" : "2024-01-22T14:45:46.588Z",
            "createdBy" : "system",
            "updatedAt" : "2024-01-22T14:45:46.588Z",
            "updatedBy" : "system",
            "version" : "1",
            "status" : "draft",
            "language" : "en",
            "originalLanguage" : "English",
            "title" : "Elevpublicistens ansvar",
            "body" : "<p>Mobile Stories har samma värdegrund som skolan. Den vill vi att du ska hålla dig till när du arbetar med vårt verktyg och publicerar dina arbeten på mobilestories.se.<br />\n </p>\n<p><strong>Värdegrunden omfattar:</strong></p>\n<ul>\n<li>människolivets okränkbarhet</li>\n<li>individens frihet och integritet</li>\n<li>alla människors lika värde</li>\n<li>jämställdhet mellan könen</li>\n<li>solidaritet mellan människor</li>\n</ul>\n<ol>\n<li>Det du publicerar på Mobile Stories blir tillgängligt för alla. Genomslagskraften av det du skriver kan vara stor. Även om du väljer att publicera endast på din skola så kan alla läsa eller titta på just din artikel.</li>\n<li>Tänk på att det du skriver kan delas och spridas i andra forum. Där kan kommentarer dyka upp. Mobile Stories har inte kommentarsfält på sajten.</li>\n<li>När du publicerar artiklar på Mobile Stories så ansvarar du själv för innehållet. Du själv ansvarar alltså för att din artikel inte bryter mot några lagar och regler. Det du skriver får därför inte innehålla t ex förtal, förolämpning, hets mot folkgrupp, sexualiserat våld mot barn eller våldspornografi. Du får inte heller använda material som någon annan har upphovsrätten till utan att den personen har gett sitt tillstånd.                      </li>\n<li>Undvik att publicera uppgifter som kan leda till att din uppgiftslämnare får problem. Tänk alltid igenom eventuella konsekvenser för den som gett dig uppgifter eller för personer som berörs i ditt material.</li>\n<li>Undvik att publicera material från personer som vill vara anonyma, eftersom det alltid är svårt att garantera en person anonymitet. Om en uppgiftslämnare är anonym är det också svårare för den som tar del av ditt material att granska de källor som används. </li>\n</ol>\n<p><strong>Jag har tagit del av Mobile Stories regler och de lagar som gäller vid publiceringar på nätet.</strong></p>\n<p><em>Grattis! Du är nu elevpublicist och är en del av ett nätverk av unga som skapar genomarbetat innehåll för att inspirera, berätta, förklara, granska och göra skillnad. Lycka till!</em></p>\n",
            "articleCode" : [
                ""
            ],
            "typeOfArticle" : "legal",
            "_id" : "17177",
            "nid" : "17177"
        }
    ],
    "title" : "Elevpublicistens ansvar",
    "body" : "<p>Mobile Stories har samma värdegrund som skolan. Den vill vi att du ska hålla dig till när du arbetar med vårt verktyg och publicerar dina arbeten på mobilestories.se.<br />\n </p>\n<p><strong>Värdegrunden omfattar:</strong></p>\n<ul>\n<li>människolivets okränkbarhet</li>\n<li>individens frihet och integritet</li>\n<li>alla människors lika värde</li>\n<li>jämställdhet mellan könen</li>\n<li>solidaritet mellan människor</li>\n</ul>\n<ol>\n<li>Det du publicerar på Mobile Stories blir tillgängligt för alla. Genomslagskraften av det du skriver kan vara stor. Även om du väljer att publicera endast på din skola så kan alla läsa eller titta på just din artikel.</li>\n<li>Tänk på att det du skriver kan delas och spridas i andra forum. Där kan kommentarer dyka upp. Mobile Stories har inte kommentarsfält på sajten.</li>\n<li>När du publicerar artiklar på Mobile Stories så ansvarar du själv för innehållet. Du själv ansvarar alltså för att din artikel inte bryter mot några lagar och regler. Det du skriver får därför inte innehålla t ex förtal, förolämpning, hets mot folkgrupp, sexualiserat våld mot barn eller våldspornografi. Du får inte heller använda material som någon annan har upphovsrätten till utan att den personen har gett sitt tillstånd.                      </li>\n<li>Undvik att publicera uppgifter som kan leda till att din uppgiftslämnare får problem. Tänk alltid igenom eventuella konsekvenser för den som gett dig uppgifter eller för personer som berörs i ditt material.</li>\n<li>Undvik att publicera material från personer som vill vara anonyma, eftersom det alltid är svårt att garantera en person anonymitet. Om en uppgiftslämnare är anonym är det också svårare för den som tar del av ditt material att granska de källor som används. </li>\n</ol>\n<p><strong>Jag har tagit del av Mobile Stories regler och de lagar som gäller vid publiceringar på nätet.</strong></p>\n<p><em>Grattis! Du är nu elevpublicist och är en del av ett nätverk av unga som skapar genomarbetat innehåll för att inspirera, berätta, förklara, granska och göra skillnad. Lycka till!</em></p>\n",
    "typeOfArticle" : "legal"
}
*/

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
    });
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

        <Grid container spacing={2}>
          <Grid item xs={12}>
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
                  <Typography variant="h6">
                    {getField(selectedRevision, "title")}
                  </Typography>
                  <Divider
                    style={{
                      marginTop: 4,
                      marginBottom: 4,
                      borderTop: "dotted 1px",
                      borderColor: "rgba(128, 128, 128, 0.21)",
                    }}
                  />
                  <ContentMetaRevision contentNode={selectedRevision} />
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  style={{ padding: "16px", minHeight: "348px" }}
                >
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
                  <RequestTranslationOrder
                    title="Request Translation Order"
                    order={data.contentNode}
                  ></RequestTranslationOrder>
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
                  <OrderTable contentId={data.contentNode.nid}></OrderTable>
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
