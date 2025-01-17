import React, { useState, useEffect } from "react";
import { ArrowUpRight, Users, DollarSign, ShoppingCart, BarChart2, Bell, Settings, LogOut } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState(3);

  const salesData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 4500 },
    { name: "May", value: 6000 },
    { name: "Jun", value: 5500 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="p-2 bg-teal-100 rounded-lg">
          <Icon className="text-teal-600" size={24} />
        </div>
        <span className="text-green-500 flex items-center">
          {trend}% <ArrowUpRight size={16} />
        </span>
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-600">Kartik Vaghani</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell 
                className="text-gray-600 cursor-pointer hover:text-teal-600 transition-colors" 
                size={24} 
              />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </div>
            <Settings className="text-gray-600 cursor-pointer hover:text-teal-600 transition-colors" size={24} />
            <LogOut className="text-gray-600 cursor-pointer hover:text-red-600 transition-colors" size={24} />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Message */}
        <div className="mb-8 animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800">Welcome back, Admin!</h2>
          <p className="text-gray-600">Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slideUp">
          <StatCard title="Total Sales" value="$24,780" icon={DollarSign} trend={12} />
          <StatCard title="Total Customers" value="1,429" icon={Users} trend={8} />
          <StatCard title="New Orders" value="124" icon={ShoppingCart} trend={15} />
          <StatCard title="Revenue Growth" value="32%" icon={BarChart2} trend={24} />
        </div>

        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 animate-slideUp">
          <h3 className="text-xl font-bold mb-4">Sales Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0D9488" 
                  strokeWidth={2}
                  dot={{ stroke: '#0D9488', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-md animate-slideUp">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">New order #{1000 + item}</p>
                    <p className="text-sm text-gray-600">2 items - $199.99</p>
                  </div>
                  <span className="text-sm text-gray-500">2 mins ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;