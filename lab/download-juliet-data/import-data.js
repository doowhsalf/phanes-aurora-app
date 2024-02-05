const axios = require("axios");
const fs = require("fs"); // For file system operations
const xml2js = require("xml2js");
const htmlToMarkdown = require("html-to-markdown");

// Your Drupal 7 site URL
// const baseUrl = "https://content-admin.miclab.se";
const baseUrl = "https://julietr2.mobilestories.se";

// Service endpoint for REST Server provided by the Drupal Services module
//const serviceEndpoint = "/neptune_user/node";
const serviceEndpoint = "/oberon_user/node";

// Function to get a Drupal 7 node
const getNode = async ({ csrfToken, cookie, nodeId }) => {
  try {
    const response = await axios.get(
      `${baseUrl}${serviceEndpoint}/${nodeId}.json`,
      {
        headers: {
          "X-CSRF-Token": csrfToken,
          Cookie: cookie,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching node:", error);
  }
};

// Data for updating the node (replace with your node ID and other data)
const nodeId = 17175; // The ID of the node you want to update
const updateData = {
  title: "Updated Title",
  body: {
    und: [
      {
        value: "Updated Body Text",
      },
    ],
  },
  field_subheader: {
    und: [
      {
        value: "Your Updated Subhead Text",
      },
    ],
  },
  field_weight: {
    und: [
      {
        value: 0,
      },
    ],
  },
};

// Login data (replace with your user credentials)
const loginData = {
  username: "admin",
  password: "doow112358!",
};

// Function to log in and get a CSRF token
const loginAndGetToken = async () => {
  const loginResponse = await axios.post(
    `${baseUrl}/oberon_user/user/login.json`,
    loginData
  );
  const csrfToken = loginResponse.data.token;
  const cookie = loginResponse.headers["set-cookie"].join(";");
  return { csrfToken, cookie };
};

// Function to update a Drupal 7 node
const updateNode = async ({ csrfToken, cookie }) => {
  const updateResponse = await axios.put(
    `${baseUrl}${serviceEndpoint}/${nodeId}.json`,
    updateData,
    {
      headers: {
        "X-CSRF-Token": csrfToken,
        Cookie: cookie,
      },
    }
  );
  return updateResponse.data;
};
const convertXmlToJsonAndSave = async () => {
  try {
    const xml = fs.readFileSync("data.xml", "utf8");
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xml);

    // Extract the "node" array directly from the result
    const nodesArray = result.nodes.node;

    // Create a new array to store the modified nodes
    const modifiedNodes = nodesArray.map((node) => {
      const modifiedNode = {
        translationSetNodeId: node["Translation-set-node-ID"][0],
        masterArticle: node["Translation-set-node-ID"][0] === "0",
        articleCode: node["Article-code"], // Always an array
      };

      // Iterate over all other properties and convert them to lowercase or camelCase
      for (const key in node) {
        if (key === "Translation-set-node-ID" || key === "Article-code") {
          continue; // Skip these properties
        }
        const camelCaseKey =
          key === "Translation-set-node-ID"
            ? "translationSetNodeId"
            : convertToCamelCase(key);
        modifiedNode[convertToCamelCase(key)] = node[key][0];

        if (key === "Type-of-article") {
          modifiedNode["typeOfArticle"] = lowercase(removeSpace(node[key][0]));
          // if the value is "" set it to "snippet"
          modifiedNode["typeOfArticle"] =
            modifiedNode["typeOfArticle"] === ""
              ? "snippet"
              : modifiedNode["typeOfArticle"];
        }

        modifiedNode["version"] = "1"; // all nodes are version 1 at the start
        // create fields createdAt, updatedAt, createdBy, updatedBy
        modifiedNode["createdAt"] = new Date().toISOString();
        modifiedNode["updatedAt"] = new Date().toISOString();
        modifiedNode["createdBy"] = "system";
        modifiedNode["updatedBy"] = "system";
        // modifiedNode["contentType"] = modifiedNode["type"]; //=== "article" ? "article" : "article";
        // modifiedNode["typeOfArticle"] = modifiedNode["type-of-article"];
        // if (modifiedNode["contentType"] === "article")
        //   modifiedNode["typeOfArticle"] =
        //     modifiedNode["typeOfArticle"] === "Open info"
        //       ? "openinfoArticle"
        //       : modifiedNode["typeOfArticle"] === "Help text"
        //       ? "helpArticle"
        //       : "legalArticle";
        // else modifiedNode["typeOfArticle"] = "helpArticle";
        // remove type
        delete modifiedNode["type"];
        let originalLanguage = node.Language[0];
        // set langeuage to lowercase but check if the key exists first and in that case set it to lowercase. if not set it to en (iso code). Also check if the language is Swedish and if so set it to sv, if English set it to en
        modifiedNode["language"] = modifiedNode["language"]
          ? modifiedNode["language"].toLowerCase()
          : "en";
        modifiedNode["language"] =
          originalLanguage === "Swedish"
            ? "sv"
            : originalLanguage === "English"
            ? "en"
            : "en";
        modifiedNode["originalLanguage"] = originalLanguage;
        // _id to nid
        modifiedNode["_id"] = modifiedNode["nid"];
        // create a field called status that is set to "approved" if the node is approved or "draft" if it is not. Default is draft and shall be set now for all nodes
        modifiedNode["status"] = "draft";

        // create a revision array with the first revision as the original node in order to keep track of all revisions
        modifiedNode["revisions"] = [
          {
            createdAt: modifiedNode["createdAt"],
            createdBy: modifiedNode["createdBy"],
            updatedAt: modifiedNode["updatedAt"],
            updatedBy: modifiedNode["updatedBy"],
            version: modifiedNode["version"],
            status: modifiedNode["status"],
            language: modifiedNode["language"],
            originalLanguage: modifiedNode["originalLanguage"],
            title: modifiedNode["title"],
            body: modifiedNode["body"],
            subheader: modifiedNode["subheader"],
            weight: modifiedNode["weight"],
            articleCode: modifiedNode["articleCode"],
            typeOfArticle: modifiedNode["typeOfArticle"],
            contentType: modifiedNode["contentType"],
            _id: modifiedNode["_id"],
            nid: modifiedNode["nid"],
          },
        ];
        if (node["node"]) {
          modifiedNode.body = htmlToMarkdown(node["node"][0]);
        }
      }

      return modifiedNode;
    });

    // Write the modified array directly to data.json
    const json = JSON.stringify(modifiedNodes, null, 2); // Format JSON with 2-space indentation
    fs.writeFileSync("data.json", json);

    console.log("JSON data saved to data.json");
  } catch (error) {
    console.error("Error converting XML to JSON:", error);
  }
};

// Helper function to convert hyphen-separated keys to camelCase and ensure lowercase first letter
function convertToCamelCase(key) {
  return key
    .replace(/-([a-z])/g, (_, match) => match.toUpperCase())
    .replace(/^(.)/, (match) => match.toLowerCase());
}

// Function to download XML and save as data.xml
const downloadAndSaveXML = async ({ csrfToken, cookie }) => {
  try {
    const xmlResponse = await axios.get(
      `${baseUrl}/globalstuff.xml`, // Replace this URL with the actual path to the globalstuff.xml on your server
      {
        headers: {
          "X-CSRF-Token": csrfToken,
          Cookie: cookie,
        },
        responseType: "text", // Specify that you're expecting a text response, not JSON
      }
    );

    fs.writeFileSync("data.xml", xmlResponse.data);
    console.log("XML data saved to data.xml");
  } catch (error) {
    console.error("Error downloading and saving XML:", error);
  }
};

// Main function to execute login, node fetch, node update, and XML download
const main = async () => {
  try {
    const { csrfToken, cookie } = await loginAndGetToken();

    // Fetch a node
    // const fetchedNode = await getNode({ csrfToken, cookie, nodeId });
    // console.log("Node fetched successfully:", fetchedNode);

    // // Update a node
    // const updatedNode = await updateNode({ csrfToken, cookie });
    // console.log("Node updated successfully:", updatedNode);

    // Download and save XML
    await downloadAndSaveXML({ csrfToken, cookie });
    await convertXmlToJsonAndSave();
  } catch (error) {
    // Handle errors here
    console.error("Main function error:", error);
  }
};

// function to remove space with _
const removeSpace = (str) => {
  return str.replace(/\s/g, "_");
};

// make string to lowercase
const lowercase = (str) => {
  return str.toLowerCase();
};

main();
