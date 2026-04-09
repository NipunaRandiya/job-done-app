import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "./AdminLayout";
import RequireAdminAuth from "./RequireAdminAuth";


import DashboardOverview from "../pages/admin/DashboardOverview";
import WorkerVerification from "../pages/admin/WorkerVerification";
import MonitorWorkers from "../pages/admin/MonitorWorkers";
import FinanceIntelligence from "../pages/admin/FinanceOverview";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path="/"
        element={
          <RequireAdminAuth>
            <AdminLayout />
          </RequireAdminAuth>
        }
      >
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="verification" element={<WorkerVerification />} />
        <Route path="monitor" element={<MonitorWorkers />} />
        <Route path="finance" element={<FinanceIntelligence />} />
      </Route>
    </Routes>
  );
}
