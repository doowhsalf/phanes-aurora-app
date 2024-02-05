import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTheme, useStyles } from "@mui/material/styles";

import {
  getField,
  getFieldObject,
  getFieldDate,
  getFieldDateTime,
} from "../../helpers/getField";

import {renderLabel} from "../renderLabel";

const MetaForm = ({ contentNode }) => {
  const [method, setMethod] = useState("");
  const [frequency, setFrequency] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (event) => {
    setMethod(event.target.value);
  };

  const handleConfigChange = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      [method.toLowerCase()]: { ...prev[method.toLowerCase()], [field]: value },
    }));
  };
  const classes = {};
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
  return (
    <>
      
      {renderLabel("Updated", getFieldDate(contentNode, "updatedAt"), classes)}
      {renderLabel("Updated By", getField(contentNode, "updatedBy"), classes)}
      {renderLabel("Created", getFieldDate(contentNode, "createdAt"), classes)}
      {renderLabel("Created By", getField(contentNode, "createdBy"), classes)}
      {renderLabel("Version", getField(contentNode, "version"), classes)}
      {renderLabel("Status", getField(contentNode, "status"), classes)}
      {renderLabel("Language", getField(contentNode, "language"), classes)}
      {renderLabel(
        "Original Language",
        getField(contentNode, "originalLanguage"),
        classes
      )}
      {renderLabel("Title", getField(contentNode, "title"), classes)}
      
    </>
  );
};

export default MetaForm;
