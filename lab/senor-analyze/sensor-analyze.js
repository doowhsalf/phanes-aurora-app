function getSensorClass(topic) {
  const sensorClasses = global.get("sensor_class_match");

  for (const sensor of sensorClasses) {
    if (sensor.match.test(topic)) {
      return sensor.sensorClass;
    }
  }

  return "UNKNOWN-SENSOR-CLASS"; // Default sensor class if no match is found
}
// get the context object from msg.data.context that is a serialized JSON string
const context = JSON.parse(msg.data.context);
// Example usage:
const topic1 = context.deviceName;
const sensorClass1 = getSensorClass(topic1);
console.log(sensorClass1); // Output: "TimestampSensor"
let newMsg1 = { payload: sensorClass1, data: msg };
node.send(newMsg1);

