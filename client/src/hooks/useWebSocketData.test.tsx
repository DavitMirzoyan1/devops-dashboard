import { renderHook, act } from "@testing-library/react";
import { useWebSocketData } from "./useWebSocketData";

class MockWebSocket {
  static instances: MockWebSocket[] = [];
  public onopen: () => void = () => {};
  public onmessage: (event: MessageEvent) => void = () => {};
  public onerror: (event: Event) => void = () => {};
  public onclose: () => void = () => {};
  public close = jest.fn();

  constructor(url: string) {
    MockWebSocket.instances.push(this);
  }

  simulateMessage(data: any) {
    this.onmessage({ data: JSON.stringify(data) } as MessageEvent);
  }

  simulateNotValidMessage() {
    this.onmessage({ data: "{not:valid" } as MessageEvent);
  }

  simulateError() {
    this.onerror(new Event("error"));
  }

  simulateClose() {
    this.onclose();
  }
}

global.WebSocket = MockWebSocket as any;

describe("useWebSocketData", () => {
  beforeEach(() => {
    MockWebSocket.instances = [];
  });

  it("connects and updates data and time on valid message", () => {
    const { result } = renderHook(() => useWebSocketData("ws://test"));
    const socket = MockWebSocket.instances[0];

    const mockPayload = {
      data: { region: "test" },
      lastUpdated: "2025-05-17T00:00:00Z",
    };

    act(() => {
      socket.onopen();
      socket.simulateMessage(mockPayload);
    });

    expect(result.current.data).toEqual({ region: "test" });
    expect(result.current.lastUpdated).toBe("2025-05-17T00:00:00Z");
    expect(result.current.wsError).toBe(false);
  });

  it("sets error on invalid message", () => {
    const { result } = renderHook(() => useWebSocketData("ws://test"));
    const socket = MockWebSocket.instances[0];

    act(() => {
      socket.simulateNotValidMessage();
    });

    expect(result.current.wsError).toBe(true);
  });

  it("sets error on WebSocket error event", () => {
    const { result } = renderHook(() => useWebSocketData("ws://test"));
    const socket = MockWebSocket.instances[0];

    act(() => {
      socket.simulateError();
    });

    expect(result.current.wsError).toBe(true);
  });

  it("sets error on WebSocket close event", () => {
    const { result } = renderHook(() => useWebSocketData("ws://test"));
    const socket = MockWebSocket.instances[0];

    act(() => {
      socket.simulateClose();
    });

    expect(result.current.wsError).toBe(true);
  });

  it("cleans up WebSocket on close", () => {
    const { unmount } = renderHook(() => useWebSocketData("ws://test"));
    const socket = MockWebSocket.instances[0];

    act(() => {
      unmount();
    });

    expect(socket.close).toHaveBeenCalled();
  });
});
