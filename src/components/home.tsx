import React from "react";
import ProductionLinesGrid from "./dashboard/ProductionLinesGrid";
import ScheduleTimeline from "./dashboard/ScheduleTimeline";
import InventoryPanel from "./dashboard/InventoryPanel";
import MetricsDisplay from "./dashboard/MetricsDisplay";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Production Management Dashboard</h1>

        <div className="grid grid-cols-1 gap-6">
          <ProductionLinesGrid />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ScheduleTimeline />
            </div>
            <div className="lg:col-span-1">
              <InventoryPanel />
            </div>
          </div>
          <MetricsDisplay />
        </div>
      </div>
    </div>
  );
};

export default Home;
