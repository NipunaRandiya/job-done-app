import { NavLink } from "react-router-dom";
import { FiGrid, FiUser, FiCalendar, FiMessageSquare, FiDollarSign, FiLogOut } from "react-icons/fi";

const menuItems = [
  { id: "overview", label: "Dashboard", icon: <FiGrid />, path: "/worker/dashboard" },
  { id: "profile", label: "Profile", icon: <FiUser />, path: "/worker/profile" },
  { id: "jobs", label: "Jobs & Bookings", icon: <FiCalendar />, path: "/worker/jobs" },
  { id: "chat", label: "Promotion", icon: <FiMessageSquare />, path: "/worker/promotion" },
  { id: "earnings", label: "Earnings", icon: <FiDollarSign />, path: "/worker/earnings" },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-between">
  {/* Profile Header */}
  <div className="p-4 border-b border-gray-200">
    <div className="flex items-center space-x-3">
      <img
        src="https://placehold.co/40x40/E2E8F0/4A5568?text=J"
        alt="John Worker"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="font-semibold text-gray-800">John Worker</p>
        <p className="text-sm text-gray-500">
          <span className="text-yellow-500">★</span> 4.9 • Plumber
        </p>
      </div>
    </div>
  </div>

  {/* Menu */}
  <ul className="mt-6 space-y-2 flex-1">
    {menuItems.map((item) => (
      <li key={item.id}>
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <span className="text-lg">{item.icon}</span>
          {item.label}
        </NavLink>
      </li>
    ))}
  </ul>

  {/* Logout Button */}
  <div className="p-4 border-t border-gray-200">
    <button className="flex items-center w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
      <FiLogOut className="w-5 h-5 mr-3" />
      Logout
    </button>
  </div>
</div>

  );
}
