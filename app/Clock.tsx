"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
      {time.toLocaleDateString()} - {time.toLocaleTimeString()}
    </div>
  );
}
