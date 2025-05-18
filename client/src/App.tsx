import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useWebSocketData } from "./hooks/useWebSocketData";

function App() {
  const { data, wsError } = useWebSocketData("ws://localhost:3001");

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

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {Object.entries(data).map(([region, status]) => {
            return <div key={region}>{region.toLocaleUpperCase()}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
