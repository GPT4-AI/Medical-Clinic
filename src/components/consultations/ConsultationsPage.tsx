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
} from "lucide-react";

interface Consultation {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  diagnosis: string;
  status: "scheduled" | "in-progress" | "completed";
  notes: string;
}

const defaultConsultations: Consultation[] = [
  {
    id: "1",
    patientName: "John Doe",
    doctorName: "Dr. Sarah Johnson",
    date: "2024-03-20",
    time: "09:00 AM",
    type: "Initial Consultation",
    diagnosis: "Hypertension",
    status: "completed",
    notes: "Patient reported high blood pressure symptoms",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    doctorName: "Dr. Michael Chen",
    date: "2024-03-20",
    time: "10:30 AM",
    type: "Follow-up",
    diagnosis: "Diabetes Type 2",
    status: "in-progress",
    notes: "Regular check-up for blood sugar levels",
  },
  {
    id: "3",
    patientName: "Robert Brown",
    doctorName: "Dr. Emily Brown",
    date: "2024-03-21",
    time: "02:00 PM",
    type: "Specialist Consultation",
    diagnosis: "Pending",
    status: "scheduled",
    notes: "Referred by primary care physician",
  },
];

export default function ConsultationsPage() {
  const [consultations] = React.useState<Consultation[]>(defaultConsultations);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredConsultations = consultations.filter(
    (consultation) =>
      consultation.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      consultation.doctorName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      consultation.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Consultations</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Consultation
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by patient, doctor, or diagnosis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConsultations.map((consultation) => (
              <TableRow key={consultation.id}>
                <TableCell>{consultation.patientName}</TableCell>
                <TableCell>{consultation.doctorName}</TableCell>
                <TableCell>{consultation.date}</TableCell>
                <TableCell>{consultation.time}</TableCell>
                <TableCell>{consultation.type}</TableCell>
                <TableCell>{consultation.diagnosis}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      consultation.status,
                    )}`}
                  >
                    {consultation.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
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
          Showing {filteredConsultations.length} of {consultations.length}
          consultations
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    case "scheduled":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
