"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    setError("");
    setWeather(null);

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setWeather(data);
      }
    } catch {
      setError("Veri alınamadı.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Hava Durumu</h1>
      <h2>MUstafa ORBAY</h2>
      <input
        type="text"
        placeholder="Şehir giriniz..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
        }}
      />
      <button onClick={getWeather} style={{ padding: "10px", cursor: "pointer" }}>
        Getir
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name} - {weather.sys.country}</h2>
          <p>Sıcaklık: {weather.main.temp}°C</p>
          <p>Hissedilen: {weather.main.feels_like}°C</p>
          <p>Nem: {weather.main.humidity}%</p>
          <p>Hava: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
