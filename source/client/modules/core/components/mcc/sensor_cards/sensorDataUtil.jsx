// sensorDataUtil.js
const errorCode = -999;


export const sensorDataUtil = (tree, point_class) => {
  let sensorData = {
    name: tree.name,
    id: tree.nodeId,
    temperature: errorCode,
    lastTimestamp: new Date().toISOString(),
    batteryLevel: errorCode,
    loraSF: errorCode,
    rssi: errorCode,
    eventId: tree.nodeId,
  };

  tree.children.forEach((child) => {
    switch (child.brickSensorClass) {
      case "timestamp_sensor":
        // make the timestamp human readable (please note that the value is a string but keeps a number format)
        sensorData.lastTimestamp = new Date(
          convertTimestampStringToDate(child.lastKnownValue)
        ).toISOString();
        break;
      case "temperature_sensor":
      case "air_temperature_sensor":
        sensorData.temperature = child.lastKnownValue;
        sensorData.lastTimestamp = new Date(
          child.time_write_string
        ).toISOString();
        sensorData.eventId =
          point_class === "temperature_sensor" ||
          point_class === "air_temperature_sensor"
            ? child.nodeId
            : sensorData.eventId;

        break;
      case "battery_sensor":
      case "battery_voltage_sensor":
        sensorData.batteryLevel = child.lastKnownValue;
        sensorData.eventId =
          point_class === "battery_sensor" ? child.nodeId : sensorData.eventId;
        sensorData.eventId =
          point_class === "battery_voltage_sensor"
            ? child.nodeId
            : sensorData.eventId;
        break;
      case "humidity_sensor":
      case "air_humidity_sensor":
        sensorData.humidity = child.lastKnownValue;
        sensorData.eventId =
          point_class === "humidity_sensor" ? child.nodeId : sensorData.eventId;
        sensorData.eventId =
          point_class === "air_humidity_sensor"
            ? child.nodeId
            : sensorData.eventId;
        break;
      case "spreading_factor_sensor":
        sensorData.loraSF = child.lastKnownValue;
        sensorData.eventId =
          point_class === "spreading_factor_sensor"
            ? child.nodeId
            : sensorData.eventId;
        break;
      case "received_signal_strength_indicator_sensor":
        sensorData.rssi = child.lastKnownValue;
        sensorData.eventId =
          point_class === "received_signal_strength_indicator_sensor"
            ? child.nodeId
            : sensorData.eventId;
        break;
      case "co2_sensor":
        sensorData.co2 = child.lastKnownValue;
        sensorData.eventId =
          point_class === "co2_sensor" ? child.nodeId : sensorData.eventId;
        break;
      case "leakage_sensor":
        sensorData.leakage = child.lastKnownValue;
        sensorData.eventId =
          point_class === "leakage_sensor" ? child.nodeId : sensorData.eventId;
        break;
      case "active_power_sensor":
        sensorData.voltage = child.lastKnownValue;
        // the voltage power can contain be L1, L2 or L3, so we need to check the name of the sensor and set the value accordingly 
        if (child.name.includes("voltage_l1")) {
          sensorData.voltage_L1 = child.lastKnownValue;
        } else if (child.name.includes("voltage_l2")) {
          sensorData.voltage_L2 = child.lastKnownValue;
        } else if (child.name.includes("voltage_l3")) {
          sensorData.voltage_L3 = child.lastKnownValue;
        }
        sensorData.eventId =
          point_class === "active_power_sensor"
            ? child.nodeId
            : sensorData.eventId;
        break;
      default:
        break;
    }
  });

  return sensorData;
};

function convertTimestampStringToDate(timestampString) {
  try {
    // Convert the timestamp string to a number
    const timestamp = parseInt(timestampString, 10);

    // If the timestamp is in seconds, convert it to milliseconds by multiplying by 1000
    // JavaScript Date object requires a timestamp in milliseconds
    const timestampInMilliseconds = timestamp * 1000;

    // Create a new Date object with the timestamp
    const date = new Date(timestampInMilliseconds);

    // Return the Date object
    return date;
  } catch (error) {
    console.error("Error converting timestamp string to date:", error);
    return null; // Or handle the error in a way appropriate for your application
  }
}
