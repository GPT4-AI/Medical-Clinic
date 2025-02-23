import { BasePage } from "../shared/BasePage";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "age", label: "Age", type: "number" },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
  },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "email", label: "Email", type: "email" },
  { name: "lastVisit", label: "Last Visit", type: "date" },
];

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Age", accessor: "age" },
  { header: "Gender", accessor: "gender" },
  { header: "Phone", accessor: "phone" },
  { header: "Email", accessor: "email" },
  { header: "Last Visit", accessor: "lastVisit" },
];

export default function PatientsPage() {
  return (
    <BasePage
      title="Patients"
      storeName="patients"
      fields={fields}
      columns={columns}
    />
  );
}
