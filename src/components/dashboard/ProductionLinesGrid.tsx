import React from "react";
import ProductionLineCard from "./ProductionLineCard";

interface ProductionLine {
  id: string;
  name: string;
  status: "running" | "idle" | "issues";
  efficiency: number;
  currentProduct: string;
  timeElapsed: string;
}

interface ProductionLinesGridProps {
  lines?: ProductionLine[];
}

const ProductionLinesGrid = ({
  lines = [
    {
      id: "1",
      name: "Production Line A",
      status: "running",
      efficiency: 85,
      currentProduct: "Widget X-1000",
      timeElapsed: "2h 15m",
    },
    {
      id: "2",
      name: "Production Line B",
      status: "idle",
      efficiency: 0,
      currentProduct: "Gadget Y-2000",
      timeElapsed: "0h 45m",
    },
    {
      id: "3",
      name: "Production Line C",
      status: "issues",
      efficiency: 45,
      currentProduct: "Device Z-3000",
      timeElapsed: "1h 30m",
    },
    {
      id: "4",
      name: "Production Line D",
      status: "running",
      efficiency: 92,
      currentProduct: "Component W-4000",
      timeElapsed: "4h 20m",
    },
  ],
}: ProductionLinesGridProps) => {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Production Lines Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {lines.map((line) => (
          <ProductionLineCard
            key={line.id}
            name={line.name}
            status={line.status}
            efficiency={line.efficiency}
            currentProduct={line.currentProduct}
            timeElapsed={line.timeElapsed}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductionLinesGrid;
