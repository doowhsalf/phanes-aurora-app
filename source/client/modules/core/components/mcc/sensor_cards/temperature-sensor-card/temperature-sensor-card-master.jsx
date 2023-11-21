import React, { useState, useEffect, useRef } from "react";
import SensorCard from "./temperature-sensor-card";
import TemperatureSensorCardProxy from "./temperature-sensor-card-proxy";
function TempSensorCardMaster({nodeId}) {
  const [sensorData, setSensorData] = useState({
    name: "Utetemperaturgivare",
    id: "SENSOR_001",
    temperature: 23.4,
    lastTimestamp: new Date().toISOString(),
  });

  const specificDate = new Date();

  // set the date - 1 day. This is used to generate the 24 hour history data
  specificDate.setDate(specificDate.getDate() - 1);

  const dataFromSpecificDate = generate24HourHistoryData(specificDate);

  const initialHistoryData = {
    "24h": generate24HourHistoryData(),
    "1day": dataFromSpecificDate,
    // ... Add other periods here with mock data if required
  };

  const [historyData, setHistoryData] = useState(initialHistoryData);

  // Use a ref to always get the latest value
  const sensorDataRef = useRef(sensorData);
  useEffect(() => {
    sensorDataRef.current = sensorData;
  }, [sensorData]);

  useEffect(() => {
    const updateInterval = 15 * 1000;

    const interval = setInterval(() => {
      const currentTemperature = parseFloat(
        sensorDataRef.current.temperature.toFixed(2)
      );
      const randomTemperatureChange = parseFloat(
        (Math.random() * 2 - 1).toFixed(1)
      );
      const randomTemperature = (
        currentTemperature + randomTemperatureChange
      ).toFixed(1);

      if (typeof randomTemperature !== "string") {
        // because toFixed returns a string
        console.error(
          "Unexpected type for randomTemperature:",
          typeof randomTemperature
        );
        console.error("Current Temperature:", currentTemperature);
        console.error("Random Temperature Change:", randomTemperatureChange);
      }

      setSensorData((prevData) => ({
        ...prevData,
        temperature: parseFloat(randomTemperature),
        lastTimestamp: new Date().toISOString(),
      }));

      setHistoryData((prevHistory) => {
        const newDate = new Date().toISOString().split("T")[0];
        const newDates24h = [...prevHistory["24h"].dates, newDate];
        const newValues24h = [
          ...prevHistory["24h"].values,
          parseFloat(randomTemperature),
        ];

        if (newDates24h.length > 30) {
          newDates24h.shift();
          newValues24h.shift();
        }

        return {
          ...prevHistory,
          "24h": {
            dates: newDates24h,
            values: newValues24h,
          },
        };
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <TemperatureSensorCardProxy
      nodeId={nodeId}
      historyDataSimulated={historyData}
    />
  );
}

function generate24HourHistoryData(endDateTime = new Date()) {
  // If a specific date and time is not provided, use the current date and time
  const endDate = new Date(endDateTime);
  const startDate = new Date(endDate);
  startDate.setHours(endDate.getHours() - 24); // 24 hours ago

  const dates = [];
  const values = [];

  let firstEntry = true;
  while (startDate <= endDate) {
    // For the first entry, add date and hh:mm. For subsequent entries, just add hh:mm.
    if (firstEntry) {
      dates.push(
        `${startDate.toISOString().split("T")[0]} ${startDate
          .toTimeString()
          .slice(0, 5)}`
      );
      firstEntry = false;
    } else {
      dates.push(startDate.toTimeString().slice(0, 5));
    }

    // Generate a random temperature between 20 and 25 for demonstration
    const randomTemperature = (20 + Math.random() * 5).toFixed(1);
    values.push(parseFloat(randomTemperature));

    // Move to the next hour
    startDate.setHours(startDate.getHours() + 1);
  }

  return { dates, values };
}

// Usage

export default TempSensorCardMaster;
