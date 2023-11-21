import React, { useState, useEffect } from "react";
import PodPerformance from "./pod-performance";

export default function SampleDataGenerator() {
  // Define state variables
  const [cpu, setCpu] = useState(50);
  const [memory, setMemory] = useState(50);
  const [disk, setDisk] = useState(50);

  // Helper function to ensure value is between 0 and 100
  const clamp = (value) => Math.min(Math.max(value, 0), 100);

  useEffect(() => {
    // Update the state variables every 5 seconds
    const interval = setInterval(() => {
      setCpu((prevCpu) => {
        const delta = Math.floor(Math.random() * 41) - 20; // Between -20 and +20
        return clamp(prevCpu + delta);
      });

      setMemory((prevMemory) => {
        const delta = Math.floor(Math.random() * 21) - 10; // Between -10 and +10
        return clamp(prevMemory + delta);
      });

      setDisk((prevDisk) => {
        const delta = Math.random() > 0.5 ? 0.5 : -0.5; // Either 0.5 or -0.5
        return clamp(prevDisk + delta);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <PodPerformance cpu={cpu} memory={memory} disk={disk} />;
}
