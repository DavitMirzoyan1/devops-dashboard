import { Activity, Clock, Cpu, Server, Signal, Users } from "lucide-react";

export function buildStatisticsData(stats: any, server: any) {
  if (!stats || !server) return [];

  return [
    {
      icon: Server,
      label: "Servers Count",
      value: stats.servers_count ?? "N/A",
      color: "#007bff",
    },
    {
      icon: Users,
      label: "Online Users",
      value: stats.online ?? "N/A",
      color: "gray",
    },
    {
      icon: Activity,
      label: "Active Sessions",
      value: stats.session ?? "N/A",
      color: "purple",
    },
    {
      icon: Cpu,
      label: "CPU Load",
      value: `${Math.round((server.cpu_load ?? 0) * 100)}%`,
      highlight: (server.cpu_load ?? 0) > 0.6,
      color: "red",
    },
    {
      icon: Signal,
      label: "Active Connections",
      value: server.active_connections ?? "N/A",
      color: "green",
    },
    {
      icon: Clock,
      label: "Average Wait Time",
      value: `${server.wait_time ?? 0}ms`,
      highlight: (server.wait_time ?? 0) > 1000,
      color: "orange"
    },
  ];
}
