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

// make collections for keyvalue, keyvalue_class, keyvalue_group, keyvalue_context
export const KeyValues = new Mongo.Collection("keyvalues");
export const KeyValueClasses = new Mongo.Collection("keyvalueClasses");
export const KeyValueGroups = new Mongo.Collection("keyvalueGroups");
export const KeyValueContexts = new Mongo.Collection("keyvalueContexts");
//

export const Contents = new Mongo.Collection("contents");
export const WorkOrders = new Mongo.Collection("workorders");

DEFCON5 && console.log("Fixing collections...");
