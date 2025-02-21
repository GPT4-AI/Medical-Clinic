import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { MainLayout } from "./layouts/MainLayout";
import PatientsPage from "./components/patients/PatientsPage";
import DoctorsPage from "./components/doctors/DoctorsPage";
import AppointmentsPage from "./components/appointments/AppointmentsPage";
import ConsultationsPage from "./components/consultations/ConsultationsPage";
import TreatmentsPage from "./components/treatments/TreatmentsPage";
import InvoicesPage from "./components/invoices/InvoicesPage";
import PaymentsPage from "./components/payments/PaymentsPage";

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/consultations" element={<ConsultationsPage />} />
          <Route path="/treatments" element={<TreatmentsPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </MainLayout>
    </Suspense>
  );
}
