"use client";

import { useState } from "react";
import Clock from "./Clock"; // Yeni Clock bileşeni

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

  const getBackgroundStyle = () => {
    if (!weather) return { backgroundColor: "#f0f0f0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" };
    const condition = weather.weather[0]?.main;

    switch (condition) {
      case "Clear":
        return { backgroundColor: "#87CEEB", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" };
      case "Clouds":
        return { backgroundColor: "#B0C4DE", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" };
      case "Rain":
        return { backgroundColor: "#708090", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" };
      case "Snow":
        return { backgroundColor: "#FFFFFF", color: "#333", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" };
      default:
        return { backgroundColor: "#D3D3D3", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" };
    }
  };

  return (
    <div style={getBackgroundStyle()}>
      <div style={{ maxWidth: "600px", padding: "20px", textAlign: "center", backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "10px" }}>
        <Clock /> {/* Saat ve tarih bileşeni burada */}
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Hava Durumu</h1>
        <h2 style={{ color: "#555" }}>Mustafa ORBAY</h2>
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
            borderRadius: "5px",
            fontSize: "16px"
          }}
        />
        <button 
          onClick={getWeather} 
          style={{ 
            padding: "10px 15px", 
            cursor: "pointer", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            fontSize: "16px",
            transition: "0.3s"
          }}
        >
          Getir
        </button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        {weather && (
          <div style={{ marginTop: "20px", padding: "15px", borderRadius: "5px", backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
            <h2>{weather.name} - {weather.sys.country}</h2>
            <p>Sıcaklık: {weather.main.temp}°C</p>
            <p>Hissedilen: {weather.main.feels_like}°C</p>
            <p>Nem: {weather.main.humidity}%</p>
            <p>Hava: {weather.weather[0]?.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
