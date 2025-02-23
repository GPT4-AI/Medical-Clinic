import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  Plus,
  Printer,
  Trash2,
  Eye,
  Calendar,
} from "lucide-react";

interface Schedule {
  id: string;
  doctorName: string;
  department: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  maxPatients: number;
  currentBookings: number;
  status: "available" | "fully-booked" | "off-duty";
}

const defaultSchedules: Schedule[] = [
  {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    department: "Cardiology",
    dayOfWeek: "Monday",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    maxPatients: 12,
    currentBookings: 8,
    status: "available",
  },
  {
    id: "2",
    doctorName: "Dr. Michael Chen",
    department: "Pediatrics",
    dayOfWeek: "Tuesday",
    startTime: "08:00 AM",
    endTime: "04:00 PM",
    maxPatients: 15,
    currentBookings: 15,
    status: "fully-booked",
  },
  {
    id: "3",
    doctorName: "Dr. Emily Brown",
    department: "Dermatology",
    dayOfWeek: "Wednesday",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    maxPatients: 10,
    currentBookings: 0,
    status: "off-duty",
  },
];

import { useIndexedDB } from "@/lib/hooks/useIndexedDB";

export default function SchedulesPage() {
  const {
    data: schedules,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
  } = useIndexedDB<Schedule>("schedules");

  React.useEffect(() => {
    const initializeData = async () => {
      if (schedules.length === 0) {
        for (const schedule of defaultSchedules) {
          await addItem(schedule);
        }
      }
    };
    initializeData();
  }, []);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const handleNewSchedule = async () => {
    const newSchedule: Partial<Schedule> = {
      doctorName: "New Doctor",
      department: "Department",
      dayOfWeek: "Monday",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      maxPatients: 10,
      currentBookings: 0,
      status: "available",
    };
    await addItem(newSchedule);
  };

  const handleViewSchedule = (id: string) => {
    alert(`Viewing schedule ${id}`);
  };

  const handleViewCalendar = (id: string) => {
    alert(`Opening calendar for schedule ${id}`);
  };

  const handleEditSchedule = (id: string) => {
    alert(`Editing schedule ${id}`);
  };

  const handleDeleteSchedule = async (id: string) => {
    await deleteItem(Number(id));
  };

  // Pagination
  const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSchedules = filteredSchedules.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.dayOfWeek.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "fully-booked":
        return "bg-yellow-100 text-yellow-800";
      case "off-duty":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAvailabilityText = (schedule: Schedule) => {
    if (schedule.status === "off-duty") return "Off Duty";
    return `${schedule.currentBookings}/${schedule.maxPatients} Slots`;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Schedules</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button onClick={handleNewSchedule}>
            <Plus className="h-4 w-4 mr-2" />
            New Schedule
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by doctor, department, or day..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentSchedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>{schedule.doctorName}</TableCell>
                <TableCell>{schedule.department}</TableCell>
                <TableCell>{schedule.dayOfWeek}</TableCell>
                <TableCell>{schedule.startTime}</TableCell>
                <TableCell>{schedule.endTime}</TableCell>
                <TableCell>{getAvailabilityText(schedule)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      schedule.status,
                    )}`}
                  >
                    {schedule.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewSchedule(schedule.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewCalendar(schedule.id)}
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditSchedule(schedule.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => handleDeleteSchedule(schedule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {filteredSchedules.length} of {schedules.length} schedules
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
