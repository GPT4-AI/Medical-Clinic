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
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  phone: string;
  email: string;
  availability: string;
}

const defaultDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    experience: 10,
    phone: "(555) 123-4567",
    email: "sarah.johnson@clinic.com",
    availability: "Mon, Wed, Fri",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialization: "Pediatrics",
    experience: 8,
    phone: "(555) 234-5678",
    email: "michael.chen@clinic.com",
    availability: "Tue, Thu, Sat",
  },
  {
    id: "3",
    name: "Dr. Emily Brown",
    specialization: "Dermatology",
    experience: 12,
    phone: "(555) 345-6789",
    email: "emily.brown@clinic.com",
    availability: "Mon-Fri",
  },
];

export default function DoctorsPage() {
  const [doctors] = React.useState<Doctor[]>(defaultDoctors);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Doctors</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Doctor
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search doctors by name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Experience (Years)</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.experience}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.availability}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
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
          Showing {filteredDoctors.length} of {doctors.length} doctors
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
