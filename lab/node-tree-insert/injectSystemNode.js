// this code creates the injectNode object for SystemNet
// get current timestamp
let timestamp_write = Math.floor(Date.now() / 1000);
let nodeId = "servicenet";


let object_query = { _id: nodeId };

let linkToParent = {
  parentId: "pod.pod",
  childId: nodeId,
  linkToContext: "includes",
  linkFromContext: "included",
  updated: timestamp_write.toString(),
  updated_string: makeDateString(timestamp_write),
  timestamp_write: timestamp_write.toString(),
  time_write_string: makeDateString(timestamp_write),
  status: "active",
};

let injectNode = {
  _id: nodeId,
  entity_class: "system",
  nodeId: nodeId,
  name: "Service Net",
  labelIcon: "LanIcon",
  description: "This is the Service Net!",
  linkToContext: "includes",
  linkFromContext: "included",
  updated: timestamp_write.toString(),
  updated_string: makeDateString(timestamp_write),
  timestamp_write: timestamp_write.toString(),
  time_write_string: makeDateString(timestamp_write),
  status: "active",
};

// insert the injectNode object into the nodes collection
let insertNode = {
  query: object_query,
  collection: "nodes",
  payload: injectNode,
};
node.send(insertNode);




function makeDateString(timestamp) {
  var date = new Date(timestamp * 1000);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return (
    year +
    "-" +
    ("0" + month).slice(-2) +
    "-" +
    ("0" + day).slice(-2) +
    " " +
    ("0" + hour).slice(-2) +
    ":" +
    ("0" + minute).slice(-2) +
    ":" +
    ("0" + second).slice(-2)
  );
}

function cleanUpKey(string) {
  if (!string) return ""; // Ensure that the passed value is not undefined or null
  string = string.replace(/ /g, "_"); // replace space with underscore
  return string.replace(/\./g, "_"); // replace dot with underscore
}

// function to replace space with underscore
function replaceSpaceWithDash(string) {
  return string.replace(/ /g, "-");
}

// function to replace dot with underscore
function replaceDotWithDash(string) {
  if (!string) return "";
  return string.replace(/\./g, "-");
}