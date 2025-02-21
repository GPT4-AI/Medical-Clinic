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
  Download,
} from "lucide-react";

interface Payment {
  id: string;
  invoiceNumber: string;
  patientName: string;
  doctorName: string;
  date: string;
  amount: number;
  method: "cash" | "credit_card" | "debit_card" | "bank_transfer";
  status: "completed" | "pending" | "failed";
  reference: string;
}

const defaultPayments: Payment[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    patientName: "John Doe",
    doctorName: "Dr. Sarah Johnson",
    date: "2024-03-15",
    amount: 1500,
    method: "credit_card",
    status: "completed",
    reference: "TXN-123456",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    patientName: "Jane Smith",
    doctorName: "Dr. Michael Chen",
    date: "2024-03-10",
    amount: 2500,
    method: "bank_transfer",
    status: "pending",
    reference: "TXN-234567",
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003",
    patientName: "Robert Brown",
    doctorName: "Dr. Emily Brown",
    date: "2024-03-08",
    amount: 800,
    method: "cash",
    status: "completed",
    reference: "TXN-345678",
  },
];

export default function PaymentsPage() {
  const [payments] = React.useState<Payment[]>(defaultPayments);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredPayments = payments.filter(
    (payment) =>
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMethodLabel = (method: string) => {
    return method
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payments</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Payment
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by invoice number, patient name, or reference..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.invoiceNumber}</TableCell>
                <TableCell>{payment.patientName}</TableCell>
                <TableCell>{payment.doctorName}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>${payment.amount.toLocaleString()}</TableCell>
                <TableCell>{getMethodLabel(payment.method)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      payment.status,
                    )}`}
                  >
                    {payment.status}
                  </span>
                </TableCell>
                <TableCell>{payment.reference}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
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
          Showing {filteredPayments.length} of {payments.length} payments
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
