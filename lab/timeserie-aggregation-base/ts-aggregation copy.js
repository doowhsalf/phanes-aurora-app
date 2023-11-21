const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const uri = "mongodb://localhost:44017";
const client = new MongoClient(uri);
/*

{
    "_id" : ObjectId("6532902bc23d740007d59154"),
    "point_id" : "fibaro-tritonite-proxima-east/switch/37/events/fibaro_=>_home_assistant/state",
    "value" : "true",
    "brickSensorClass" : "UNKNOWN-SENSOR-CLASS",
    "brickSensorClassQuantity" : null,
    "timestamp_read" : "1697497150",
    "time_read_string" : "2023-10-17 00:59:10",
    "timestamp_write" : "1697812523",
    "time_write_string" : "2023-10-20 16:35:23",
    "status" : "active",
    "processStatus" : "valid",
    "deviceParameter" : null,
    "command" : "fibaro => home assistant",
    "topic" : "fibaro-tritonite-proxima-east/switch/37/events/fibaro => home assistant/state",
    "created" : ISODate("2023-10-20T14:35:23.146+0000")
}
*/
async function aggregateTimeSeriesData() {
  try {
    await client.connect();
    const database = client.db("neptune_pod_001");
    const timeSeriesCollection = database.collection("events_ts");
    const aggregatedCollection = database.collection("events_ts_aggregated");

    const pipeline = [
      {
        $addFields: {
          convertedTimestamp: { $toDate: { $toLong: "$timestamp_write" } }, // Convert string to number, then to date
        },
      },
      {
        $group: {
          _id: {
            timeInterval: {
              $dateTrunc: {
                date: "$convertedTimestamp",
                unit: "minute",
                binSize: 5,
              },
            },
            pointId: "$point_id",
          },
          originalDocIds: { $push: "$_id" }, // Collecting original document IDs
          trueValueCount: {
            $sum: { $cond: [{ $eq: ["$value", "true"] }, 1, 0] }, // Counting 'true' values
          },
          // Include first occurrence of other fields
          brickSensorClass: { $first: "$brickSensorClass" },
          brickSensorClassQuantity: { $first: "$brickSensorClassQuantity" },
          timestamp_read: { $first: "$timestamp_read" },
          time_read_string: { $first: "$time_read_string" },
          timestamp_write: { $first: "$timestamp_write" },
          time_write_string: { $first: "$time_write_string" },
          status: { $first: "$status" },
          processStatus: { $first: "$processStatus" },
          deviceParameter: { $first: "$deviceParameter" },
          command: { $first: "$command" },
          topic: { $first: "$topic" },
          created: { $first: "$created" },
        },
      },
      {
        $out: "temp_aggregated", // Output to a temporary collection
      },
    ];

    // Perform the aggregation
    await timeSeriesCollection.aggregate(pipeline).toArray();

    // Retrieve aggregated results from the temporary collection
    const tempAggregatedCollection = database.collection("temp_aggregated");
    const aggregatedResults = await tempAggregatedCollection.find().toArray();

    for (const result of aggregatedResults) {
      const aggregatedDocId = new ObjectId(); // Create a unique identifier for the aggregated document

      // Insert the aggregated result with the list of original document IDs
      await aggregatedCollection.insertOne({ ...result, _id: aggregatedDocId });

      // Update each original document to reference the aggregated document
      for (const originalDocId of result.originalDocIds) {
        await timeSeriesCollection.updateOne(
          { _id: originalDocId },
          { $set: { aggregatedDocId: aggregatedDocId } }
        );
      }
    }

    // Optionally, clean up the temporary collection
    await tempAggregatedCollection.drop();
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

aggregateTimeSeriesData();
