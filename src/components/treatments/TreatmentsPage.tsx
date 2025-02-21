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

interface Treatment {
  id: string;
  patientName: string;
  doctorName: string;
  treatmentType: string;
  startDate: string;
  endDate: string;
  status: "ongoing" | "completed" | "scheduled";
  cost: number;
}

const defaultTreatments: Treatment[] = [
  {
    id: "1",
    patientName: "John Doe",
    doctorName: "Dr. Sarah Johnson",
    treatmentType: "Physical Therapy",
    startDate: "2024-03-15",
    endDate: "2024-04-15",
    status: "ongoing",
    cost: 1200,
  },
  {
    id: "2",
    patientName: "Jane Smith",
    doctorName: "Dr. Michael Chen",
    treatmentType: "Dental Surgery",
    startDate: "2024-03-20",
    endDate: "2024-03-20",
    status: "completed",
    cost: 2500,
  },
  {
    id: "3",
    patientName: "Robert Brown",
    doctorName: "Dr. Emily Brown",
    treatmentType: "Chemotherapy",
    startDate: "2024-04-01",
    endDate: "2024-07-01",
    status: "scheduled",
    cost: 5000,
  },
];

export default function TreatmentsPage() {
  const [treatments] = React.useState<Treatment[]>(defaultTreatments);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredTreatments = treatments.filter(
    (treatment) =>
      treatment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.treatmentType.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "ongoing":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Treatments</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Treatment
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by patient, doctor, or treatment type..."
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
              <TableHead>Treatment Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTreatments.map((treatment) => (
              <TableRow key={treatment.id}>
                <TableCell>{treatment.patientName}</TableCell>
                <TableCell>{treatment.doctorName}</TableCell>
                <TableCell>{treatment.treatmentType}</TableCell>
                <TableCell>{treatment.startDate}</TableCell>
                <TableCell>{treatment.endDate}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      treatment.status,
                    )}`}
                  >
                    {treatment.status}
                  </span>
                </TableCell>
                <TableCell>${treatment.cost.toLocaleString()}</TableCell>
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
          Showing {filteredTreatments.length} of {treatments.length} treatments
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
