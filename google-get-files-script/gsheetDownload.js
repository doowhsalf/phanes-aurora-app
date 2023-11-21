const fs = require("fs").promises;
const path = require("path");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const TOKEN_PATH = "./token.json";
const CREDENTIALS_PATH = "./credentials.json";

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;

  console.log("Keys", keys);

  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: keys.client_id,
    client_secret: keys.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request authorization to call APIs.
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: SCOPES,
  });
  client = await auth.getClient();
  await saveCredentials(client);
  return client;
}

/**
 * Downloads a specific sheet as pure text.
 *
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function downloadSheetAsText(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1m0hrsWq5xi4kb5Bzszvo_VVB1Eyr2IzcwaJgTEfC4hE";
  const sheetName = "machine_copy";

  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    const sheet = response.data.sheets.find(
      (s) => s.properties.title === sheetName
    );
    if (!sheet) {
      console.log(`Sheet "${sheetName}" not found.`);
      return;
    }

    const range = `${sheetName}!A1:ZZ948`;
    const responseData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
      valueRenderOption: "UNFORMATTED_VALUE",
      dateTimeRenderOption: "SERIAL_NUMBER",
    });

    const records = responseData.data.values;
    if (!records || records.length === 0) {
      console.log("No data found in the sheet.");
      return;
    }

    const textData = records
      .filter((row) => row[0]) // Omit row if first value is empty
      .map((row) => row.join("\t"))
      .join("\n");

    // Set text file to master.txt
    const outputPath = path.join(__dirname, "master.csv");
    await fs.writeFile(outputPath, textData);

    console.log(`Sheet downloaded: ${outputPath}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

authorize().then(downloadSheetAsText).catch(console.error);
