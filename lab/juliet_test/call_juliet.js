const axios = require("axios");

// Your Drupal 7 site URL
const baseUrl = "https://content-admin.miclab.se";

// Service endpoint for REST Server provided by the Drupal Services module
const serviceEndpoint = "/neptune_user/node";

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
const nodeId = 17068; // The ID of the node you want to update
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
  password: "Mupervoff888!",
};

// Function to log in and get a CSRF token
const loginAndGetToken = async () => {
  const loginResponse = await axios.post(
    `${baseUrl}/neptune_user/user/login.json`,
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

// Main function to execute login and node update
const main = async () => {
  try {
    const { csrfToken, cookie } = await loginAndGetToken();

    // Fetch a node
    const fetchedNode = await getNode({ csrfToken, cookie, nodeId });
    console.log("Node fetched successfully:", fetchedNode);

    // Update a node
    const updatedNode = await updateNode({ csrfToken, cookie });
    console.log("Node updated successfully:", updatedNode);
  } catch (error) {
    // Handle errors here
  }
};

main();

