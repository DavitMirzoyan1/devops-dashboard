
export function buildBlockedKeysData(ioWorker: any) {
    if (!ioWorker?.recently_blocked_keys?.length) return [];
  
    return ioWorker.recently_blocked_keys.map((key: any) => {
      return {
        label: key[0],
        value: `(${key[1]}x)`,
      };
    });
}

export function buildTopKeyStats(ioWorker: any) {
  if (!ioWorker?.top_keys?.length) return [];

  const sortedKeys = [...ioWorker.top_keys].sort((a, b) => b[1] - a[1]);

  return sortedKeys.map((key: any[]) => {
    return {
      label: `${key[0]}`,
      value: `${(key[1] * 100).toFixed(1)}%`,
    };
  });
}

export function buildWorkerPoolDetails(ioWorker: any) {
  if (!ioWorker) return [];

  const details = [
    {
      label: "Workers Busy",
      value: ioWorker.workers ?? "N/A",
    },
    {
      label: "Workers Idle",
      value: ioWorker.idle ?? "N/A",
    },
    {
      label: "Time to Return",
      value: `${ioWorker.time_to_return ?? 0}ms`,
      highlight: ioWorker.time_to_return > 50000,
    },
  ];

  return details;
}
