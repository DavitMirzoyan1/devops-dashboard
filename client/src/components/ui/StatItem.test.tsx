import { render, screen } from "@testing-library/react";
import StatItem from "./StatItem";
import { Cpu } from "lucide-react";
import "@testing-library/jest-dom";

describe("StatItem", () => {
  it("renders label and value correctly", () => {
    render(<StatItem label="CPU Load" value="45%" />);
    expect(screen.getByText(/CPU Load:/)).toBeInTheDocument();
    expect(screen.getByText("45%"))?.toBeInTheDocument();
  });

  it("renders Lucide icon when passed as component", () => {
    render(<StatItem icon={Cpu} label="CPU Load" value="45%" />);
    const icon = screen.getByTestId("icon-of-CPU Load");
    expect(icon).toBeInTheDocument();
  });

  it("applies highlight styling when highlight is true", () => {
    render(<StatItem label="Wait Time" value="1200ms" highlight={true} />);
    const listItem = screen.getByText(/1200ms/).closest("li");
    expect(listItem).toHaveStyle("color: red");
    expect(listItem).toHaveStyle("font-weight: bold");
  });

  it("applies default styling when highlight is false", () => {
    render(<StatItem label="Wait Time" value="1200ms" highlight={false} />);
    const listItem = screen.getByText(/1200ms/).closest("li");
    expect(listItem).toHaveStyle("color: black");
    expect(listItem).toHaveStyle("font-weight: normal");
  });
});
