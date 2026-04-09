import { Routes, Route, NavLink } from "react-router-dom";
import Sidebar from "../components/worker/Sidebar";
import ProDashboard from "../pages/worker/DashboardPage";
import Profile from "../pages/worker/ProfilePage";
import EarningsPage from "../pages/worker/EarningsPage";
import PromotionPage from "../pages/worker/PromotionPage";
import SupportPage from "../pages/worker/SupportPage";
import JobsPage from "../pages/worker/JobPage";

export default function WorkerLayout() {

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="hidden md:block ">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">  
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Routes>
            <Route path="dashboard" element={<ProDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="promotion" element={<PromotionPage />} />
            <Route path="earnings" element={<EarningsPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="*" element={<ProDashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
