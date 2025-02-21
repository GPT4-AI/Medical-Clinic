import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Package, PackagePlus, Truck } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  minThreshold: number;
  maxCapacity: number;
  status: "normal" | "low" | "critical";
  reorderStatus?: string;
}

interface InventoryPanelProps {
  items?: InventoryItem[];
}

const InventoryPanel = ({ items = defaultItems }: InventoryPanelProps) => {
  return (
    <Card className="w-full h-[400px] bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Inventory Status</CardTitle>
          <Badge variant="outline" className="bg-primary/10">
            {items.length} Items
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 overflow-auto max-h-[320px]">
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{item.name}</span>
              </div>
              <StockStatusBadge status={item.status} />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Current Stock</span>
                <span>
                  {item.currentStock} / {item.maxCapacity}
                </span>
              </div>
              <Progress
                value={(item.currentStock / item.maxCapacity) * 100}
                className={getProgressColor(item.status)}
              />
            </div>

            {item.reorderStatus && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {item.status === "critical" ? (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                ) : (
                  <Truck className="h-4 w-4" />
                )}
                <span>{item.reorderStatus}</span>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const StockStatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    normal: { color: "bg-green-500", text: "Normal" },
    low: { color: "bg-yellow-500", text: "Low Stock" },
    critical: { color: "bg-red-500", text: "Critical" },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <Badge variant="outline" className={`${config.color} text-white border-0`}>
      {config.text}
    </Badge>
  );
};

const getProgressColor = (status: string) => {
  switch (status) {
    case "critical":
      return "bg-red-500";
    case "low":
      return "bg-yellow-500";
    default:
      return "bg-green-500";
  }
};

const defaultItems: InventoryItem[] = [
  {
    id: "1",
    name: "Raw Material A",
    currentStock: 250,
    minThreshold: 200,
    maxCapacity: 1000,
    status: "normal",
  },
  {
    id: "2",
    name: "Component B",
    currentStock: 150,
    minThreshold: 300,
    maxCapacity: 800,
    status: "low",
    reorderStatus: "Reorder placed - ETA 2 days",
  },
  {
    id: "3",
    name: "Assembly Part C",
    currentStock: 50,
    minThreshold: 100,
    maxCapacity: 500,
    status: "critical",
    reorderStatus: "Urgent reorder required!",
  },
  {
    id: "4",
    name: "Packaging Material D",
    currentStock: 600,
    minThreshold: 400,
    maxCapacity: 1000,
    status: "normal",
  },
];

export default InventoryPanel;
