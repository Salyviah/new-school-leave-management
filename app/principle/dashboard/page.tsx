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
  UserPlus,
  Shield,
  Sliders,
  User,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function PrincipalDashboard() {
  const [showLeaveDetailsDialog, setShowLeaveDetailsDialog] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [showUserManagementDialog, setShowUserManagementDialog] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [activeSettingsTab, setActiveSettingsTab] = useState("users")
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
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Deputy Principal has escalated Alex Johnson's leave request for your review",
      time: "2 hours ago",
      read: false,
      type: "escalated",
    },
    {
      id: 2,
      message: "New user account created for teacher Ms. Thompson",
      time: "Yesterday",
      read: false,
      type: "user",
    },
    {
      id: 3,
      message: "System update completed successfully",
      time: "3 days ago",
      read: true,
      type: "system",
    },
  ])
  const [users, setUsers] = useState([
    { id: 1, name: "Jennifer Parker", email: "j.parker@school.edu", role: "Teacher", status: "Active" },
    { id: 2, name: "Robert Chen", email: "r.chen@school.edu", role: "Deputy Principal", status: "Active" },
    { id: 3, name: "Michael Smith", email: "m.smith@school.edu", role: "Teacher", status: "Active" },
    { id: 4, name: "Emma Johnson", email: "e.johnson@school.edu", role: "Teacher", status: "Inactive" },
  ])

  // Mock principal data
  const principal = {
    name: "Dr. Sarah Williams",
    role: "Principal",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Stats for dashboard
  const stats = {
    pendingRequests: 3,
    approvedRequests: 15,
    rejectedRequests: 4,
    totalUsers: 42,
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

  interface UserData {
    name: string;
    email: string;
    role: string;
  }

  const handleAddUser = (userData: UserData) => {
    // In a real app, this would add a user to the database
    setUsers((prev) => [...prev, { id: prev.length + 1, ...userData, status: "Active" }])
    setShowUserManagementDialog(false)

    // Add notification
    const newNotification = {
      id: notifications.length + 1,
      message: `New user ${userData.name} has been added to the system`,
      time: "Just now",
      read: false,
      type: "user",
    }

    setNotifications((prev) => [newNotification, ...prev])

    alert(`User ${userData.name} added successfully!`)
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
      <header className="bg-gradient-to-r from-[#4e2a85] to-[#6d28d9] py-4 px-6 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center">
          <button className="md:hidden mr-4 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link href="/" className="text-white hover:text-[#ffd84d] mr-4">
            <Home size={18} />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#ffd84d] rounded-full flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#3b1c6a]"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">School Leave</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#3b1c6a] px-3 py-1 rounded-full flex items-center">
            <span className="text-white text-sm">System Status:</span>
            <span className="ml-1 flex items-center text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              Online
            </span>
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
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-[#5d3a96] hover:bg-[#5d3a96] transition-colors ${notification.read ? "opacity-70" : ""}`}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
                    ${
                      notification.type === "escalated"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : notification.type === "user"
                          ? "bg-blue-500/20 text-blue-500"
                          : "bg-green-500/20 text-green-500"
                    }`}
                        >
                          {notification.type === "escalated" ? (
                            <FileText size={16} />
                          ) : notification.type === "user" ? (
                            <UserPlus size={16} />
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

          <button
            className="text-white p-2 rounded-full hover:bg-[#5d3a96]"
            onClick={() => setShowSettingsDialog(true)}
          >
            <Settings size={20} />
          </button>

          <div className="hidden md:flex items-center gap-2">
            <Avatar className="border-2 border-[#ffd84d]/30">
              <AvatarImage src={principal.avatar} alt={principal.name} />
              <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">
                {principal.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-white">{principal.name}</span>
              <p className="text-xs text-purple-200">{principal.role}</p>
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
                  <AvatarImage src={principal.avatar} alt={principal.name} />
                  <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">
                    {principal.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{principal.name}</p>
                  <p className="text-purple-200 text-xs">{principal.role}</p>
                </div>
              </div>
              <nav className="space-y-2">
                <Link
                  href="/principal/dashboard"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#5d3a96] text-white"
                >
                  <Home size={18} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    // Scroll to the leave requests section
                    document.getElementById("leave-requests-section")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                >
                  <FileText size={18} />
                  <span>Leave Requests</span>
                </button>
                <Link
                  href="/principal/reports"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowReportDialog(true)
                  }}
                >
                  <BarChart size={18} />
                  <span>Reports</span>
                </Link>
                <Link
                  href="/principal/users"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowUserManagementDialog(true)
                  }}
                >
                  <Users size={18} />
                  <span>User Management</span>
                </Link>
                <Link
                  href="/principal/settings"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowSettingsDialog(true)
                  }}
                >
                  <Settings size={18} />
                  <span>System Settings</span>
                </Link>
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
              <AvatarImage src={principal.avatar} alt={principal.name} />
              <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">
                {principal.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium">{principal.name}</p>
              <p className="text-purple-200 text-xs">{principal.role}</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Link
              href="/principal/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white"
            >
              <UserPlus size={18} />
              <span>User Management</span>
            </Link>
            <Link
              href="/principal/audit"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96] transition-colors"
              onClick={(e) => {
                e.preventDefault()
                alert("Navigating to Audit page")
              }}
            >
              <FileText size={18} />
              <span>Audit</span>
            </Link>
            <Link
              href="/principal/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96] transition-colors"
            >
              <User size={18} />
              <span>Profile</span>
            </Link>
            <Link
              href="/principal/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96] transition-colors"
              onClick={(e) => {
                e.preventDefault()
                setShowSettingsDialog(true)
              }}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
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
                <h2 className="text-2xl font-bold text-white mb-2">Welcome, {principal.name.split(" ")[1]}!</h2>
                <p className="text-purple-200">Oversee all leave management activities and system settings</p>
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
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mr-2">
                      <Users size={16} />
                    </div>
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">{stats.totalUsers}</div>
                  <p className="text-purple-200 text-sm mt-1">Active accounts</p>
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
                            ${
                              notification.type === "escalated"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : notification.type === "user"
                                  ? "bg-blue-500/20 text-blue-500"
                                  : "bg-green-500/20 text-green-500"
                            }`}
                          >
                            {notification.type === "escalated" ? (
                              <FileText size={16} />
                            ) : notification.type === "user" ? (
                              <UserPlus size={16} />
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
                ) : (
                  <p className="text-purple-200">No notifications at this time.</p>
                )}
              </CardContent>
            </Card>

            {/* System Settings Quick Access */}
            <Card className="bg-[#4e2a85] border-[#5d3a96] mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="mr-2 text-[#ffd84d]" size={18} />
                  System Settings
                </CardTitle>
                <CardDescription className="text-purple-200">Quick access to system configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className="bg-[#5d3a96] p-4 rounded-lg hover:bg-[#6d4aa6] transition-colors cursor-pointer"
                    onClick={() => setShowUserManagementDialog(true)}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#ffd84d] text-[#3b1c6a] flex items-center justify-center mb-3">
                      <UserPlus size={20} />
                    </div>
                    <h4 className="text-white font-medium mb-1">User Management</h4>
                    <p className="text-purple-200 text-sm mb-3">Add, edit, or remove user accounts</p>
                    <Button
                      className="w-full bg-[#3b1c6a] hover:bg-[#4e2a85] text-white"
                      onClick={() => setShowUserManagementDialog(true)}
                    >
                      Manage Users
                    </Button>
                  </div>

                  <div
                    className="bg-[#5d3a96] p-4 rounded-lg hover:bg-[#6d4aa6] transition-colors cursor-pointer"
                    onClick={() => setShowSettingsDialog(true)}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#ffd84d] text-[#3b1c6a] flex items-center justify-center mb-3">
                      <Shield size={20} />
                    </div>
                    <h4 className="text-white font-medium mb-1">Permissions</h4>
                    <p className="text-purple-200 text-sm mb-3">Configure role-based permissions</p>
                    <Button
                      className="w-full bg-[#3b1c6a] hover:bg-[#4e2a85] text-white"
                      onClick={() => {
                        setShowSettingsDialog(true)
                        setTimeout(() => {
                          const permissionsTab = document.querySelector('[value="permissions"]') as HTMLElement | null;
                          permissionsTab?.click();
                        }, 100)
                      }}
                    >
                      Manage Permissions
                    </Button>
                  </div>

                  <div
                    className="bg-[#5d3a96] p-4 rounded-lg hover:bg-[#6d4aa6] transition-colors cursor-pointer"
                    onClick={() => setShowSettingsDialog(true)}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#ffd84d] text-[#3b1c6a] flex items-center justify-center mb-3">
                      <Sliders size={20} />
                    </div>
                    <h4 className="text-white font-medium mb-1">System Configuration</h4>
                    <p className="text-purple-200 text-sm mb-3">Adjust system-wide settings</p>
                    <Button
                      className="w-full bg-[#3b1c6a] hover:bg-[#4e2a85] text-white"
                      onClick={() => {
                        setShowSettingsDialog(true)
                        setTimeout(() => {
                          const systemTab = document.querySelector('[value="system"]');
                          if (systemTab instanceof HTMLElement) {
                            systemTab.click();
                          }
                        }, 100)
                      }}
                    >
                      Configure System
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reports Section */}
            <Card className="bg-[#4e2a85] border-[#5d3a96] mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart className="mr-2 text-[#ffd84d]" size={18} />
                  Reports
                </CardTitle>
                <CardDescription className="text-purple-200">Generate detailed leave reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#5d3a96] p-4 rounded-lg hover:bg-[#6d4aa6] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-[#ffd84d] text-[#3b1c6a] flex items-center justify-center mb-3">
                      <Calendar size={20} />
                    </div>
                    <h4 className="text-white font-medium mb-1">Monthly Report</h4>
                    <p className="text-purple-200 text-sm mb-3">Comprehensive monthly leave analysis</p>
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
                    <h4 className="text-white font-medium mb-1">Staff Report</h4>
                    <p className="text-purple-200 text-sm mb-3">Teacher and staff leave patterns</p>
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
                    <h4 className="text-white font-medium mb-1">Annual Summary</h4>
                    <p className="text-purple-200 text-sm mb-3">Yearly leave statistics and trends</p>
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
                      {filteredRequests.map((leave) => (
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
                      ))}
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
                <Label className="text-purple-200">Principal Comments</Label>
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
            <DialogTitle>Generate Detailed Report</DialogTitle>
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
                  <SelectItem value="staff">Staff Report</SelectItem>
                  <SelectItem value="annual">Annual Summary</SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
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
                  <SelectItem value="year">Current Year</SelectItem>
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
                  <Switch id="includeCharts" />
                  <Label htmlFor="includeCharts" className="text-white text-sm">
                    Include charts and graphs
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="includeDetails" />
                  <Label htmlFor="includeDetails" className="text-white text-sm">
                    Include detailed student information
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="compareLastYear" />
                  <Label htmlFor="compareLastYear" className="text-white text-sm">
                    Compare with previous year
                  </Label>
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
              onClick={() => {
                generateReport("Monthly")
                setShowReportDialog(false)
              }}
            >
              <Download size={16} className="mr-2" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Management Dialog */}
      <Dialog open={showUserManagementDialog} onOpenChange={setShowUserManagementDialog}>
        <DialogContent className="bg-[#4e2a85] border-[#5d3a96] text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>User Management</DialogTitle>
            <DialogDescription className="text-purple-200">Add, edit, or remove user accounts</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="users" className="w-full" onValueChange={setActiveSettingsTab}>
            <TabsList className="bg-[#3b1c6a] border border-[#5d3a96] p-1">
              <TabsTrigger value="users" className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white">
                Users
              </TabsTrigger>
              <TabsTrigger value="roles" className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white">
                Roles
              </TabsTrigger>
              <TabsTrigger
                value="permissions"
                className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
              >
                Permissions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <Input
                  placeholder="Search users..."
                  className="w-64 bg-[#3b1c6a] border-[#5d3a96] text-white placeholder:text-purple-300"
                />
                <Button className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]">
                  <UserPlus size={16} className="mr-2" />
                  Add User
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#5d3a96]">
                      <th className="text-left py-3 px-4 text-purple-200 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-purple-200 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-purple-200 font-medium">Role</th>
                      <th className="text-left py-3 px-4 text-purple-200 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-purple-200 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-[#5d3a96] hover:bg-[#5d3a96] transition-colors">
                        <td className="py-3 px-4 text-white">{user.name}</td>
                        <td className="py-3 px-4 text-white">{user.email}</td>
                        <td className="py-3 px-4 text-white">{user.role}</td>
                        <td className="py-3 px-4">
                          <Badge className={user.status === "Active" ? "bg-green-500" : "bg-gray-500"}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#5d3a96] text-white hover:bg-[#5d3a96]"
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-400 text-red-400 hover:bg-red-500/20"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="roles" className="mt-6">
              <div className="bg-[#3b1c6a] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-4">System Roles</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-[#5d3a96] rounded-lg">
                    <div>
                      <p className="text-white font-medium">Principal</p>
                      <p className="text-purple-200 text-sm">Full system access and administration</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#5d3a96] text-white hover:bg-[#6d4aa6]">
                      Edit Permissions
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#5d3a96] rounded-lg">
                    <div>
                      <p className="text-white font-medium">Deputy Principal</p>
                      <p className="text-purple-200 text-sm">Manage leave requests and generate reports</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#5d3a96] text-white hover:bg-[#6d4aa6]">
                      Edit Permissions
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#5d3a96] rounded-lg">
                    <div>
                      <p className="text-white font-medium">Teacher</p>
                      <p className="text-purple-200 text-sm">Manage class leave requests</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#5d3a96] text-white hover:bg-[#6d4aa6]">
                      Edit Permissions
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#5d3a96] rounded-lg">
                    <div>
                      <p className="text-white font-medium">Student</p>
                      <p className="text-purple-200 text-sm">Submit and track leave requests</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#5d3a96] text-white hover:bg-[#6d4aa6]">
                      Edit Permissions
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="mt-6">
              <div className="bg-[#3b1c6a] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-4">Permission Settings</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-[#5d3a96] rounded-lg">
                    <h4 className="text-white font-medium mb-2">Leave Management</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="perm1" className="text-purple-200">
                          Create leave requests
                        </Label>
                        <div className="flex gap-2">
                          <Badge className="bg-green-500">Student</Badge>
                          <Badge className="bg-green-500">Teacher</Badge>
                          <Badge className="bg-green-500">Deputy</Badge>
                          <Badge className="bg-green-500">Principal</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="perm2" className="text-purple-200">
                          Approve leave requests
                        </Label>
                        <div className="flex gap-2">
                          <Badge className="bg-red-500">Student</Badge>
                          <Badge className="bg-green-500">Teacher</Badge>
                          <Badge className="bg-green-500">Deputy</Badge>
                          <Badge className="bg-green-500">Principal</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="perm3" className="text-purple-200">
                          Generate reports
                        </Label>
                        <div className="flex gap-2">
                          <Badge className="bg-red-500">Student</Badge>
                          <Badge className="bg-red-500">Teacher</Badge>
                          <Badge className="bg-green-500">Deputy</Badge>
                          <Badge className="bg-green-500">Principal</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#5d3a96] rounded-lg">
                    <h4 className="text-white font-medium mb-2">User Management</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="perm4" className="text-purple-200">
                          Create users
                        </Label>
                        <div className="flex gap-2">
                          <Badge className="bg-red-500">Student</Badge>
                          <Badge className="bg-red-500">Teacher</Badge>
                          <Badge className="bg-red-500">Deputy</Badge>
                          <Badge className="bg-green-500">Principal</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="perm5" className="text-purple-200">
                          Modify user roles
                        </Label>
                        <div className="flex gap-2">
                          <Badge className="bg-red-500">Student</Badge>
                          <Badge className="bg-red-500">Teacher</Badge>
                          <Badge className="bg-red-500">Deputy</Badge>
                          <Badge className="bg-green-500">Principal</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUserManagementDialog(false)}
              className="border-purple-300 text-purple-300 hover:bg-[#5d3a96] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]"
              onClick={() => {
                setShowUserManagementDialog(false)
                setTimeout(() => {
                  alert("User management changes saved successfully!")
                }, 100)
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="bg-[#4e2a85] border-[#5d3a96] text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>System Settings</DialogTitle>
            <DialogDescription className="text-purple-200">Configure system-wide settings</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="permissions">
            <TabsList className="bg-[#3b1c6a] border border-[#5d3a96] p-1">
              <TabsTrigger
                value="permissions"
                className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
              >
                Role Permissions
              </TabsTrigger>
              <TabsTrigger value="system" className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white">
                System Config
              </TabsTrigger>
              <TabsTrigger value="exports" className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white">
                Data Exports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="permissions" className="mt-4 space-y-4">
              <div className="bg-[#3b1c6a] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-4">Role Permissions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-[#5d3a96] rounded-lg">
                    <div>
                      <p className="text-white font-medium">Deputy Principal</p>
                      <p className="text-purple-200 text-sm">Manage leave requests and generate reports</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#5d3a96] text-white hover:bg-[#6d4aa6]">
                      Edit Permissions
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#5d3a96] rounded-lg">
                    <div>
                      <p className="text-white font-medium">Teacher</p>
                      <p className="text-purple-200 text-sm">Manage class leave requests</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#5d3a96] text-white hover:bg-[#6d4aa6]">
                      Edit Permissions
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#5d3a96] rounded-lg">
                    <div>
                      <p className="text-white font-medium">Student</p>
                      <p className="text-purple-200 text-sm">Submit and track leave requests</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#5d3a96] text-white hover:bg-[#6d4aa6]">
                      Edit Permissions
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="system" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schoolName" className="text-purple-200">
                  School Name
                </Label>
                <Input
                  id="schoolName"
                  defaultValue="Springfield High School"
                  className="bg-[#3b1c6a] border-[#5d3a96] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="academicYear" className="text-purple-200">
                  Current Academic Year
                </Label>
                <Select defaultValue="2024-2025">
                  <SelectTrigger id="academicYear" className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="maintenanceMode" className="text-purple-200">
                  Maintenance Mode
                </Label>
                <Switch id="maintenanceMode" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="enforcePasswordPolicy" className="text-purple-200">
                  Enforce Strong Password Policy
                </Label>
                <Switch id="enforcePasswordPolicy" defaultChecked />
              </div>
            </TabsContent>

            <TabsContent value="exports" className="mt-4 space-y-4">
              <div className="bg-[#3b1c6a] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Data Export Options</h3>
                <p className="text-purple-200 text-sm mb-4">Export system data for backup or analysis.</p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-[#5d3a96] rounded-lg">
                    <div>
                      <p className="text-white font-medium">Full System Backup</p>
                      <p className="text-purple-200 text-sm">Export all system data and configurations</p>
                    </div>
                    <Button size="sm" className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]">
                      <Download size={14} className="mr-1" />
                      Export
                    </Button>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-[#5d3a96] rounded-lg">
                    <div>
                      <p className="text-white font-medium">User Data</p>
                      <p className="text-purple-200 text-sm">Export all user accounts and profiles</p>
                    </div>
                    <Button size="sm" className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]">
                      <Download size={14} className="mr-1" />
                      Export
                    </Button>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-[#5d3a96] rounded-lg">
                    <div>
                      <p className="text-white font-medium">Leave Records</p>
                      <p className="text-purple-200 text-sm">Export all leave request data</p>
                    </div>
                    <Button size="sm" className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]">
                      <Download size={14} className="mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
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

