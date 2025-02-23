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
  Plus,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import { FormDialog } from "./FormDialog";
import { useIndexedDB } from "@/lib/hooks/useIndexedDB";

interface BasePageProps {
  title: string;
  storeName: string;
  fields: Array<{
    name: string;
    label: string;
    type: string;
    options?: string[];
  }>;
  columns: Array<{
    header: string;
    accessor: string;
  }>;
}

export function BasePage({ title, storeName, fields, columns }: BasePageProps) {
  const { data, loading, error, addItem, updateItem, deleteItem } =
    useIndexedDB(storeName);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<any>(null);
  const itemsPerPage = 5;

  const handleAdd = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteItem(id);
    }
  };

  const handleSubmit = async (formData: any) => {
    if (editingItem) {
      await updateItem(editingItem.id, formData);
    } else {
      await addItem(formData);
    }
  };

  const filteredData = data.filter((item: any) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.accessor}>{column.header}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item: any) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={`${item.id}-${column.accessor}`}>
                    {item[column.accessor]}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => handleDelete(Number(item.id))}
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
          Showing {currentData.length} of {data.length} items
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingItem ? "Edit Item" : "Add New Item"}
        fields={fields}
        onSubmit={handleSubmit}
        initialData={editingItem}
      />
    </div>
  );
}
