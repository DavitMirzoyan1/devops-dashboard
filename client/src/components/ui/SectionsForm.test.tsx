import { render, screen } from "@testing-library/react";
import SectionsForm from "./SectionsForm";
import { Cpu, MemoryStickIcon } from "lucide-react";

describe("SectionsForm", () => {
  const mockData = [
    {
      icon: Cpu,
      label: "CPU Load",
      value: "45%",
      color: "blue",
    },
    {
      icon: MemoryStickIcon,
      label: "Memory",
      value: "1.2GB",
      color: "red",
    },
  ];

  it("renders the section label", () => {
    render(<SectionsForm label="Performance" data={mockData} />);
    expect(screen.getByText("Performance")).toBeInTheDocument();
  });

  it("renders all StatItems", () => {
    render(<SectionsForm label="Performance" data={mockData} />);
    expect(screen.getByText(/CPU Load:/)).toBeInTheDocument();
    expect(screen.getByText(/Memory:/)).toBeInTheDocument();
    expect(screen.getByText("45%")).toBeInTheDocument();
    expect(screen.getByText("1.2GB")).toBeInTheDocument();
  });

  it("handles empty data properly", () => {
    render(<SectionsForm label="Empty" data={[]} />);
    expect(screen.getByText("Empty")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).toBeNull();
  });

  it("renders a horizontal line after the list", () => {
    render(<SectionsForm label="Divider Test" data={mockData} />);
    const hr = screen.getByRole("separator", { hidden: true });
    expect(hr).toBeInTheDocument();
  });
});
