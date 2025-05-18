import { render, screen } from "@testing-library/react";
import RegionCard from "./RegionCard";

const mockStatusOK = {
  status: "ok",
  region: "us-east",
  version: "2025.5.12",
  results: {
    services: { redis: true, database: true },
    stats: {
      servers_count: 2,
      online: 100,
      session: 5,
      server: {
        cpus: 2,
        active_connections: 50,
        wait_time: 500,
        cpu_load: 0.4,
        workers: [
          [
            "io",
            {
              time_to_return: 60000,
              wait_time: 600,
              workers: 3,
              waiting: 1,
              idle: 1,
              recently_blocked_keys: [["abc", 3, "2025-05-17T10:00:00Z"]],
              top_keys: [["3FG7RD4yF6", 0.08484051298914831]],
            },
          ],
        ],
      },
    },
  },
};

const mockStatusError = {
  error: true,
  message: "Failed to fetch",
};

describe("RegionCard", () => {
  it("renders error block when status contains error", () => {
    render(<RegionCard region="eu-west" status={mockStatusError} />);
    expect(screen.getByText("EU-WEST")).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
  });

  it("renders region and version details", () => {
    render(<RegionCard region="us-east" status={mockStatusOK} />);
    expect(screen.getByText("✅ OK")).toBeInTheDocument();
    expect(screen.getByText(/🌎 us-east/i)).toBeInTheDocument();
    expect(screen.getByText(/🔄 v2025.5.12/)).toBeInTheDocument();
  });

  it("renders Services and Performance sections", () => {
    render(<RegionCard region="us-east" status={mockStatusOK} />);
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("📊 Key Statistics")).toBeInTheDocument();
  });

  it("renders Blocked Keys and Worker Breakdown if available", () => {
    render(<RegionCard region="us-east" status={mockStatusOK} />);
    expect(screen.getByText("⚠️🔑 Blocked Keys")).toBeInTheDocument();
    expect(screen.getByText("🔑 Top Keys")).toBeInTheDocument();
    expect(screen.getByText("🔧 Worker Pool Details")).toBeInTheDocument();
  });

  it("displays slow response warning if time_to_return is high", () => {
    render(<RegionCard region="us-east" status={mockStatusOK} />);
    expect(screen.getByText(/🐌 Slow Response/)).toBeInTheDocument();
  });
});
