import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { isObject, last } from "lodash";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import MatrixRender from "../matrix_render";
import Divider from "@mui/material/Divider";
import TimeAgoLive from "../../fields/timeagolive/timeagolive";
import { Avatar } from "@mui/material";

import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import CardHeader from "@mui/material";
import { getField, getFieldBoolean, getFieldDate } from "../../helpers/getField";

/*
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
const DocumentRenderer = ({ contentNode, title, suppress, force }) => {
  const theme = useTheme();
  const labelColor = theme.palette.text.primary;
  const valueColor = theme.palette.success.main;
  const secondaryLightColor = theme.palette.success.light;
  const secondaryLightColorError = theme.palette.error.light;
  const headerColor = theme.palette.primary.light;
  const secondaryLightColorInfo = theme.palette.info.light;

  let lastTimestamp =
    contentNode.updatedAt !== undefined
      ? contentNode.updatedAt
      : new Date().toISOString();

  DEFCON7 && console.log(lastTimestamp);
  // set TimeAgoDate to CET
  let timeAgoDate = new Date(lastTimestamp);

  let suppressDefault = [];
  let forceDefault = [];
  if (suppress) {
    suppressDefault = suppress;
  }

  if (suppressDefault.includes("*")) {
    suppressDefault = Object.keys(order);
  }

  if (force) {
    forceDefault = force;
  }

  let stateColor = secondaryLightColorError;

  suppressDefault = suppressDefault.filter(
    (key) => !forceDefault.includes(key)
  );

  let matrixDataBlock1 = {
    labels: [
      "Id",
      "Version",
      "Status",
      "Master article",
      "Type of article",
      "Language",
    ],
    values: [
      getField(contentNode, "_id"),
      getField(contentNode, "version"),
      getField(contentNode, "status"),
      getFieldBoolean(contentNode, "masterArticle"),
      getField(contentNode, "typeOfArticle"),
      getField(contentNode, "language"),

    ],
  };let matrixDataBlock2 = {
    labels: ["Created by", "Updated by", "Created at", "Updated at"],
    values: [
      getField(contentNode, "createdBy"),
      getField(contentNode, "updatedBy"),
      getFieldDate(contentNode, "createdAt"),
      getFieldDate(contentNode, "updatedAt"),
    ],
  };

  // set cardHeader to template name,
  return (
    <>
      <Box
        sx={{ cursor: "pointer" }}
        onClick={(event) => handleClick(event, contentNode._id)}
      >
        <MatrixRender data={matrixDataBlock1} />{" "}
        <Divider
          style={{
            marginTop: 4,
            marginBottom: 4,
            borderTop: "dotted 1px",
            borderColor: "rgba(128, 128, 128, 0.55)",
          }}
        />
        <div>
          <MatrixRender data={matrixDataBlock2} />
        </div>
        <Divider
          style={{
            marginTop: 4,
            marginBottom: 4,
            borderTop: "dotted 1px",
            borderColor: "rgba(128, 128, 128, 0.55)",
          }}
        />
        <Typography
          styles={{ fontSize: "8px" }}
          variant="caption"
          component="div"
        >
          <TimeAgoLive dateToProcess={timeAgoDate} /> -{" "}
          {lastTimestamp.substring(0, 16)}
        </Typography>
      </Box>
    </>
  );
};

export default DocumentRenderer;

/* {/* <div style={{ display: "flex", alignItems: "left" }}>
        <Avatar
          style={{
            backgroundColor:
              timeDiff === 0
                ? theme.palette.warning.main
                : currentDate.getTime() < publishDate.getTime()
                ? timeDiff > 3
                  ? theme.palette.error.light
                  : timeDiff < 2
                  ? theme.palette.error.dark
                  : theme.palette.error.main
                : advertType === "P"
                ? theme.palette.success.main
                : theme.palette.primary.light,
            marginRight: theme.spacing(1),
            height: theme.spacing(4.5),
            width: theme.spacing(4.5),
          }}
        >
          <Typography variant="caption">{diffDays}</Typography>
        </Avatar> */
