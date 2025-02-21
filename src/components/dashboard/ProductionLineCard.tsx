import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock } from "lucide-react";

interface ProductionLineCardProps {
  name?: string;
  status?: "running" | "idle" | "issues";
  efficiency?: number;
  currentProduct?: string;
  timeElapsed?: string;
}

const ProductionLineCard = ({
  name = "Production Line",
  status = "running",
  efficiency = 85,
  currentProduct = "Widget X-1000",
  timeElapsed = "2h 15m",
}: ProductionLineCardProps) => {
  const statusColors = {
    running: "bg-green-500",
    idle: "bg-yellow-500",
    issues: "bg-red-500",
  };

  const statusText = {
    running: "Running",
    idle: "Idle",
    issues: "Issues",
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <Badge
            variant="outline"
            className={`${statusColors[status]} text-white border-0`}
          >
            {statusText[status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Efficiency</span>
              <span>{efficiency}%</span>
            </div>
            <Progress value={efficiency} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{currentProduct}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">{timeElapsed}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductionLineCard;
