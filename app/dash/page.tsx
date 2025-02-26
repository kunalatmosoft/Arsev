"use client";

import { motion } from "framer-motion";
import {
  Menu,
  Home,
  BarChart2,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - visible on md and larger screens */}
      <aside className="hidden md:flex flex-col w-64 bg-black text-white p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Home className="h-8 w-8 text-cyan-400" />
          <span className="text-2xl font-bold">Ares Dashboard</span>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link href="/dashboard" className="flex items-center space-x-2 hover:text-cyan-400">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/dashboard/analytics" className="flex items-center space-x-2 hover:text-cyan-400">
            <BarChart2 className="h-5 w-5" />
            <span>Analytics</span>
          </Link>
          <Link href="/dashboard/users" className="flex items-center space-x-2 hover:text-cyan-400">
            <Users className="h-5 w-5" />
            <span>Users</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center space-x-2 hover:text-cyan-400">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>
        <div className="mt-auto pt-8">
          <Link href="/logout" className="flex items-center space-x-2 hover:text-cyan-400">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow">
          <div className="flex items-center space-x-4">
            {/* Mobile menu toggle (optional) */}
            <button className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none"
            />
            <img
              src="/avatar.png"
              alt="User Avatar"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Animated Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <BarChart2 className="h-6 w-6 text-cyan-400" />
                <span className="ml-2 text-gray-700 font-semibold">Total Sales</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold">$12,345</h2>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <Users className="h-6 w-6 text-violet-400" />
                <span className="ml-2 text-gray-700 font-semibold">Active Users</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold">1,234</h2>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <Settings className="h-6 w-6 text-cyan-400" />
                <span className="ml-2 text-gray-700 font-semibold">Server Uptime</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold">99.99%</h2>
            </div>
          </motion.div>

          {/* Chart Section (Placeholder) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white shadow rounded-lg p-6"
          >
            <h3 className="text-xl font-bold mb-4">Sales Overview</h3>
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">[Chart Placeholder]</span>
            </div>
          </motion.div>

          {/* Recent Activity Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white shadow rounded-lg p-6"
          >
            <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Activity</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2">2023-02-25</td>
                  <td className="py-2">User John Doe signed up</td>
                  <td className="py-2 text-green-500">Success</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">2023-02-24</td>
                  <td className="py-2">Payment processed for Invoice #1234</td>
                  <td className="py-2 text-green-500">Success</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">2023-02-23</td>
                  <td className="py-2">Server rebooted</td>
                  <td className="py-2 text-yellow-500">Warning</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
