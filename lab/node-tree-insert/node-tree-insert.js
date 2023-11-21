const MongoClient = require("mongodb").MongoClient;
const fs = require("fs").promises;
const path = require("path");

const url = "mongodb://localhost:44017";

async function updateCollections(jsonData) {
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db("neptune_pod_001");

    const nodeCollection = db.collection("nodes");
    const nodeLinksCollection = db.collection("node_links");

    async function traverseNode(node, parentId = null) {
      const { children, ...nodeWithoutChildren } = node;

      try {
        nodeWithoutChildren.status = "active";
        let superParentId = parentId === null ? "node.root" : parentId;

        let date = new Date();
        let timestamp = Math.floor(date.getTime() / 1000);

        // Your existing entity_class and nodeId logic here
        // make sure node.entity_class is not null and just small characters
        if (node.entity_class) {
          node.entity_class = node.entity_class.toLowerCase();
        } else {
          // generate a random string of 8 characters and concat if with value 'node.' so the string is node.12345678;
          node.entity_class =
            "node." + Math.random().toString(36).substring(2, 10).toLowerCase();
        }

        // make sure node.nodeId is not null and just small characters
        if (node.nodeId) {
          node.nodeId = node.nodeId.toLowerCase();
        } else {
          // generate a random string of 8 characters and concat if with value 'node.' so the string is node.12345678;
          node.nodeId =
            "node." + Math.random().toString(36).substring(2, 10).toLowerCase();
        }
        console.log("node.nodeId: ", node.nodeId);
        console.log("node.entity_class: ", node.entity_class);

        nodeWithoutChildren._id =
          node.entity_class.toLowerCase() + "." + node.nodeId;
        nodeWithoutChildren.updated = timestamp;
        nodeWithoutChildren.updated_string = date.toISOString();
        nodeWithoutChildren.timestamp_write = timestamp;
        nodeWithoutChildren.time_write_string = date.toISOString();
        nodeWithoutChildren.nodeId = nodeWithoutChildren.nodeId.toLowerCase();
        nodeWithoutChildren.entity_class = node.entity_class.toLowerCase();
        nodeWithoutChildren.linkFromContext = node.linkFromContext
          ? node.linkFromContext.toLowerCase()
          : "pending";
        nodeWithoutChildren.linkToContext = node.linkToContext
          ? node.linkToContext.toLowerCase()
          : "pending";

        const upsertResult = await nodeCollection.updateOne(
          { _id: nodeWithoutChildren._id }, // filter
          { $set: nodeWithoutChildren }, // update
          { upsert: true } // options
        );
        console.log(
          `Upserted node: ${upsertResult.upsertedId || nodeWithoutChildren._id}`
        );

        if (parentId) {
          const upsertLinkResult = await nodeLinksCollection.updateOne(
            { parentId, childId: nodeWithoutChildren._id }, // filter
            {
              $set: {
                parentId,
                childId: nodeWithoutChildren._id,
                linkToContext: nodeWithoutChildren.linkToContext.toLowerCase(),
                linkFromContext:
                  nodeWithoutChildren.linkFromContext.toLowerCase(),
              },
            },
            { upsert: true }
          );
          console.log(
            `Upserted link: ${
              upsertLinkResult.upsertedId || nodeWithoutChildren._id
            }`
          );
        }

        if (Array.isArray(children)) {
          for (const child of children) {
            await traverseNode(child, nodeWithoutChildren._id);
          }
        }
      } catch (err) {
        console.error(`Error processing node ${node.nodeId}:`, err);
      }
    }

    await traverseNode(jsonData, "pod");
  } catch (err) {
    console.error(err);
  } finally {
    if (client) {
      client.close();
    }
  }
}

async function recreateTree(db, startNodeId) {
  const nodeCollection = db.collection("nodes");
  const nodeLinksCollection = db.collection("node_links");

  async function buildNode(nodeId) {
    const node = await nodeCollection.findOne({ _id: nodeId }); // Changed to search by _id
    if (!node) {
      return null;
    }

    const links = await nodeLinksCollection
      .find({ parentId: nodeId }) // Changed to search by _id
      .toArray();

    const children = [];
    for (const link of links) {
      const childNode = await buildNode(link.childId); // Here childId is already _id
      if (childNode) {
        children.push(childNode);
      }
    }

    return {
      ...node,
      children,
    };
  }

  return buildNode(startNodeId);
}

// ... (rest of your code remains unchanged)

async function main() {
  let client;
  try {
    const filename = process.argv[2]; // Access the filename from command-line arguments

    if (!filename) {
      console.error("Please provide a JSON filename as an argument.");
      process.exit(1);
    }

    const filePath = path.join(__dirname, filename); // Use the provided filename
    const jsonDataStr = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(jsonDataStr);

    await updateCollections(jsonData);

    //const tree = await recreateTree(db, "node.root");
    //console.log(JSON.stringify(tree, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    if (client) {
      client.close();
    }
  }
}

main().catch(console.error);
