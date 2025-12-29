import { Outlet } from "react-router-dom";

function CustomerLayout() {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
}
export default CustomerLayout