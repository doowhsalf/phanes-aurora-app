const MongoClient = require("mongodb").MongoClient;
const fs = require("fs").promises; // Promises API of fs
const path = require("path");

const url = "mongodb://localhost:44017";

async function recreateTree(db, startNodeId) {
  const nodeCollection = db.collection("nodes");
  const nodeLinksCollection = db.collection("node_links");

  async function buildNode(_id) {
    // _id is now the parameter
    // Fetch node information from MongoDB using _id
    const node = await nodeCollection.findOne({ _id });
    if (!node) {
      return null;
    }

    // Find all links for this node using _id
    const links = await nodeLinksCollection
      .find({ parentId: _id }) // Now searching with _id
      .toArray();

    // Recursively build the children
    const children = [];
    for (const link of links) {
      const childNode = await buildNode(link.childId); // Ensure childId is also an _id
      if (childNode) {
        children.push(childNode);
      }
    }

    return {
      ...node,
      children,
    };
  }

  return buildNode(startNodeId); // This should now be an _id
}


async function main() {
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db("neptune_pod_001"); // Replace 'yourDB' with your database name
    const node = process.argv[2]; // Access the filename from command-line arguments

    if (!node) {
      console.error("Please provide a JSON filename as an argument.");
      process.exit(1);
    }

    // Here, we start recreating the tree from a given node id, e.g., "node.root"
    const tree = await recreateTree(db, node);
    console.log(JSON.stringify(tree, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    if (client) {
      client.close();
    }
  }
}


main().catch(console.error);
