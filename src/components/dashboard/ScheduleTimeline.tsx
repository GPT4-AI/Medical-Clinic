import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Calendar, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

interface ScheduleItem {
  id: string;
  productName: string;
  startTime: string;
  duration: string;
  status: "scheduled" | "in-progress" | "completed";
}

interface ScheduleTimelineProps {
  items?: ScheduleItem[];
}

const ScheduleTimeline = ({ items = defaultItems }: ScheduleTimelineProps) => {
  return (
    <Card className="w-full h-[300px] bg-white dark:bg-gray-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Production Schedule</h2>
          </div>
          <Badge variant="outline">{items.length} Tasks</Badge>
        </div>

        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-move"
                whileHover={{ scale: 1.02 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
              >
                <GripVertical className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.productName}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span>{item.startTime}</span>
                    <span>Duration: {item.duration}</span>
                  </div>
                </div>
                <Badge
                  variant={
                    item.status === "completed" ? "default" : "secondary"
                  }
                  className={`${item.status === "in-progress" ? "bg-blue-500" : ""}`}
                >
                  {item.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const defaultItems: ScheduleItem[] = [
  {
    id: "1",
    productName: "Widget X-1000 Production",
    startTime: "08:00 AM",
    duration: "2h",
    status: "completed",
  },
  {
    id: "2",
    productName: "Assembly Line Y-2000",
    startTime: "10:30 AM",
    duration: "3h",
    status: "in-progress",
  },
  {
    id: "3",
    productName: "Component Z-3000 Manufacturing",
    startTime: "02:00 PM",
    duration: "4h",
    status: "scheduled",
  },
  {
    id: "4",
    productName: "Quality Testing Run",
    startTime: "04:30 PM",
    duration: "1.5h",
    status: "scheduled",
  },
];

export default ScheduleTimeline;
