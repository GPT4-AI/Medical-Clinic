import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  BarChart,
  PieChart,
  Activity,
  Clock,
  Target,
} from "lucide-react";

interface MetricData {
  id: string;
  label: string;
  value: number;
  unit: string;
  change: number;
}

interface MetricsDisplayProps {
  efficiency?: MetricData[];
  production?: MetricData[];
  quality?: MetricData[];
}

const MetricsDisplay = ({
  efficiency = defaultEfficiencyMetrics,
  production = defaultProductionMetrics,
  quality = defaultQualityMetrics,
}: MetricsDisplayProps) => {
  return (
    <Card className="w-full h-[400px] bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Production Metrics</h2>
          <div className="flex gap-2">
            <LineChart className="h-5 w-5 text-gray-500" />
            <BarChart className="h-5 w-5 text-gray-500" />
            <PieChart className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="efficiency" className="h-[300px]">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[250px]">
            <TabsContent value="efficiency" className="space-y-4">
              {efficiency.map((metric) => (
                <MetricCard
                  key={metric.id}
                  metric={metric}
                  icon={<Activity />}
                />
              ))}
            </TabsContent>

            <TabsContent value="production" className="space-y-4">
              {production.map((metric) => (
                <MetricCard key={metric.id} metric={metric} icon={<Clock />} />
              ))}
            </TabsContent>

            <TabsContent value="quality" className="space-y-4">
              {quality.map((metric) => (
                <MetricCard key={metric.id} metric={metric} icon={<Target />} />
              ))}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface MetricCardProps {
  metric: MetricData;
  icon: React.ReactNode;
}

const MetricCard = ({ metric, icon }: MetricCardProps) => {
  const isPositive = metric.change >= 0;
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">{icon}</span>
          <span className="font-medium">{metric.label}</span>
        </div>
        <span
          className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {isPositive ? "+" : ""}
          {metric.change}%
        </span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold">{metric.value}</span>
        <span className="text-sm text-gray-500 mb-1">{metric.unit}</span>
      </div>
      <Progress value={metric.value} className="mt-2" />
    </div>
  );
};

const defaultEfficiencyMetrics: MetricData[] = [
  {
    id: "1",
    label: "Overall Equipment Effectiveness",
    value: 85,
    unit: "%",
    change: 2.5,
  },
  { id: "2", label: "Machine Utilization", value: 92, unit: "%", change: -1.2 },
  { id: "3", label: "Energy Efficiency", value: 78, unit: "%", change: 4.7 },
];

const defaultProductionMetrics: MetricData[] = [
  { id: "1", label: "Units Per Hour", value: 120, unit: "units", change: 5.8 },
  { id: "2", label: "Total Output", value: 1450, unit: "units", change: 3.2 },
  { id: "3", label: "Cycle Time", value: 45, unit: "seconds", change: -2.1 },
];

const defaultQualityMetrics: MetricData[] = [
  { id: "1", label: "First Pass Yield", value: 95, unit: "%", change: 1.8 },
  { id: "2", label: "Defect Rate", value: 2.5, unit: "%", change: -0.5 },
  { id: "3", label: "Customer Returns", value: 0.8, unit: "%", change: -0.3 },
];

export default MetricsDisplay;
