import { Routes, Route, NavLink } from "react-router-dom";
import Sidebar from "../components/worker/Sidebar";
import ProDashboard from "../pages/worker/DashboardPage";
import Profile from "../pages/worker/ProfilePage";
import EarningsPage from "../pages/worker/EarningsPage";
import PromotionPage from "../pages/worker/PromotionPage";
import PromPage from "../pages/worker/EarningsPage";
import JobsPage from "../pages/worker/JobPage";

export default function WorkerLayout() {

  return (
    <div className="min-h-screen bg-gray-50 flex p-6 gap-6">
      <Sidebar/>
      <div className="flex-1">
        <Routes>
          <Route path="dashboard" element={<ProDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="promotion" element={<PromotionPage />} />
          <Route path="earnings" element={<EarningsPage />} />
          {/* Default route redirect */}
          <Route path="*" element={<ProDashboard />} />
        </Routes>
      </div>
    </div>
  );
}
