import { render, screen } from "@testing-library/react";
import App from "./App";
import * as WebSocketHook from "./hooks/useWebSocketData";

jest.mock("./hooks/useWebSocketData");

const mockUseWebSocketData = WebSocketHook as jest.Mocked<typeof WebSocketHook>;

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state when no data", () => {
    mockUseWebSocketData.useWebSocketData.mockReturnValue({
      data: null,
      lastUpdated: null,
      wsError: false,
    });

    render(<App />);
    expect(screen.getByText(/Loading data from server/)).toBeInTheDocument();
  });

  it("displays WebSocket error message if wsError is true", () => {
    mockUseWebSocketData.useWebSocketData.mockReturnValue({
      data: {},
      lastUpdated: null,
      wsError: true,
    });

    render(<App />);
    expect(
      screen.getByText(/WebSocket disconnected or failed to fetch/i)
    ).toBeInTheDocument();
  });

  it("renders RegionCard components for each region", () => {
    mockUseWebSocketData.useWebSocketData.mockReturnValue({
      data: {
        "us-east": {
          status: "ok",
          region: "us-east",
          version: "2025.5.12",
          results: {},
        },
        "eu-west": {
          status: "ok",
          region: "eu-west",
          version: "2025.5.12",
          results: {},
        },
      },
      lastUpdated: "2025-05-17T12:00:00Z",
      wsError: false,
    });

    render(<App />);
    expect(screen.getByText(/Server Region Dashboard/)).toBeInTheDocument();
    expect(screen.getByText(/us-east/i)).toBeInTheDocument();
    expect(screen.getByText(/eu-west/i)).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });
});
