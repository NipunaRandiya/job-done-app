import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FaStar, FaSearch, FaFilter } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs'; // 'More' icon

const thisMonthData = {
  earnings: 3283.0,
  hoursCommit: 112,
  earningsGoalAchieved: 108, 
  clients: 7,
};

const chartData = [
  { name: 'Jul', Earnings: 3500, Goal: 3200, Clients: 6 },
  { name: 'Aug', Earnings: 3800, Goal: 3300, Clients: 7 },
  { name: 'Sep', Earnings: 3600, Goal: 3100, Clients: 6 },
  { name: 'Oct', Earnings: 4100, Goal: 3500, Clients: 8 },
  { name: 'Nov', Earnings: 3000, Goal: 3400, Clients: 7 },
  { name: 'Dec', 'Earnings goal achieved': 2100, Clients: 4 },
  { name: 'Jan', 'Earnings goal achieved': 2500, Clients: 5 },
  { name: 'Feb', Earnings: 4000, Goal: 3600, Clients: 8 },
  { name: 'Mar', Earnings: 4200, Goal: 3700, Clients: 9 },
  { name: 'Apr', Earnings: 3500, Goal: 3000, Clients: 7 },
];

const tasksHistory = [
  {
    clientName: 'Wegogo',
    type: 'Transportation',
    hours: 20,
    earnings: 400.0,
    added: 'Mar 16 2020',
    finished: 'Mar 26 2020',
    starred: true,
  },
  {
    clientName: 'Instasurf',
    type: 'Dining',
    hours: 10,
    earnings: 100.0,
    added: 'Mar 10 2020',
    finished: 'Mar 20 2020',
    starred: false,
  },
  {
    clientName: 'Hey',
    type: 'Marketing',
    hours: 20,
    earnings: 400.0,
    added: 'Mar 8 2020',
    finished: 'Mar 22 2020',
    starred: false,
  },
];

// --- Custom Recharts Tooltip ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md text-sm rounded-md">
        <p className="font-semibold text-gray-700">{label}</p>
        {payload.map((p, index) => (
          <p key={index} style={{ color: p.color }}>
            {`${p.dataKey}: Rs ${p.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// --- Main Component ---
export default function EarningsPage() {
  return (
    <div className="flex-1 p-8 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Earnings</h1>
        <p className="text-gray-500 mt-1">
          Update your professional profile and grow your business.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-8">
        {/* 1. Top Section: Summary & Chart */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* A. This Month Summary Card */}
          <div className="w-full lg:w-1/3 p-6 bg-white rounded-xl shadow-lg border border-gray-100 h-fit">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">This Month</h2>
            <div className="grid grid-cols-2 gap-y-6">
              <div className="col-span-1">
                <p className="text-sm text-gray-500">Earnings</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  Rs {thisMonthData.earnings.toLocaleString()}
                </p>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-gray-500">Hours commit</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {thisMonthData.hoursCommit}
                </p>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-gray-500">Earnings goal achieved</p>
                <p
                  className={`text-3xl font-bold mt-1 ${
                    thisMonthData.earningsGoalAchieved >= 100
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {thisMonthData.earningsGoalAchieved}%
                </p>
              </div>
              <div className="col-span-1">
                <p className="text-sm text-gray-500">Clients</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {thisMonthData.clients}
                </p>
              </div>
            </div>
          </div>

          {/* B. Earnings Bar Chart */}
          <div className="w-full lg:w-2/3 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-sm font-medium text-gray-500 mb-4">
              May 2019 - April 2020
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `Rs ${value/1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="square"
                    wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
                  />
                  <Bar
                    dataKey="Earnings"
                    fill="#3b82f6"
                    barSize={10}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Earnings goal achieved"
                    fill="#10b981"
                    barSize={10}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Goal"
                    fill="#10b981"
                    barSize={10}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 2. Tasks History Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Tasks History
          </h2>

          {/* Table Header/Filter */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Type to search"
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>
              <button className="flex items-center space-x-1 p-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                <FaFilter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th></th>
                  <th>Client name</th>
                  <th>Type</th>
                  <th>Hours</th>
                  <th>Earnings</th>
                  <th>Added</th>
                  <th>Finished</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasksHistory.map((task, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <FaStar
                        className={`w-5 h-5 cursor-pointer transition-colors ${
                          task.starred
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 hover:text-yellow-300 hover:fill-yellow-300'
                        }`}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {task.clientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.hours}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rs {task.earnings.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.added}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.finished}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <BsThreeDotsVertical className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
