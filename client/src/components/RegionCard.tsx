import React from "react";
import { buildServicesData } from "../utils/buildServiceData";
import {
  buildBlockedKeysData,
  buildTopKeyStats,
  buildWorkerPoolDetails,
} from "../utils/buildKeyData";
import { buildStatisticsData } from "../utils/buildStatisticsData";
import SectionsForm from "./ui/SectionsForm";

type Props = {
  region: string;
  status: Record<string, any>;
};

const RegionCard: React.FC<Props> = ({ region, status }) => {
  if (status?.error) {
    return (
      <div
        style={{
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "8px",
          width: "300px",
          backgroundColor: "#ffe0e0",
        }}
      >
        <h2>{region.toUpperCase()}</h2>
        <p>Error: {status.message}</p>
      </div>
    );
  }

  const stats = status?.results?.stats;
  const services = status?.results?.services;
  const server = stats?.server;
  const ioWorker = server?.workers?.find((w: any) => w[0] === "io")?.[1];

  const servicesData = buildServicesData(services);
  const keyStatistics = buildStatisticsData(stats, server);
  const blockedKeys = buildBlockedKeysData(ioWorker);
  const topKeys = buildTopKeyStats(ioWorker);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "10px",
        width: "320px",
        backgroundColor: status.status === "ok" ? "#e9ffe9" : "#ffe9e9",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <span>{status.status === "ok" ? "✅ OK" : "❌ ERROR"}</span>
        <span>🌎 {status.region}</span>
        <span>🔄 v{status.version}</span>
      </div>
      <hr
        style={{
          margin: "1rem 0",
          border: "none",
          borderTop: "2px solid #ccc",
        }}
      />

      <SectionsForm label="Services" data={servicesData} />
      <SectionsForm label={`📊 Key Statistics`} data={keyStatistics} />

      {blockedKeys.length > 0 && (
        <SectionsForm label="⚠️🔑 Blocked Keys" data={blockedKeys} />
      )}

      {topKeys.length > 0 && (
        <SectionsForm label="🔑 Top Keys" data={topKeys} />
      )}

      <SectionsForm
        label="🔧 Worker Pool Details"
        data={buildWorkerPoolDetails(ioWorker)}
      />

      {ioWorker?.time_to_return > 50000 && (
        <p style={{ color: "orange" }}>
          🐌 Slow Response: {Math.round(ioWorker.time_to_return / 1000)}s
        </p>
      )}
    </div>
  );
};

export default RegionCard;
