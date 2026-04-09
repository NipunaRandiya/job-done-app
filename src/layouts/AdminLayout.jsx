import AdminSidebar from "../components/admin/AdminSidebar"; // your existing sidebar
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="hidden md:block ">
        <AdminSidebar />
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden"> 
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
