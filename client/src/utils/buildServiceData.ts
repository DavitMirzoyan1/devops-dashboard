import { CheckCircle, XCircle } from "lucide-react";

export function buildServicesData(services: any) {
    return [
      {
        icon: services?.redis ? CheckCircle : XCircle,
        label: "Redis",
        value: services?.redis ? "Healthy" : "Down",
        color: services?.redis ? "#00c853" : "#e53935"
      },
      {
        icon: services?.database ? CheckCircle : XCircle,
        label: "Database",
        value: services?.database ? "Healthy" : "Down",
        color: services?.database ? "#00c853" : "#e53935"
      },
    ];
  }
  