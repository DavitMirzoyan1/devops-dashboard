import React from "react";

export type StatItemProps = {
  icon?: React.ElementType;
  label: string;
  value: string | number;
  highlight?: boolean;
  color?: string;
};

const StatItem: React.FC<StatItemProps> = ({
  icon,
  label,
  value,
  highlight,
  color,
}) => {
  return (
    <li
      style={{
        color: highlight ? "red" : "black",
        fontWeight: highlight ? "bold" : "normal",
        marginBottom: "0.4rem",
      }}
      data-testid={`icon-of-${label}`}
    >
      {icon &&
        React.createElement(icon, {
          size: 20,
          color: color || "black",
          style: { position: "relative", top: "2px" },
        })}{" "}
      {label}: <span style={{ fontWeight: 500 }}>{value}</span>
    </li>
  );
};

export default StatItem;
