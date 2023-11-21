import { Mongo } from "meteor/mongo";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/package.json";

export const Users = new Mongo.Collection("Users");

export const SystemConfig = new Mongo.Collection("systemconfig");

export const ChatLines = new Mongo.Collection("chatlines");
export const ChatRooms = new Mongo.Collection("chatrooms");

export const Nodes = new Mongo.Collection("nodes");
export const NodeLinks = new Mongo.Collection("node_links");

export const Agents = new Mongo.Collection("agents");
export const AgentUserConnections = new Mongo.Collection("agent_user_connections");
export const Architecture = new Mongo.Collection("architecture");
export const Pods = new Mongo.Collection("pods");
export const Points = new Mongo.Collection("points");
export const Events = new Mongo.Collection("events_ts");
export const LastKnownValue = new Mongo.Collection("last_known_value");

// make collections for keyvalue, keyvalue_class, keyvalue_group, keyvalue_context
export const KeyValues = new Mongo.Collection("keyvalues");
export const KeyValueClasses = new Mongo.Collection("keyvalueClasses");
export const KeyValueGroups = new Mongo.Collection("keyvalueGroups");
export const KeyValueContexts = new Mongo.Collection("keyvalueContexts");
//
export const Notices = new Mongo.Collection("notices");
export const NoticesUserStatus = new Mongo.Collection("notices_userstatus");
//
export const Articles = new Mongo.Collection("dm_node_article");

export const Ontology = new Mongo.Collection("ontology");

export const SensorMapping = new Mongo.Collection(
  "mediation_matching_pattern_sensorclass"
);

export const Meters = new Mongo.Collection("meters");

DEFCON5 && console.log("Fixing collections...");
