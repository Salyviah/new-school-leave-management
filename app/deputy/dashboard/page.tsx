"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Calendar,
  Download,
  FileText,
  Home,
  LogOut,
  Menu,
  PieChart,
  Settings,
  Users,
  X,
  BarChart,
  Filter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"

export default function DeputyPrincipalDashboard() {
  const [showLeaveDetailsDialog, setShowLeaveDetailsDialog] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Mock deputy principal data
  const deputyPrincipal = {
    name: "Mr. Robert Chen",
    role: "Deputy Principal",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock leave requests
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      student: "Alex Johnson",
      class: "10A",
      teacher: "Ms. Parker",
      startDate: "2025-03-15",
      endDate: "2025-03-17",
      reason: "Doctor's appointment and recovery",
      status: "pending",
      escalated: true,
    },
    {
      id: 2,
      student: "Emma Davis",
      class: "11B",
      teacher: "Mr. Smith",
      startDate: "2025-04-10",
      endDate: "2025-04-12",
      reason: "Sister's wedding ceremony",
      status: "pending",
      escalated: false,
    },
    {
      id: 3,
      student: "Michael Brown",
      class: "9C",
      teacher: "Ms. Williams",
      startDate: "2025-03-20",
      endDate: "2025-03-22",
      reason: "Regional basketball tournament",
      status: "approved",
      escalated: false,
    },
    {
      id: 4,
      student: "Sophia Wilson",
      class: "12A",
      teacher: "Mr. Johnson",
      startDate: "2025-03-05",
      endDate: "2025-03-07",
      reason: "Dental procedure",
      status: "rejected",
      escalated: true,
    },
    {
      id: 5,
      student: "James Miller",
      class: "10B",
      teacher: "Ms. Parker",
      startDate: "2025-03-25",
      endDate: "2025-03-26",
      reason: "Family emergency",
      status: "pending",
      escalated: true,
    },
  ])

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Ms. Parker has escalated Alex Johnson's leave request for your review",
      time: "2 hours ago",
      read: false,
      type: "escalated",
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
      message: "Mr. Johnson has escalated Sophia Wilson's leave request for your review",
      time: "3 days ago",
      read: true,
      type: "escalated",
    },
  ])

  // Stats for dashboard
  const stats = {
    pendingRequests: leaveRequests.filter((req) => req.status === "pending").length,
    approvedRequests: 12,
    rejectedRequests: 2,
    escalatedRequests: leaveRequests.filter((req) => req.escalated).length,
  }

  interface Leave {
    id: number;
    student: string;
    class: string;
    teacher: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
    escalated: boolean;
  }

  const handleViewDetails = (leave: Leave) => {
    setSelectedLeave(leave)
    setShowLeaveDetailsDialog(true)
  }

  const handleApprove = (id: number) => {
    // Update the status in the leave requests
    setLeaveRequests((prev) =>
      prev.map((leave) => (leave.id === id ? { ...leave, status: "approved", escalated: false } : leave)),
    )

    // Add notification
    const approvedLeave = leaveRequests.find((leave) => leave.id === id)
    if (approvedLeave) {
      const newNotification = {
        id: notifications.length + 1,
        message: `You approved ${approvedLeave.student}'s leave request`,
        time: "Just now",
        read: false,
        type: "escalated",
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
    setLeaveRequests((prev) =>
      prev.map((leave) => (leave.id === id ? { ...leave, status: "rejected", escalated: false } : leave)),
    )

    // Add notification
    const rejectedLeave = leaveRequests.find((leave) => leave.id === id)
    if (rejectedLeave) {
      const newNotification = {
        id: notifications.length + 1,
        message: `You rejected ${rejectedLeave.student}'s leave request`,
        time: "Just now",
        read: false,
        type: "escalated",
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

  const filteredRequests =
    activeTab === "all"
      ? leaveRequests
      : activeTab === "escalated"
        ? leaveRequests.filter((req) => req.escalated)
        : leaveRequests.filter((req) => req.status === activeTab)

  return (
    <div className="min-h-screen bg-[#3b1c6a] flex flex-col">
      {/* Header */}
      <header className="bg-[#4e2a85] py-4 px-6 flex justify-between items-center sticky top-0 z-50 shadow-md">
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
          <div className="bg-red-500/20 px-3 py-1 rounded-full flex items-center">
            <span className="text-red-400 text-sm font-medium">Emergency Alerts: </span>
            <span className="text-white ml-1 font-bold">2</span>
          </div>

          <div className="relative">
            <button
              className="text-white p-2 rounded-full hover:bg-[#5d3a96] relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#ffd84d] rounded-full animate-pulse"></span>
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
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b border-[#5d3a96] hover:bg-[#5d3a96] transition-colors ${notification.read ? "opacity-70" : ""}`}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
                              ${notification.type === "escalated" ? "bg-yellow-500/20 text-yellow-500" : "bg-blue-500/20 text-blue-500"}`}
                          >
                            {notification.type === "escalated" ? <FileText size={16} /> : <Download size={16} />}
                          </div>
                          <div>
                            <p className="text-white text-sm">{notification.message}</p>
                            <p className="text-purple-200 text-xs mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-purple-200">No notifications</div>
                  )}
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

          <button
            className="text-white p-2 rounded-full hover:bg-[#5d3a96]"
            onClick={() => setShowSettingsDialog(true)}
          >
            <Settings size={20} />
          </button>

          <div className="hidden md:flex items-center gap-2">
            <Avatar className="border-2 border-[#ffd84d]/30">
              <AvatarImage src={deputyPrincipal.avatar} alt={deputyPrincipal.name} />
              <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">
                {deputyPrincipal.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-white">{deputyPrincipal.name}</span>
              <p className="text-xs text-purple-200">{deputyPrincipal.role}</p>
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
                <Avatar>
                  <AvatarImage src={deputyPrincipal.avatar} alt={deputyPrincipal.name} />
                  <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">
                    {deputyPrincipal.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{deputyPrincipal.name}</p>
                  <p className="text-purple-200 text-xs">{deputyPrincipal.role}</p>
                </div>
              </div>
              <nav className="space-y-2">
                <Link
                  href="/deputy/dashboard"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#5d3a96] text-white"
                >
                  <Home size={18} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    // Filter to show only escalated cases
                    setActiveTab("escalated")
                    // Scroll to the leave requests section
                    document.getElementById("leave-requests-section")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                >
                  <FileText size={18} />
                  <span>Cases</span>
                </button>
                <button
                  onClick={() => setShowReportDialog(true)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                >
                  <BarChart size={18} />
                  <span>Reports</span>
                </button>
                <button
                  onClick={() => setShowSettingsDialog(true)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
              </nav>
              <div className="absolute bottom-4 w-full pr-8">
                <Link
                  href="/logout"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                  onClick={(e) => {
                    e.preventDefault()
                    alert("Logging out...")
                  }}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-[#4e2a85] p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#5d3a96]">
            <Avatar>
              <AvatarImage src={deputyPrincipal.avatar} alt={deputyPrincipal.name} />
              <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">
                {deputyPrincipal.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium">{deputyPrincipal.name}</p>
              <p className="text-purple-200 text-sm">{deputyPrincipal.role}</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Link
              href="/deputy/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white"
            >
              <BarChart size={18} />
              <span>Analytics</span>
            </Link>
            <button
              onClick={() => {
                // Filter to show only escalated cases
                setActiveTab("escalated")
                // Scroll to the leave requests section
                document.getElementById("leave-requests-section")?.scrollIntoView({ behavior: "smooth" })
                alert("Showing escalated cases that require your attention")
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96] transition-colors"
            >
              <FileText size={18} />
              <span>Cases</span>
              {stats.escalatedRequests > 0 && (
                <Badge className="ml-auto bg-[#ffd84d] text-[#3b1c6a]">{stats.escalatedRequests}</Badge>
              )}
            </button>
            <button
              onClick={() => setShowReportDialog(true)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96] transition-colors"
            >
              <PieChart size={18} />
              <span>Reports</span>
            </button>
            <button
              onClick={() => setShowSettingsDialog(true)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96] transition-colors"
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </nav>
          <div className="absolute bottom-4">
            <Link
              href="/logout"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96] transition-colors"
              onClick={(e) => {
                e.preventDefault()
                alert("Logging out...")
              }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#4e2a85] to-[#6d28d9] p-6 rounded-xl mb-8 relative overflow-hidden shadow-lg">
              <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#ffd84d] opacity-10 rounded-full"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2">Welcome, {deputyPrincipal.name.split(" ")[1]}!</h2>
                <p className="text-purple-200">Manage leave requests across the school and generate reports</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-[#4e2a85] border-[#5d3a96] hover:shadow-lg hover:shadow-purple-900/20 transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 mr-2">
                      <FileText size={16} />
                    </div>
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#ffd84d]">{stats.pendingRequests}</div>
                  <p className="text-purple-200 text-sm mt-1">Awaiting your approval</p>
                </CardContent>
              </Card>

              <Card className="bg-[#4e2a85] border-[#5d3a96] hover:shadow-lg hover:shadow-purple-900/20 transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mr-2">
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
                        className="lucide lucide-check-circle"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    Approved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">{stats.approvedRequests}</div>
                  <p className="text-purple-200 text-sm mt-1">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-[#4e2a85] border-[#5d3a96] hover:shadow-lg hover:shadow-purple-900/20 transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mr-2">
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
                        className="lucide lucide-x-circle"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" x2="9" y1="9" y2="15" />
                        <line x1="9" x2="15" y1="9" y2="15" />
                      </svg>
                    </div>
                    Rejected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400">{stats.rejectedRequests}</div>
                  <p className="text-purple-200 text-sm mt-1">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-[#4e2a85] border-[#5d3a96] hover:shadow-lg hover:shadow-purple-900/20 transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 mr-2">
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
                        className="lucide lucide-alert-triangle"
                      >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                      </svg>
                    </div>
                    Escalated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-400">{stats.escalatedRequests}</div>
                  <p className="text-purple-200 text-sm mt-1">Requires attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Notifications Section */}
            <Card className="bg-[#4e2a85] border-[#5d3a96] mb-8 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center">
                  <Bell className="mr-2 text-[#ffd84d]" size={18} />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {notifications.length > 0 ? (
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 bg-[#3b1c6a] rounded-lg ${notification.read ? "opacity-70" : ""} hover:bg-[#5d3a96] transition-colors cursor-pointer`}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
                            ${notification.type === "escalated" ? "bg-yellow-500/20 text-yellow-500" : "bg-blue-500/20 text-blue-500"}`}
                          >
                            {notification.type === "escalated" ? <FileText size={16} /> : <Download size={16} />}
                          </div>
                          <div>
                            <p className="text-white text-sm">{notification.message}</p>
                            <p className="text-purple-200 text-xs mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-purple-200">No notifications at this time.</p>
                )}
              </CardContent>
            </Card>

            {/* Reports Section */}
            <Card className="bg-[#4e2a85] border-[#5d3a96] mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart className="mr-2 text-[#ffd84d]" size={18} />
                  Reports
                </CardTitle>
                <CardDescription className="text-purple-200">Generate and view leave reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#5d3a96] p-4 rounded-lg hover:bg-[#6d4aa6] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-[#ffd84d] text-[#3b1c6a] flex items-center justify-center mb-3">
                      <Calendar size={20} />
                    </div>
                    <h4 className="text-white font-medium mb-1">Monthly Report</h4>
                    <p className="text-purple-200 text-sm mb-3">Summary of all leave requests for the current month</p>
                    <Button
                      className="w-full bg-[#3b1c6a] hover:bg-[#4e2a85] text-white"
                      onClick={() => setShowReportDialog(true)}
                    >
                      <Download size={14} className="mr-2" />
                      Generate
                    </Button>
                  </div>

                  <div className="bg-[#5d3a96] p-4 rounded-lg hover:bg-[#6d4aa6] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-[#ffd84d] text-[#3b1c6a] flex items-center justify-center mb-3">
                      <Users size={20} />
                    </div>
                    <h4 className="text-white font-medium mb-1">Class Report</h4>
                    <p className="text-purple-200 text-sm mb-3">Leave statistics by class for the current semester</p>
                    <Button
                      className="w-full bg-[#3b1c6a] hover:bg-[#4e2a85] text-white"
                      onClick={() => setShowReportDialog(true)}
                    >
                      <Download size={14} className="mr-2" />
                      Generate
                    </Button>
                  </div>

                  <div className="bg-[#5d3a96] p-4 rounded-lg hover:bg-[#6d4aa6] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-[#ffd84d] text-[#3b1c6a] flex items-center justify-center mb-3">
                      <PieChart size={20} />
                    </div>
                    <h4 className="text-white font-medium mb-1">Leave Type Analysis</h4>
                    <p className="text-purple-200 text-sm mb-3">Breakdown of leave requests by type and status</p>
                    <Button
                      className="w-full bg-[#3b1c6a] hover:bg-[#4e2a85] text-white"
                      onClick={() => setShowReportDialog(true)}
                    >
                      <Download size={14} className="mr-2" />
                      Generate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leave Requests */}
            <Card id="leave-requests-section" className="bg-[#4e2a85] border-[#5d3a96] shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white flex items-center">
                    <FileText className="mr-2 text-[#ffd84d]" size={18} />
                    Leave Requests
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-[#5d3a96] text-white hover:bg-[#5d3a96]">
                      <Filter size={14} className="mr-1" />
                      Filter
                    </Button>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px] bg-[#3b1c6a] border-[#5d3a96] text-white">
                        <SelectValue placeholder="Filter by" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                        <SelectItem value="all">All Classes</SelectItem>
                        <SelectItem value="10A">Class 10A</SelectItem>
                        <SelectItem value="11B">Class 11B</SelectItem>
                        <SelectItem value="12A">Class 12A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full mb-6" onValueChange={setActiveTab}>
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
                    <TabsTrigger
                      value="escalated"
                      className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
                    >
                      Escalated
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#5d3a96]">
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Student Name</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Class</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Teacher</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Start Date</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">End Date</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.length > 0 ? (
                        filteredRequests.map((leave) => (
                          <tr key={leave.id} className="border-b border-[#5d3a96] hover:bg-[#5d3a96] transition-colors">
                            <td className="py-3 px-4 text-white">{leave.student}</td>
                            <td className="py-3 px-4 text-white">{leave.class}</td>
                            <td className="py-3 px-4 text-white">{leave.teacher}</td>
                            <td className="py-3 px-4 text-white">{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-white">{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <Badge
                                className={`${
                                  leave.status === "approved"
                                    ? "bg-green-500"
                                    : leave.status === "rejected"
                                      ? "bg-red-500"
                                      : "bg-yellow-500"
                                } ${leave.escalated ? "border border-[#ffd84d]" : ""}`}
                              >
                                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                                {leave.escalated && " (Escalated)"}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              {leave.status === "pending" ? (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => handleApprove(leave.id)}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-400 text-red-400 hover:bg-red-500/20"
                                    onClick={() => handleReject(leave.id)}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-[#5d3a96] text-white hover:bg-[#5d3a96]"
                                  onClick={() => handleViewDetails(leave)}
                                >
                                  View
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-4 text-center text-purple-200">
                            No leave requests found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Leave Details Dialog */}
      <Dialog open={showLeaveDetailsDialog} onOpenChange={setShowLeaveDetailsDialog}>
        {selectedLeave && (
          <DialogContent className="bg-[#4e2a85] border-[#5d3a96] text-white">
            <DialogHeader>
              <DialogTitle>Leave Request Details</DialogTitle>
              <DialogDescription className="text-purple-200">
                Request from {selectedLeave.student} ({selectedLeave.class})
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-purple-200">Start Date</Label>
                  <p className="text-white font-medium">{new Date(selectedLeave.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-purple-200">End Date</Label>
                  <p className="text-white font-medium">{new Date(selectedLeave.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-purple-200">Teacher</Label>
                  <p className="text-white font-medium">{selectedLeave.teacher}</p>
                </div>
                <div>
                  <Label className="text-purple-200">Status</Label>
                  <p>
                    <Badge
                      className={`${
                        selectedLeave.status === "approved"
                          ? "bg-green-500"
                          : selectedLeave.status === "rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    >
                      {selectedLeave.status.charAt(0).toUpperCase() + selectedLeave.status.slice(1)}
                    </Badge>
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-purple-200">Reason</Label>
                <p className="text-white bg-[#3b1c6a] p-3 rounded-md mt-1">{selectedLeave.reason}</p>
              </div>

              <div>
                <Label className="text-purple-200">Deputy Principal Comments</Label>
                <Textarea
                  placeholder="Add your comments here..."
                  className="bg-[#3b1c6a] border-[#5d3a96] text-white placeholder:text-purple-300 mt-1"
                />
              </div>
            </div>

            <DialogFooter>
              {selectedLeave.status === "pending" ? (
                <>
                  <Button
                    variant="outline"
                    className="border-red-400 text-red-400 hover:bg-red-500/20 hover:text-red-400"
                    onClick={() => {
                      handleReject(selectedLeave.id)
                      setShowLeaveDetailsDialog(false)
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => {
                      handleApprove(selectedLeave.id)
                      setShowLeaveDetailsDialog(false)
                    }}
                  >
                    Approve
                  </Button>
                </>
              ) : (
                <Button
                  className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]"
                  onClick={() => setShowLeaveDetailsDialog(false)}
                >
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

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
                  <SelectItem value="type">Leave Type Analysis</SelectItem>
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

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="bg-[#4e2a85] border-[#5d3a96] text-white">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription className="text-purple-200">Configure system settings and preferences</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="policy">
            <TabsList className="bg-[#3b1c6a] border border-[#5d3a96] p-1">
              <TabsTrigger value="policy" className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white">
                Policy Templates
              </TabsTrigger>
              <TabsTrigger
                value="escalation"
                className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
              >
                Escalation Rules
              </TabsTrigger>
              <TabsTrigger value="api" className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white">
                API Keys
              </TabsTrigger>
            </TabsList>

            <TabsContent value="policy" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultPolicy" className="text-purple-200">
                  Default Leave Policy
                </Label>
                <Select defaultValue="standard">
                  <SelectTrigger id="defaultPolicy" className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                    <SelectValue placeholder="Select policy template" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                    <SelectItem value="standard">Standard Policy</SelectItem>
                    <SelectItem value="medical">Medical Leave Policy</SelectItem>
                    <SelectItem value="emergency">Emergency Leave Policy</SelectItem>
                    <SelectItem value="custom">Custom Policy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="policyTemplate" className="text-purple-200">
                  Policy Template
                </Label>
                <Textarea
                  id="policyTemplate"
                  className="bg-[#3b1c6a] border-[#5d3a96] text-white min-h-[150px]"
                  defaultValue="Students are allowed up to 15 days of leave per semester. Medical leaves require proper documentation from a healthcare provider. Emergency leaves will be evaluated on a case-by-case basis."
                />
              </div>
            </TabsContent>

            <TabsContent value="escalation" className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoEscalate" className="text-purple-200">
                  Auto-escalate medical leaves to principal
                </Label>
                <Switch id="autoEscalate" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="escalateThreshold" className="text-purple-200">
                  Escalate when student exceeds leave threshold
                </Label>
                <Switch id="escalateThreshold" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="leaveThreshold" className="text-purple-200">
                  Leave threshold (days per semester)
                </Label>
                <Input
                  id="leaveThreshold"
                  type="number"
                  defaultValue="15"
                  className="bg-[#3b1c6a] border-[#5d3a96] text-white"
                />
              </div>
            </TabsContent>

            <TabsContent value="api" className="mt-4 space-y-4">
              <div className="bg-[#3b1c6a] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">API Access</h3>
                <p className="text-purple-200 text-sm mb-4">Manage API keys for integration with other systems.</p>

                <div className="space-y-2 mb-4">
                  <Label htmlFor="apiKey" className="text-purple-200">
                    Current API Key
                  </Label>
                  <div className="flex">
                    <Input
                      id="apiKey"
                      value={process.env.NEXT_PUBLIC_STRIPE_API_KEY || "API_KEY_NOT_SET"}
                      className="bg-[#3b1c6a] border-[#5d3a96] text-white rounded-r-none"
                      readOnly
                    />
                    <Button className="rounded-l-none bg-[#5d3a96] hover:bg-[#6d4aa6]">Copy</Button>
                  </div>
                </div>

                <Button className="w-full bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]">Generate New API Key</Button>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSettingsDialog(false)}
              className="border-purple-300 text-purple-300 hover:bg-[#5d3a96] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]"
              onClick={() => {
                setShowSettingsDialog(false)
                setTimeout(() => {
                  alert("Settings saved successfully!")
                }, 100)
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


  
  