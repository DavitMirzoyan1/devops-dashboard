import React from "react";
import "./App.css";
import { useWebSocketData } from "./hooks/useWebSocketData";
import RegionCard from "./components/RegionCard";

function App() {
  const { data, lastUpdated, wsError } = useWebSocketData(
    "ws://localhost:3001"
  );

  if (!data || typeof data !== "object") {
    return <div>Loading data from server...</div>;
  }

  return (
    <div className="App">
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h1>🌍 Server Region Dashboard</h1>

        {wsError && (
          <p style={{ color: "red" }}>
            WebSocket disconnected or failed to fetch the data. Please make sure
            the backend is running.
          </p>
        )}

        <p style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
          Last updated:{" "}
          {lastUpdated ? new Date(lastUpdated).toLocaleString() : "—"}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {Object.entries(data).map(([region, status]) => (
            <RegionCard key={region} region={region} status={status} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
