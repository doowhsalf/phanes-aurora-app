const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const uri = "mongodb://localhost:44017";
const client = new MongoClient(uri);

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
          originalDocIds: { $push: "$_id" },
          trueValueCount: {
            $sum: { $cond: [{ $eq: ["$value", "true"] }, 1, 0] },
          },
          // Keep the first occurrence of the converted timestamp
          timestamp_write: { $first: "$convertedTimestamp" },
          brickSensorClass: { $first: "$brickSensorClass" },
          brickSensorClassQuantity: { $first: "$brickSensorClassQuantity" },
          timestamp_read: { $first: "$timestamp_read" },
          time_read_string: { $first: "$time_read_string" },
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
        $out: "temp_aggregated",
      },
    ];

    await timeSeriesCollection.aggregate(pipeline).toArray();

    const tempAggregatedCollection = database.collection("temp_aggregated");
    const aggregatedResults = await tempAggregatedCollection.find().toArray();

    for (const result of aggregatedResults) {
      const aggregatedDocId = new ObjectId();

      // Ensure `timestamp_write` is in the correct format
      const documentToInsert = {
        ...result,
        _id: aggregatedDocId,
        timestamp_write: result.timestamp_write.toISOString(),
      };

      await aggregatedCollection.insertOne(documentToInsert);

      for (const originalDocId of result.originalDocIds) {
        await timeSeriesCollection.updateOne(
          { _id: originalDocId },
          { $set: { aggregatedDocId: aggregatedDocId } }
        );
      }
    }

    await tempAggregatedCollection.drop();
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

aggregateTimeSeriesData();
