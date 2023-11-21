// this code creates the injectNode object for SystemNet
// {"gatewayClassId":"fibaro-home3","gatewayId":"fibaro-tritonite-proxima-southeast","space":"Living room","spaceClass":"Not defined","deviceId":"50","deviceName":"TVOC01.Humidity sensor","timestamp":1697032023,"timestampAsString":"Wed Oct 11 15:47:04 2023","value":"76.64","topic":"fibaro-tritonite-proxima-southeast/sensor/50/events/fibaro => home assistant/value","brickSensorClassObject":{"brickSensorClass":"UNKNOWN-SENSOR-CLASS"}}
// get current timestamp
let timestamp_write = Math.floor(Date.now() / 1000);
let gatewayClass = global.get('gateway-class')

let parentId = gatewayClass+'.'+msg.payload.gatewayId;
let nodeId = msg.payload.deviceId+"."+msg.payload.deviceName;
let entity_class = "meter";
let nodeIdKey = entity_class + "." + nodeId;
let LinkSymbol = global.get("node-link-symbol");
let linkIdKey = parentId + LinkSymbol + nodeIdKey;

let object_query = { _id: nodeIdKey };

let injectNode = {
  _id: nodeIdKey,
  entity_class: entity_class,
  nodeId: nodeIdKey,
  name: msg.payload.deviceName,
  entity_class: "meter",
  labelIcon: "SensorsIcon",
  description: "Meter Equipment ",
  linkToContext: "hasPoint",
  linkFromContext: "feeds",
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

let linkToParent = {
  _id: linkIdKey,
  parentId: parentId,
  childId: nodeIdKey,
  linkToContext: "isFeedBy",
  linkFromContext: "feeds",
  updated: timestamp_write.toString(),
  updated_string: makeDateString(timestamp_write),
  timestamp_write: timestamp_write.toString(),
  time_write_string: makeDateString(timestamp_write),
  status: "active",
};

let insertNodeLinks = {
  query: { _id: linkIdKey },
  collection: "node_links",
  payload: linkToParent,
};
node.send(insertNodeLinks);

// prepare point object
let pointId = msg.payload.topic;
let pointIdKey = cleanUpKey(pointId);
object_query = { _id: pointIdKey };

let pointObject = {
  _id: pointIdKey,
  nodeId: pointIdKey,
  name: pointIdKey,
  entity_class: "point",
  labelIcon: "DataObjectIcon",
  description: "Measurement Point",
  linkToContext: "sourcePoint",
  linkFromContext: "isPointOf",
  updated: timestamp_write.toString(),
  updated_string: makeDateString(timestamp_write),
  timestamp_write: timestamp_write.toString(),
  time_write_string: makeDateString(timestamp_write),
  lastKnownValue: msg.payload.value,
  hasSubstance: 'unknown',
  hasQuantity: 'unknown',
  status: "active",
};

// insert the injectNode object into the nodes collection
let pointNode = {
  query: object_query,
  collection: "nodes",
  payload: pointObject,
};
node.send(pointNode);

linkIdKey = nodeIdKey + LinkSymbol + pointIdKey;

let linkToPoint = {
  _id: linkIdKey,
  parentId: nodeIdKey,
  childId: pointIdKey,
  linkToContext: "hasPoint",
  linkFromContext: "isPointOf",
  updated: timestamp_write.toString(),
  updated_string: makeDateString(timestamp_write),
  timestamp_write: timestamp_write.toString(),
  time_write_string: makeDateString(timestamp_write),
  status: "active",
};

let insertPointLinks = {
  query: { _id: linkIdKey },
  collection: "node_links",
  payload: linkToPoint,
};

node.send(insertPointLinks);





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
