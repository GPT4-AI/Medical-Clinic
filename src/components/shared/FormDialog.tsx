import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Field {
  name: string;
  label: string;
  type: string;
  options?: string[];
}

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fields: Field[];
  onSubmit: (data: any) => void;
  initialData?: any;
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  fields,
  onSubmit,
  initialData = {},
}: FormDialogProps) {
  const [formData, setFormData] = React.useState(initialData);

  React.useEffect(() => {
    if (open) {
      setFormData(initialData);
    }
  }, [open, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              )}
            </div>
          ))}
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
