import React from "react";
import StatItem, { StatItemProps } from "./StatItem";

type Props = {
  label: string;
  data: StatItemProps[];
};

const SectionsForm: React.FC<Props> = ({ label, data }) => {
  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <strong>{label}</strong>
      <ul style={{ marginTop: "0.4rem", paddingLeft: "1rem" }}>
        {data.map((item: StatItemProps, i: number) => (
          <StatItem
            key={i}
            icon={item?.icon}
            label={item.label}
            value={item.value}
            highlight={item?.highlight}
            color={item?.color}
          />
        ))}
      </ul>
      <hr
        style={{
          margin: "1rem 0",
          border: "none",
          borderTop: "2px solid #ccc",
        }}
        role="separator"
      />
    </div>
  );
};

export default SectionsForm;
