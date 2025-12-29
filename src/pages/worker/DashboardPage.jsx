import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { FiMessageSquare, FiDollarSign, FiClock } from "react-icons/fi";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ProDashboard() {

  const navigate = useNavigate();
  //const [user, setUser] =  useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
      return;
    }

    // const fetchProfile = async () => {
    //   try {
    //     const res = await axios.get(`${apiBaseUrl}/workers/profile`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     setUser(res.data); 
    //   } catch (error) {
    //     console.error("Error fetching profile:", error);
    //     localStorage.removeItem("token"); 
    //     navigate("/login");
    //   }
    // };

    // fetchProfile();
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/workers/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        localStorage.removeItem("token"); 
        navigate("/login");
      }
    };

    fetchData();

  }, []);

  return (
    <div className="flex-1 p-8 bg-gray-50/50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Today's Snapshot</h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's your performance overview.
          </p>
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          <FiClock className="mr-2 text-gray-400" />
          Last updated:{" "}
          <span className="font-semibold text-gray-600 ml-1">Just now</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <p className="text-blue-800 font-medium">Active Jobs</p>
            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
              <FiClock className="text-blue-600" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 mt-4">{dashboardData?.activeJobs || 0}</p>
          <p className="text-sm text-green-600 mt-1">+2 from yesterday</p>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <p className="text-orange-800 font-medium">Pending Payments</p>
            <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">
              <FiDollarSign className="text-orange-600" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 mt-4">{dashboardData?.pendingPayments?.count || 0}</p>
          <p className="text-sm text-gray-500 mt-1">Rs. {dashboardData?.pendingPayments?.total} total</p>
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <p className="text-purple-800 font-medium">New Messages</p>
            <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
              <FiMessageSquare className="text-purple-600" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 mt-4">{dashboardData?.newMessages?.count}</p>
          <p className="text-sm text-red-500 mt-1">{dashboardData?.newMessages?.needResponse} need response</p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <p className="text-green-800 font-medium">Total Earnings</p>
            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
              <FiDollarSign className="text-green-600" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 mt-4">Rs. {dashboardData?.totalEarnings}</p>
          <p className="text-sm text-green-600 mt-1 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
            +12% from last month
          </p>
        </div>
      </div>

      {/* Performance & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
        {/* Performance Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Performance Overview
          </h2>
          <p className="text-sm text-gray-500">Job completion stats</p>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={dashboardData?.performance}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {dashboardData?.performance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {dashboardData?.performance.map((item) => (
              <div key={item.name} className="flex items-center">
                <span
                  className="w-2.5 h-2.5 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></span>
                {item.name}
                <span className="ml-auto font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Earnings Trend */}
        <div className="lg:col-span-3 bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Monthly Earnings Trend
          </h2>
          <p className="text-sm text-gray-500">Last 6 months revenue</p>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardData?.monthlyEarnings}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#3b82f6"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#3b82f6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#3b82f6"
                  fill="url(#colorEarnings)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
