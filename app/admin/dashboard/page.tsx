"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Bell,
  Calendar,
  BarChartIcon as ChartBar,
  ChevronDown,
  Download,
  FileText,
  Home,
  LogOut,
  Menu,
  PieChart,
  Search,
  Settings,
  User,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminDashboard() {
  const [showLeaveDetailsDialog, setShowLeaveDetailsDialog] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      student: "Alex Johnson",
      class: "10A",
      type: "Medical Leave",
      startDate: "2025-03-15",
      endDate: "2025-03-17",
      status: "pending",
      reason: "Doctor's appointment and recovery",
    },
    {
      id: 2,
      student: "Emma Davis",
      class: "11B",
      type: "Family Event",
      startDate: "2025-04-10",
      endDate: "2025-04-12",
      status: "pending",
      reason: "Sister's wedding ceremony",
    },
    {
      id: 3,
      student: "Michael Brown",
      class: "9C",
      type: "Sports Competition",
      startDate: "2025-03-20",
      endDate: "2025-03-22",
      status: "approved",
      reason: "Regional basketball tournament",
    },
    {
      id: 4,
      student: "Sophia Wilson",
      class: "12A",
      type: "Medical Leave",
      startDate: "2025-03-05",
      endDate: "2025-03-07",
      status: "rejected",
      reason: "Dental procedure",
    },
  ])
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New leave request from Alex Johnson requires your approval",
      time: "2 hours ago",
      read: false,
      type: "pending",
    },
    {
      id: 2,
      message: "Monthly leave report for March is ready to download",
      time: "Yesterday",
      read: false,
      type: "report",
    },
    {
      id: 3,
      message: "System update completed successfully",
      time: "3 days ago",
      read: true,
      type: "system",
    },
  ])

  // Mock admin data
  const admin = {
    name: "Dr. Sarah Williams",
    role: "Principal",
  }

  // Mock statistics
  const pendingRequests = 5
  const approvedRequests = 12
  const rejectedRequests = 3

  // Mock analytics data
  const analyticsData = {
    leaveTypes: [
      { type: "Medical", count: 45, color: "#22c55e" },
      { type: "Family", count: 30, color: "#3b82f6" },
      { type: "Sports", count: 15, color: "#f59e0b" },
      { type: "Other", count: 10, color: "#8b5cf6" },
    ],
    monthlyTrends: [
      { month: "Jan", count: 12 },
      { month: "Feb", count: 15 },
      { month: "Mar", count: 20 },
      { month: "Apr", count: 18 },
      { month: "May", count: 25 },
      { month: "Jun", count: 22 },
      { month: "Jul", count: 18 },
      { month: "Aug", count: 15 },
      { month: "Sep", count: 20 },
      { month: "Oct", count: 22 },
      { month: "Nov", count: 28 },
      { month: "Dec", count: 30 },
    ],
    classTrends: [
      { class: "9A", count: 15 },
      { class: "9B", count: 12 },
      { class: "10A", count: 18 },
      { class: "10B", count: 20 },
      { class: "11A", count: 25 },
      { class: "11B", count: 22 },
      { class: "12A", count: 28 },
      { class: "12B", count: 30 },
    ],
  }

  const handleApprove = (id: number) => {
    // Update the status in the leave requests
    setLeaveRequests((prev) => prev.map((leave) => (leave.id === id ? { ...leave, status: "approved" } : leave)))

    // Add notification
    const approvedLeave = leaveRequests.find((leave) => leave.id === id)
    if (approvedLeave) {
      const newNotification = {
        id: notifications.length + 1,
        message: `You approved ${approvedLeave.student}'s leave request`,
        time: "Just now",
        read: false,
        type: "pending",
      }

      setNotifications((prev) => [newNotification, ...prev])
    }

    // Close dialog first, then show alert
    setShowLeaveDetailsDialog(false)
    setTimeout(() => {
      alert(`Leave request #${id} approved!`)
    }, 100)
  }

  const handleReject = (id: number) => {
    // Update the status in the leave requests
    setLeaveRequests((prev) => prev.map((leave) => (leave.id === id ? { ...leave, status: "rejected" } : leave)))

    // Add notification
    const rejectedLeave = leaveRequests.find((leave) => leave.id === id)
    if (rejectedLeave) {
      const newNotification = {
        id: notifications.length + 1,
        message: `You rejected ${rejectedLeave.student}'s leave request`,
        time: "Just now",
        read: false,
        type: "pending",
      }

      setNotifications((prev) => [newNotification, ...prev])
    }

    // Close dialog first, then show alert
    setShowLeaveDetailsDialog(false)
    setTimeout(() => {
      alert(`Leave request #${id} rejected!`)
    }, 100)
  }

  const generateReport = (type: string) => {
    // In a real app, this would generate and download a report
    const newNotification = {
      id: notifications.length + 1,
      message: `${type} report has been generated and is ready for download`,
      time: "Just now",
      read: false,
      type: "report",
    }

    setNotifications((prev) => [newNotification, ...prev])
    setShowReportDialog(false)

    alert(`${type} report generated successfully!`)
  }

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const handleViewDetails = (leave: any) => {
    setSelectedLeave(leave)
    setShowLeaveDetailsDialog(true)
  }

  return (
    <div className="min-h-screen bg-[#3b1c6a] flex flex-col">
      {/* Header */}
      <header className="bg-[#4e2a85] py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center">
          <button className="md:hidden mr-4 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link href="/" className="text-white hover:text-[#ffd84d] mr-4">
            <Home size={18} />
            <span className="sr-only">Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">School Leave</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="text-white p-2 rounded-full hover:bg-[#5d3a96] relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#ffd84d] rounded-full"></span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#4e2a85] border border-[#5d3a96] rounded-xl shadow-lg z-50 overflow-hidden">
                <div className="p-3 border-b border-[#5d3a96] flex justify-between items-center">
                  <h3 className="text-white font-medium">Notifications</h3>
                  <button className="text-purple-200 text-sm hover:text-white" onClick={markAllAsRead}>
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-[#5d3a96] hover:bg-[#5d3a96] transition-colors ${notification.read ? "opacity-70" : ""}`}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
                          ${
                            notification.type === "pending"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : notification.type === "report"
                                ? "bg-blue-500/20 text-blue-500"
                                : "bg-green-500/20 text-green-500"
                          }`}
                        >
                          {notification.type === "pending" ? (
                            <FileText size={16} />
                          ) : notification.type === "report" ? (
                            <Download size={16} />
                          ) : (
                            <Settings size={16} />
                          )}
                        </div>
                        <div>
                          <p className="text-white text-sm">{notification.message}</p>
                          <p className="text-purple-200 text-xs mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center">
                  <button
                    className="text-[#ffd84d] text-sm hover:underline"
                    onClick={() => setShowNotifications(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="text-white p-2 rounded-full hover:bg-[#5d3a96]"
                  onClick={() => setShowReportDialog(true)}
                >
                  <Download size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Generate Reports</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <button className="text-white p-2 rounded-full hover:bg-[#5d3a96]">
            <Settings size={20} />
          </button>

          <div className="hidden md:flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt={admin.name} />
              <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">
                {admin.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <span className="text-white">{admin.name}</span>
              <ChevronDown size={16} className="text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Mobile */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-64 h-full bg-[#4e2a85] p-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#5d3a96]">
                <div className="w-10 h-10 rounded-full bg-[#ffd84d] flex items-center justify-center text-[#3b1c6a]">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">{admin.name}</p>
                  <p className="text-purple-200 text-sm">{admin.role}</p>
                </div>
              </div>
              <nav className="space-y-2">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#5d3a96] text-white"
                >
                  <Home size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/admin/leaves"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                >
                  <FileText size={18} />
                  <span>Leave Requests</span>
                </Link>
                <Link
                  href="/admin/users"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                >
                  <Users size={18} />
                  <span>Users</span>
                </Link>
                <Link
                  href="/admin/reports"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                >
                  <Calendar size={18} />
                  <span>Reports</span>
                </Link>
              </nav>
              <div className="absolute bottom-4 w-full pr-8">
                <Link
                  href="/logout"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-[#4e2a85] p-4">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#5d3a96]">
            <div className="w-10 h-10 rounded-full bg-[#ffd84d] flex items-center justify-center text-[#3b1c6a]">
              <User size={20} />
            </div>
            <div>
              <p className="text-white font-medium">{admin.name}</p>
              <p className="text-purple-200 text-sm">{admin.role}</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#5d3a96] text-white"
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/leaves"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
            >
              <FileText size={18} />
              <span>Leave Requests</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
            >
              <Users size={18} />
              <span>Users</span>
            </Link>
            <Link
              href="/admin/reports"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
            >
              <Calendar size={18} />
              <span>Reports</span>
            </Link>
          </nav>
          <div className="absolute bottom-4">
            <Link href="/logout" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]">
              <LogOut size={18} />
              <span>Logout</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            {/* Welcome Banner */}
            <div className="bg-[#4e2a85] p-6 rounded-xl mb-8 relative overflow-hidden group">
              <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#ffd84d] opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2">Welcome, {admin.name}!</h2>
                <p className="text-purple-200">
                  Manage leave requests, generate reports, and configure system settings.
                </p>
              </div>
            </div>

            {/* Tabs Navigation */}
            <Tabs defaultValue="dashboard" className="mb-8" onValueChange={setActiveTab}>
              <TabsList className="bg-[#4e2a85] border border-[#5d3a96] p-1 w-full">
                <TabsTrigger
                  value="dashboard"
                  className="flex-1 data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="requests"
                  className="flex-1 data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
                >
                  Leave Requests
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="flex-1 data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="flex-1 data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
                >
                  Reports
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-[#4e2a85] border-[#5d3a96] hover:shadow-lg hover:shadow-purple-900/20 transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-clock mr-2 text-yellow-500"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        Pending Requests
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-[#ffd84d]">{pendingRequests}</div>
                      <p className="text-purple-200 text-sm mt-1">Awaiting your approval</p>
                      <div className="mt-4 h-1 bg-[#3b1c6a] rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#4e2a85] border-[#5d3a96] hover:shadow-lg hover:shadow-purple-900/20 transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-check-circle mr-2 text-green-500"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        Approved Requests
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-400">{approvedRequests}</div>
                      <p className="text-purple-200 text-sm mt-1">This month</p>
                      <div className="mt-4 h-1 bg-[#3b1c6a] rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#4e2a85] border-[#5d3a96] hover:shadow-lg hover:shadow-purple-900/20 transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-x-circle mr-2 text-red-500"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" x2="9" y1="9" y2="15" />
                          <line x1="9" x2="15" y1="9" y2="15" />
                        </svg>
                        Rejected Requests
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-400">{rejectedRequests}</div>
                      <p className="text-purple-200 text-sm mt-1">This month</p>
                      <div className="mt-4 h-1 bg-[#3b1c6a] rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Activity Summary */}
                <div className="bg-[#4e2a85] rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-activity mr-2 text-[#ffd84d]"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    Recent Activity
                  </h3>

                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 flex-shrink-0 mt-1">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-white font-medium">New Leave Request</p>
                        <p className="text-purple-200 text-sm">Alex Johnson has submitted a medical leave request.</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-400 text-red-400 hover:bg-red-500/20"
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-300 text-purple-300 hover:bg-[#5d3a96] hover:text-white"
                          >
                            View Details
                          </Button>
                        </div>
                        <p className="text-purple-200 text-xs mt-2">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0 mt-1">
                        <Download size={18} />
                      </div>
                      <div>
                        <p className="text-white font-medium">Monthly Report Generated</p>
                        <p className="text-purple-200 text-sm">March 2025 leave report is ready for download.</p>
                        <Button size="sm" className="mt-2 bg-[#5d3a96] hover:bg-[#6d4aa6] text-white">
                          <Download size={14} className="mr-1" />
                          Download Report
                        </Button>
                        <p className="text-purple-200 text-xs mt-2">Yesterday</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 flex-shrink-0 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-check"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">Leave Request Approved</p>
                        <p className="text-purple-200 text-sm">
                          You approved Michael Brown's sports competition leave request.
                        </p>
                        <p className="text-purple-200 text-xs mt-2">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-[#4e2a85] rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <PieChart size={20} className="mr-2 text-[#ffd84d]" />
                      Leave Types Distribution
                    </h3>
                    <div className="flex items-center justify-center h-48">
                      <div className="relative w-32 h-32">
                        {analyticsData.leaveTypes.map((item, index) => {
                          const total = analyticsData.leaveTypes.reduce((sum, i) => sum + i.count, 0)
                          const startAngle =
                            index === 0
                              ? 0
                              : (analyticsData.leaveTypes.slice(0, index).reduce((sum, i) => sum + i.count, 0) /
                                  total) *
                                360
                          const endAngle = startAngle + (item.count / total) * 360

                          return (
                            <div
                              key={index}
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: `conic-gradient(transparent ${startAngle}deg, ${item.color} ${startAngle}deg, ${item.color} ${endAngle}deg, transparent ${endAngle}deg)`,
                              }}
                            />
                          )
                        })}
                        <div className="absolute inset-4 bg-[#4e2a85] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {analyticsData.leaveTypes.reduce((sum, i) => sum + i.count, 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {analyticsData.leaveTypes.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-purple-200 text-sm">
                            {item.type}: {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#4e2a85] rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <ChartBar size={20} className="mr-2 text-[#ffd84d]" />
                      Monthly Trends
                    </h3>
                    <div className="h-48 flex items-end gap-1">
                      {analyticsData.monthlyTrends.map((item, index) => {
                        const maxCount = Math.max(...analyticsData.monthlyTrends.map((i) => i.count))
                        const height = (item.count / maxCount) * 100

                        return (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-[#ffd84d] rounded-t-sm hover:bg-[#ffce1f] transition-colors cursor-pointer"
                              style={{ height: `${height}%` }}
                            ></div>
                            <span className="text-purple-200 text-xs mt-1">{item.month}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Leave Requests Table */}
                <div className="bg-[#4e2a85] rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Recent Leave Requests</h3>
                    <Button
                      className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]"
                      onClick={() => setActiveTab("requests")}
                    >
                      View All
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#5d3a96]">
                          <th className="text-left py-3 px-4 text-purple-200 font-medium">Student</th>
                          <th className="text-left py-3 px-4 text-purple-200 font-medium">Class</th>
                          <th className="text-left py-3 px-4 text-purple-200 font-medium">Type</th>
                          <th className="text-left py-3 px-4 text-purple-200 font-medium">Dates</th>
                          <th className="text-left py-3 px-4 text-purple-200 font-medium">Status</th>
                          <th className="text-right py-3 px-4 text-purple-200 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaveRequests.slice(0, 3).map((leave) => (
                          <tr key={leave.id} className="border-b border-[#5d3a96] hover:bg-[#5d3a96] transition-colors">
                            <td className="py-3 px-4 text-white">{leave.student}</td>
                            <td className="py-3 px-4 text-white">{leave.class}</td>
                            <td className="py-3 px-4 text-white">{leave.type}</td>
                            <td className="py-3 px-4 text-white">
                              {new Date(leave.startDate).toLocaleDateString()} -{" "}
                              {new Date(leave.endDate).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  leave.status === "pending"
                                    ? "bg-yellow-500 text-white"
                                    : leave.status === "approved"
                                      ? "bg-green-500 text-white"
                                      : "bg-red-500 text-white"
                                }`}
                              >
                                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-purple-300 text-purple-300 hover:bg-[#5d3a96] hover:text-white"
                                onClick={() => handleViewDetails(leave)}
                              >
                                Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="requests" className="mt-6">
                <div className="bg-[#4e2a85] rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">All Leave Requests</h3>
                    <div className="relative">
                      <Input
                        placeholder="Search requests..."
                        className="w-64 bg-[#3b1c6a] border-[#5d3a96] text-white placeholder:text-purple-300 pl-10"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300" size={16} />
                    </div>
                  </div>

                  <div className="mb-6">
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="bg-[#3b1c6a] border border-[#5d3a96] p-1">
                        <TabsTrigger
                          value="all"
                          className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
                        >
                          All Requests
                        </TabsTrigger>
                        <TabsTrigger
                          value="pending"
                          className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
                        >
                          Pending
                        </TabsTrigger>
                        <TabsTrigger
                          value="approved"
                          className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
                        >
                          Approved
                        </TabsTrigger>
                        <TabsTrigger
                          value="rejected"
                          className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
                        >
                          Rejected
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#5d3a96]">
                          <th className="text-left py-3 px-4 text-purple-200 font-medium">Student</th>
                          <th className="text-left py-3 px-4 text-purple-200 font-medium">Class</th>
                          <th className="text-left py-3 px-4 text-purple-200 font-medium">Type</th>
                          <th className="text-left py-3 px-4 text-purple-200 font-medium">Dates</th>
                          <th className="text-left py-3 px-4 text-purple-200 font-medium">Status</th>
                          <th className="text-right py-3 px-4 text-purple-200 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaveRequests.map((leave) => (
                          <tr key={leave.id} className="border-b border-[#5d3a96] hover:bg-[#5d3a96] transition-colors">
                            <td className="py-3 px-4 text-white">{leave.student}</td>
                            <td className="py-3 px-4 text-white">{leave.class}</td>
                            <td className="py-3 px-4 text-white">{leave.type}</td>
                            <td className="py-3 px-4 text-white">
                              {new Date(leave.startDate).toLocaleDateString()} -{" "}
                              {new Date(leave.endDate).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  leave.status === "pending"
                                    ? "bg-yellow-500 text-white"
                                    : leave.status === "approved"
                                      ? "bg-green-500 text-white"
                                      : "bg-red-500 text-white"
                                }`}
                              >
                                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2 border-purple-300 text-purple-300 hover:bg-[#5d3a96] hover:text-white"
                                onClick={() => handleViewDetails(leave)}
                              >
                                Details
                              </Button>
                              {leave.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    className="mr-2 bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => handleApprove(leave.id)}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-red-400 text-red-400 hover:bg-red-500/20 hover:text-red-400"
                                    onClick={() => handleReject(leave.id)}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-[#4e2a85] rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <PieChart size={20} className="mr-2 text-[#ffd84d]" />
                      Leave Types Distribution
                    </h3>
                    <div className="flex items-center justify-center h-48">
                      <div className="relative w-32 h-32">
                        {analyticsData.leaveTypes.map((item, index) => {
                          const total = analyticsData.leaveTypes.reduce((sum, i) => sum + i.count, 0)
                          const startAngle =
                            index === 0
                              ? 0
                              : (analyticsData.leaveTypes.slice(0, index).reduce((sum, i) => sum + i.count, 0) /
                                  total) *
                                360
                          const endAngle = startAngle + (item.count / total) * 360

                          return (
                            <div
                              key={index}
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: `conic-gradient(transparent ${startAngle}deg, ${item.color} ${startAngle}deg, ${item.color} ${endAngle}deg, transparent ${endAngle}deg)`,
                              }}
                            />
                          )
                        })}
                        <div className="absolute inset-4 bg-[#4e2a85] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {analyticsData.leaveTypes.reduce((sum, i) => sum + i.count, 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {analyticsData.leaveTypes.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-purple-200 text-sm">
                            {item.type}: {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#4e2a85] rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <ChartBar size={20} className="mr-2 text-[#ffd84d]" />
                      Monthly Trends
                    </h3>
                    <div className="h-48 flex items-end gap-1">
                      {analyticsData.monthlyTrends.map((item, index) => {
                        const maxCount = Math.max(...analyticsData.monthlyTrends.map((i) => i.count))
                        const height = (item.count / maxCount) * 100

                        return (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-[#ffd84d] rounded-t-sm hover:bg-[#ffce1f] transition-colors cursor-pointer"
                              style={{ height: `${height}%` }}
                            ></div>
                            <span className="text-purple-200 text-xs mt-1">{item.month}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-[#4e2a85] rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Users size={20} className="mr-2 text-[#ffd84d]" />
                    Leave Requests by Class
                  </h3>
                  <div className="h-64 flex items-end gap-4">
                    {analyticsData.classTrends.map((item, index) => {
                      const maxCount = Math.max(...analyticsData.classTrends.map((i) => i.count))
                      const height = (item.count / maxCount) * 100

                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-[#5d3a96] rounded-t-sm hover:bg-[#6d4aa6] transition-colors cursor-pointer relative group"
                            style={{ height: `${height}%` }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#3b1c6a] text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {item.count} requests
                            </div>
                          </div>
                          <span className="text-purple-200 text-sm mt-2 font-medium">{item.class}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="mt-6">
                <div className="bg-[#4e2a85] rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Generate Reports</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#5d3a96] p-4 rounded-lg hover:bg-[#6d4aa6] transition-colors cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-[#ffd84d] text-[#3b1c6a] flex items-center justify-center mb-4">
                        <FileText size={24} />
                      </div>
                      <h4 className="text-white font-medium mb-2">Monthly Report</h4>
                      <p className="text-purple-200 text-sm mb-4">
                        Summary of all leave requests for the current month
                      </p>
                      <Button
                        className="w-full bg-[#3b1c6a] hover:bg-[#4e2a85] text-white"
                        onClick={() => setShowReportDialog(true)}
                      >
                        <Download size={16} className="mr-2" />
                        Generate
                      </Button>
                    </div>

                    <div className="bg-[#5d3a96] p-4 rounded-lg hover:bg-[#6d4aa6] transition-colors cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-[#ffd84d] text-[#3b1c6a] flex items-center justify-center mb-4">
                        <Users size={24} />
                      </div>
                      <h4 className="text-white font-medium mb-2">Class Report</h4>
                      <p className="text-purple-200 text-sm mb-4">Leave statistics by class for the current semester</p>
                      <Button
                        className="w-full bg-[#3b1c6a] hover:bg-[#4e2a85] text-white"
                        onClick={() => setShowReportDialog(true)}
                      >
                        <Download size={16} className="mr-2" />
                        Generate
                      </Button>
                    </div>

                    <div className="bg-[#5d3a96] p-4 rounded-lg hover:bg-[#6d4aa6] transition-colors cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-[#ffd84d] text-[#3b1c6a] flex items-center justify-center mb-4">
                        <Calendar size={24} />
                      </div>
                      <h4 className="text-white font-medium mb-2">Annual Report</h4>
                      <p className="text-purple-200 text-sm mb-4">Comprehensive report for the academic year</p>
                      <Button
                        className="w-full bg-[#3b1c6a] hover:bg-[#4e2a85] text-white"
                        onClick={() => setShowReportDialog(true)}
                      >
                        <Download size={16} className="mr-2" />
                        Generate
                      </Button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-white font-medium mb-4">Recent Reports</h3>
                    <div className="rounded-md border border-[#5d3a96] overflow-hidden">
                      <div className="grid grid-cols-4 bg-[#3b1c6a] p-4 font-medium text-purple-200 text-sm">
                        <div>Report Name</div>
                        <div>Generated On</div>
                        <div>Generated By</div>
                        <div>Actions</div>
                      </div>

                      <div className="grid grid-cols-4 p-4 border-t border-[#5d3a96] text-sm hover:bg-[#5d3a96] transition-colors">
                        <div className="text-white">February 2025 Leave Report</div>
                        <div className="text-purple-200">March 1, 2025</div>
                        <div className="text-purple-200">Dr. Williams</div>
                        <div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#3a2a55] text-purple-200 hover:bg-[#3a2a55] hover:text-white"
                          >
                            <Download size={14} className="mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 p-4 border-t border-[#5d3a96] text-sm hover:bg-[#5d3a96] transition-colors">
                        <div className="text-white">Class 10 Leave Report</div>
                        <div className="text-purple-200">February 15, 2025</div>
                        <div className="text-purple-200">Dr. Williams</div>
                        <div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#3a2a55] text-purple-200 hover:bg-[#3a2a55] hover:text-white"
                          >
                            <Download size={14} className="mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Report Generation Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="bg-[#4e2a85] border-[#5d3a96] text-white">
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription className="text-purple-200">Configure your report settings</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reportType" className="text-purple-200">
                Report Type
              </Label>
              <Select defaultValue="monthly">
                <SelectTrigger id="reportType" className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                  <SelectItem value="monthly">Monthly Report</SelectItem>
                  <SelectItem value="class">Class-wise Report</SelectItem>
                  <SelectItem value="annual">Annual Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format" className="text-purple-200">
                Format
              </Label>
              <Select defaultValue="pdf">
                <SelectTrigger id="format" className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange" className="text-purple-200">
                Date Range
              </Label>
              <Select defaultValue="current">
                <SelectTrigger id="dateRange" className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                  <SelectItem value="current">Current Month</SelectItem>
                  <SelectItem value="previous">Previous Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalOptions" className="text-purple-200">
                Additional Options
              </Label>
              <div className="flex flex-col gap-2 bg-[#3b1c6a] p-3 rounded-md border border-[#5d3a96]">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="includeCharts" className="rounded bg-[#3b1c6a] border-[#5d3a96]" />
                  <label htmlFor="includeCharts" className="text-white text-sm">
                    Include charts and graphs
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="includeDetails" className="rounded bg-[#3b1c6a] border-[#5d3a96]" />
                  <label htmlFor="includeDetails" className="text-white text-sm">
                    Include detailed student information
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="compareLastYear" className="rounded bg-[#3b1c6a] border-[#5d3a96]" />
                  <label htmlFor="compareLastYear" className="text-white text-sm">
                    Compare with previous year
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowReportDialog(false)}
              className="border-purple-300 text-purple-300 hover:bg-[#5d3a96] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]"
              onClick={() => generateReport("Monthly")}
            >
              <Download size={16} className="mr-2" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Leave Details Dialog */}
      <Dialog open={showLeaveDetailsDialog} onOpenChange={setShowLeaveDetailsDialog}>
        {selectedLeave && (
          <DialogContent className="bg-[#4e2a85] border-[#5d3a96] text-white">
            <DialogHeader>
              <DialogTitle>Leave Request Details</DialogTitle>
              <DialogDescription className="text-purple-200">
                Review the complete leave request information
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-purple-200 text-sm mb-1">Student Name</h4>
                  <p className="text-white font-medium">{selectedLeave.student}</p>
                </div>
                <div>
                  <h4 className="text-purple-200 text-sm mb-1">Class</h4>
                  <p className="text-white font-medium">{selectedLeave.class}</p>
                </div>
                <div>
                  <h4 className="text-purple-200 text-sm mb-1">Leave Type</h4>
                  <p className="text-white font-medium">{selectedLeave.type}</p>
                </div>
                <div>
                  <h4 className="text-purple-200 text-sm mb-1">Status</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedLeave.status === "pending"
                        ? "bg-yellow-500 text-white"
                        : selectedLeave.status === "approved"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                    }`}
                  >
                    {selectedLeave.status.charAt(0).toUpperCase() + selectedLeave.status.slice(1)}
                  </span>
                </div>
                <div>
                  <h4 className="text-purple-200 text-sm mb-1">Start Date</h4>
                  <p className="text-white font-medium">{new Date(selectedLeave.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-purple-200 text-sm mb-1">End Date</h4>
                  <p className="text-white font-medium">{new Date(selectedLeave.endDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-purple-200 text-sm mb-1">Reason</h4>
                <p className="text-white bg-[#3b1c6a] p-3 rounded-md border border-[#5d3a96]">{selectedLeave.reason}</p>
              </div>

              <div>
                <h4 className="text-purple-200 text-sm mb-1">Supporting Documents</h4>
                <div className="bg-[#3b1c6a] p-3 rounded-md border border-[#5d3a96] text-center">
                  <p className="text-purple-200 text-sm">No documents attached</p>
                </div>
              </div>
            </div>

            <DialogFooter>
              {selectedLeave.status === "pending" && (
                <>
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => {
                      handleApprove(selectedLeave.id)
                      setShowLeaveDetailsDialog(false)
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-400 text-red-400 hover:bg-red-500/20"
                    onClick={() => {
                      handleReject(selectedLeave.id)
                      setShowLeaveDetailsDialog(false)
                    }}
                  >
                    Reject
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                onClick={() => setShowLeaveDetailsDialog(false)}
                className="border-purple-300 text-purple-300 hover:bg-[#5d3a96] hover:text-white"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}



