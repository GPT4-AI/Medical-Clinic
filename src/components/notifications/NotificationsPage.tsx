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
  Trash2,
  Eye,
  Bell,
  BellOff,
  Check,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "appointment" | "reminder" | "system" | "alert";
  priority: "high" | "medium" | "low";
  timestamp: string;
  status: "unread" | "read";
  recipient: string;
}

const defaultNotifications: Notification[] = [
  {
    id: "1",
    title: "New Appointment Request",
    message: "Dr. Sarah Johnson has a new appointment request from John Doe",
    type: "appointment",
    priority: "high",
    timestamp: "2024-03-20 09:30 AM",
    status: "unread",
    recipient: "Dr. Sarah Johnson",
  },
  {
    id: "2",
    title: "Medication Reminder",
    message: "Reminder to update prescription for patient Jane Smith",
    type: "reminder",
    priority: "medium",
    timestamp: "2024-03-20 10:15 AM",
    status: "read",
    recipient: "Dr. Michael Chen",
  },
  {
    id: "3",
    title: "System Maintenance",
    message: "System will undergo maintenance on Saturday at 2 AM",
    type: "system",
    priority: "low",
    timestamp: "2024-03-19 03:45 PM",
    status: "read",
    recipient: "All Staff",
  },
];

import { useIndexedDB } from "@/lib/hooks/useIndexedDB";

export default function NotificationsPage() {
  const {
    data: notifications,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
  } = useIndexedDB<Notification>("notifications");

  React.useEffect(() => {
    const initializeData = async () => {
      if (notifications.length === 0) {
        for (const notification of defaultNotifications) {
          await addItem(notification);
        }
      }
    };
    initializeData();
  }, []);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const handleMarkAllAsRead = async () => {
    try {
      await Promise.all(
        notifications
          .filter((n) => n.status === "unread")
          .map((n) => updateItem(Number(n.id), { status: "read" })),
      );
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  };

  const handleMuteAll = () => {
    // Implementation for muting all notifications
    alert("All notifications muted");
  };

  const handleViewNotification = async (id: string) => {
    try {
      await updateItem(Number(id), { status: "read" });
    } catch (err) {
      console.error("Error updating notification:", err);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteItem(Number(id));
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = filteredNotifications.slice(
    startIndex,
    endIndex,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.recipient.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 text-blue-800";
      case "reminder":
        return "bg-yellow-100 text-yellow-800";
      case "system":
        return "bg-purple-100 text-purple-800";
      case "alert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
          <Button variant="outline" onClick={handleMuteAll}>
            <BellOff className="h-4 w-4 mr-2" />
            Mute All
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search notifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentNotifications.map((notification) => (
              <TableRow
                key={notification.id}
                className={notification.status === "unread" ? "bg-gray-50" : ""}
              >
                <TableCell>
                  <Bell
                    className={`h-4 w-4 ${notification.status === "unread" ? "text-blue-500" : "text-gray-400"}`}
                  />
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                      notification.type,
                    )}`}
                  >
                    {notification.type}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      notification.priority,
                    )}`}
                  >
                    {notification.priority}
                  </span>
                </TableCell>
                <TableCell className="font-medium">
                  {notification.title}
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {notification.message}
                </TableCell>
                <TableCell>{notification.recipient}</TableCell>
                <TableCell>{notification.timestamp}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewNotification(notification.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => handleDeleteNotification(notification.id)}
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
          Showing {filteredNotifications.length} of {notifications.length}{" "}
          notifications
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
