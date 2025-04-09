"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Calendar, FileText, Home, LogOut, Menu, Settings, Users, X, User, CheckCircle } from "lucide-react"

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"

export default function TeacherDashboard() {
  const [showLeaveDetailsDialog, setShowLeaveDetailsDialog] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)

  // Mock teacher data
  const teacher = {
    name: "Ms. Jennifer Parker",
    role: "Class Teacher - 10A",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock leave requests
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      student: "Alex Johnson",
      class: "10A",
      startDate: "2025-03-15",
      endDate: "2025-03-17",
      reason: "Doctor's appointment and recovery",
      status: "pending",
    },
    {
      id: 2,
      student: "Emma Davis",
      class: "10A",
      startDate: "2025-04-10",
      endDate: "2025-04-12",
      reason: "Sister's wedding ceremony",
      status: "pending",
    },
    {
      id: 3,
      student: "Michael Brown",
      class: "10A",
      startDate: "2025-03-20",
      endDate: "2025-03-22",
      reason: "Regional basketball tournament",
      status: "approved",
    },
    {
      id: 4,
      student: "Sophia Wilson",
      class: "10A",
      startDate: "2025-03-05",
      endDate: "2025-03-07",
      reason: "Dental procedure",
      status: "rejected",
    },
  ])

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New leave request from Alex Johnson requires your approval",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      message: "Principal has approved Michael Brown's leave request",
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      message: "Reminder: Class attendance report due tomorrow",
      time: "3 days ago",
      read: true,
    },
  ])

  interface Leave {
    id: number
    student: string
    class: string
    startDate: string
    endDate: string
    reason: string
    status: string
  }

  const handleViewDetails = (leave: Leave) => {
    setSelectedLeave(leave)
    setShowLeaveDetailsDialog(true)
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
      }

      setNotifications((prev) => [newNotification, ...prev])
    }

    // Close dialog first, then show alert
    setShowLeaveDetailsDialog(false)
    setTimeout(() => {
      alert(`Leave request #${id} rejected!`)
    }, 100)
  }

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
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
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b border-[#5d3a96] hover:bg-[#5d3a96] transition-colors ${notification.read ? "opacity-70" : ""}`}
                      >
                        <p className="text-white text-sm">{notification.message}</p>
                        <p className="text-purple-200 text-xs mt-1">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-purple-200">No notifications</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#3b1c6a] px-3 py-1 rounded-full flex items-center">
            <span className="text-white text-sm mr-1">Pending:</span>
            <span className="text-[#ffd84d] font-bold">
              {leaveRequests.filter((req) => req.status === "pending").length}
            </span>
          </div>

          <button
            className="text-white p-2 rounded-full hover:bg-[#5d3a96]"
            onClick={() => setShowSettingsDialog(true)}
          >
            <Settings size={20} />
          </button>

          <div className="hidden md:flex items-center gap-2">
            <Avatar>
              <AvatarImage src={teacher.avatar} alt={teacher.name} />
              <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">
                {teacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-white">{teacher.name}</span>
              <p className="text-xs text-purple-200">{teacher.role}</p>
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
                  <AvatarImage src={teacher.avatar} alt={teacher.name} />
                  <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">
                    {teacher.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{teacher.name}</p>
                  <p className="text-purple-200 text-xs">{teacher.role}</p>
                </div>
              </div>
              <nav className="space-y-2">
                <Link
                  href="/teacher/dashboard"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#5d3a96] text-white"
                >
                  <Home size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/teacher/leaves"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                  onClick={(e) => {
                    e.preventDefault()
                    alert("Navigating to Leave Requests page")
                  }}
                >
                  <FileText size={18} />
                  <span>Leave Requests</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    alert(
                      "Calendar functionality: This would display a calendar view of all leave requests for your class, allowing you to see absences by day, week, or month.",
                    )
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                >
                  <Calendar size={18} />
                  <span>Calendar</span>
                </button>
                <Link
                  href="/teacher/attendance"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                  onClick={(e) => {
                    e.preventDefault()
                    alert("Navigating to Class Attendance page")
                  }}
                >
                  <Users size={18} />
                  <span>Class Attendance</span>
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
        <aside className="hidden md:block w-64 bg-[#4e2a85] p-4">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#5d3a96]">
            <Avatar>
              <AvatarImage src={teacher.avatar} alt={teacher.name} />
              <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">
                {teacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium">{teacher.name}</p>
              <p className="text-purple-200 text-sm">{teacher.role}</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Link
              href="/teacher/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white"
            >
              <CheckCircle size={18} />
              <span>Approvals</span>
            </Link>
            <button
              onClick={() => {
                // Show a more detailed calendar functionality message
                alert(
                  "Calendar functionality: This would display a calendar view of all leave requests for your class, allowing you to see absences by day, week, or month.",
                )
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96] transition-colors"
            >
              <Calendar size={18} />
              <span>Calendar</span>
            </button>
            <Link
              href="/teacher/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96] transition-colors"
              onClick={(e) => {
                e.preventDefault()
                alert("Navigating to Profile page")
              }}
            >
              <User size={18} />
              <span>Profile</span>
            </Link>
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
        <main className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            {/* Welcome Banner */}
            <div className="bg-[#4e2a85] p-6 rounded-xl mb-8 relative overflow-hidden">
              <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#ffd84d] opacity-10 rounded-full"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2">Welcome, {teacher.name.split(" ")[1]}!</h2>
                <p className="text-purple-200">Manage leave requests for your class</p>
              </div>
            </div>

            {/* Notifications Section */}
            <Card className="bg-[#4e2a85] border-[#5d3a96] mb-8">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center">
                  <Bell className="mr-2 text-[#ffd84d]" size={18} />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {notifications.length > 0 ? (
                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 bg-[#3b1c6a] rounded-lg ${notification.read ? "opacity-70" : ""}`}
                      >
                        <p className="text-white text-sm">{notification.message}</p>
                        <p className="text-purple-200 text-xs mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-purple-200">No notifications at this time.</p>
                )}
              </CardContent>
            </Card>

            {/* Leave Requests */}
            <Card className="bg-[#4e2a85] border-[#5d3a96]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center">
                  <FileText className="mr-2 text-[#ffd84d]" size={18} />
                  Leave Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#5d3a96]">
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Student Name</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Start Date</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">End Date</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Reason</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveRequests.length > 0 ? (
                        leaveRequests.map((leave) => (
                          <tr key={leave.id} className="border-b border-[#5d3a96] hover:bg-[#5d3a96] transition-colors">
                            <td className="py-3 px-4 text-white">{leave.student}</td>
                            <td className="py-3 px-4 text-white">{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-white">{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-white">
                              {leave.reason.length > 20 ? leave.reason.substring(0, 20) + "..." : leave.reason}
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                className={`${
                                  leave.status === "approved"
                                    ? "bg-green-500"
                                    : leave.status === "rejected"
                                      ? "bg-red-500"
                                      : "bg-yellow-500"
                                }`}
                              >
                                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
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
                          <td colSpan={6} className="py-4 text-center text-purple-200">
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
                <Label className="text-purple-200">Teacher Comments</Label>
                <Textarea
                  placeholder="Add your comments here..."
                  className="bg-[#3b1c6a] border-[#5d3a96] text-white placeholder:text-purple-300 mt-1"
                />
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
                className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]"
                onClick={() => setShowLeaveDetailsDialog(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="bg-[#4e2a85] border-[#5d3a96] text-white">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription className="text-purple-200">Customize your account preferences</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="approvals">
            <TabsList className="bg-[#3b1c6a] border border-[#5d3a96] p-1">
              <TabsTrigger
                value="approvals"
                className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
              >
                Approval Shortcuts
              </TabsTrigger>
              <TabsTrigger value="alerts" className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white">
                Class Alerts
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white">
                2FA Setup
              </TabsTrigger>
            </TabsList>

            <TabsContent value="approvals" className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="quickApprove" className="text-purple-200">
                  Enable quick approval for medical leaves
                </Label>
                <Switch id="quickApprove" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="autoReject" className="text-purple-200">
                  Auto-reject leaves exceeding student limit
                </Label>
                <Switch id="autoReject" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultComment" className="text-purple-200">
                  Default approval comment
                </Label>
                <Textarea
                  id="defaultComment"
                  placeholder="Enter your default approval comment"
                  className="bg-[#3b1c6a] border-[#5d3a96] text-white placeholder:text-purple-300"
                  defaultValue="Approved as per school policy."
                />
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="attendanceAlert" className="text-purple-200">
                  Class attendance alerts
                </Label>
                <Switch id="attendanceAlert" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="thresholdAlert" className="text-purple-200">
                  Alert when class absence exceeds threshold
                </Label>
                <Switch id="thresholdAlert" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="absenceThreshold" className="text-purple-200">
                  Absence threshold percentage
                </Label>
                <Input
                  id="absenceThreshold"
                  type="number"
                  defaultValue="20"
                  className="bg-[#3b1c6a] border-[#5d3a96] text-white"
                />
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-4 space-y-4">
              <div className="bg-[#3b1c6a] p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Two-Factor Authentication</h3>
                <p className="text-purple-200 text-sm mb-4">
                  Enhance your account security by enabling two-factor authentication.
                </p>

                <div className="flex justify-center mb-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-gray-500">QR Code</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verificationCode" className="text-purple-200">
                    Verification Code
                  </Label>
                  <Input
                    id="verificationCode"
                    placeholder="Enter 6-digit code"
                    className="bg-[#3b1c6a] border-[#5d3a96] text-white placeholder:text-purple-300"
                  />
                </div>

                <Button className="w-full mt-4 bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]">Enable 2FA</Button>
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


  