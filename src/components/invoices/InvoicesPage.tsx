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

interface Invoice {
  id: string;
  invoiceNumber: string;
  patientName: string;
  doctorName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  items: {
    description: string;
    quantity: number;
    price: number;
  }[];
}

const defaultInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    patientName: "John Doe",
    doctorName: "Dr. Sarah Johnson",
    date: "2024-03-15",
    dueDate: "2024-04-15",
    amount: 1500,
    status: "pending",
    items: [
      { description: "Consultation", quantity: 1, price: 200 },
      { description: "Treatment", quantity: 1, price: 1300 },
    ],
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    patientName: "Jane Smith",
    doctorName: "Dr. Michael Chen",
    date: "2024-03-10",
    dueDate: "2024-04-10",
    amount: 2500,
    status: "paid",
    items: [
      { description: "Surgery", quantity: 1, price: 2000 },
      { description: "Medication", quantity: 2, price: 250 },
    ],
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003",
    patientName: "Robert Brown",
    doctorName: "Dr. Emily Brown",
    date: "2024-02-15",
    dueDate: "2024-03-15",
    amount: 800,
    status: "overdue",
    items: [
      { description: "Follow-up", quantity: 1, price: 150 },
      { description: "Tests", quantity: 3, price: 650 },
    ],
  },
];

export default function InvoicesPage() {
  const [invoices] = React.useState<Invoice[]>(defaultInvoices);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.doctorName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by invoice number, patient, or doctor..."
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
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.patientName}</TableCell>
                <TableCell>{invoice.doctorName}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      invoice.status,
                    )}`}
                  >
                    {invoice.status}
                  </span>
                </TableCell>
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
          Showing {filteredInvoices.length} of {invoices.length} invoices
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
