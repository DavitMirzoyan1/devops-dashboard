import { useEffect, useState } from "react";

export function useWebSocketData(url: string) {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [wsError, setWsError] = useState<boolean>(false);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setWsError(false);
    };

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed.data);
      } catch (err) {
        setWsError(true);
      }
    };

    ws.onerror = (err) => {
      setWsError(true);
    };

    ws.onclose = () => {
      setWsError(true);
    };

    return () => ws.close();
  }, [url]);

  return { data, wsError };
}
