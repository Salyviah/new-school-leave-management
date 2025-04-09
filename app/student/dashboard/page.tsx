"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Calendar, FileText, Home, LogOut, Menu, Settings, X, User } from "lucide-react"

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function StudentDashboard() {
  const [showLeaveDialog, setShowLeaveDialog] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [leaveFormData, setLeaveFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  })

  // Mock student data
  const student = {
    name: "Alex Johnson",
    id: "S12345",
    class: "Grade 10A",
  }

  // Mock leave history
  const [leaveHistory, setLeaveHistory] = useState([
    {
      id: 1,
      startDate: "2025-03-15",
      endDate: "2025-03-17",
      reason: "Doctor's appointment and recovery",
      status: "approved",
    },
    {
      id: 2,
      startDate: "2025-02-10",
      endDate: "2025-02-12",
      reason: "Family event",
      status: "rejected",
    },
    {
      id: 3,
      startDate: "2025-01-20",
      endDate: "2025-01-22",
      reason: "Personal reasons",
      status: "approved",
    },
  ])

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Your leave request for March 15-17 has been approved",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      message: "Your leave request for February 10-12 has been rejected",
      time: "3 days ago",
      read: false,
    },
    {
      id: 3,
      message: "New school policy update regarding leave requests",
      time: "1 week ago",
      read: true,
    },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setLeaveFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmitLeave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form
    if (!leaveFormData.startDate || !leaveFormData.endDate || !leaveFormData.reason) {
      alert("Please fill in all fields")
      return
    }

    // Create new leave request
    const newLeave = {
      id: leaveHistory.length + 1,
      startDate: leaveFormData.startDate,
      endDate: leaveFormData.endDate,
      reason: leaveFormData.reason,
      status: "pending",
    }

    // Add to history
    setLeaveHistory((prev) => [newLeave, ...prev])

    // Add notification
    const newNotification = {
      id: notifications.length + 1,
      message: `Your leave request for ${new Date(leaveFormData.startDate).toLocaleDateString()} to ${new Date(leaveFormData.endDate).toLocaleDateString()} has been submitted`,
      time: "Just now",
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Reset form
    setLeaveFormData({
      startDate: "",
      endDate: "",
      reason: "",
    })

    setShowLeaveDialog(false)

    // Show success message
    setTimeout(() => {
      alert("Leave request submitted successfully!")
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

          <button
            className="text-white p-2 rounded-full hover:bg-[#5d3a96]"
            onClick={() => setShowSettingsDialog(true)}
          >
            <Settings size={20} />
          </button>

          <div className="hidden md:flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={student.name} />
              <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-white">{student.name}</span>
              <p className="text-xs text-purple-200">{student.class}</p>
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
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={student.name} />
                  <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{student.name}</p>
                  <p className="text-purple-200 text-xs">{student.class}</p>
                </div>
              </div>
              <nav className="space-y-2">
                <Link
                  href="/student/dashboard"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#5d3a96] text-white"
                >
                  <Home size={18} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setShowLeaveDialog(true)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                >
                  <FileText size={18} />
                  <span>Apply for Leave</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    // Scroll to the leave history section
                    document.getElementById("leave-history-section")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96]"
                >
                  <Calendar size={18} />
                  <span>Leave History</span>
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
        <aside className="hidden md:block w-64 bg-[#4e2a85] p-4">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#5d3a96]">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={student.name} />
              <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium">{student.name}</p>
              <p className="text-purple-200 text-sm">{student.class}</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Link
              href="/student/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white"
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <button
              onClick={() => setShowLeaveDialog(true)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96] transition-colors"
            >
              <FileText size={18} />
              <span>Apply for Leave</span>
            </button>
            <button
              onClick={() => {
                // Instead of navigating, we'll just scroll to the history section
                document.getElementById("leave-history-section")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-[#5d3a96] transition-colors"
            >
              <Calendar size={18} />
              <span>Leave History</span>
            </button>
            <Link
              href="/student/profile"
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
                <h2 className="text-2xl font-bold text-white mb-2">Welcome, {student.name.split(" ")[0]}!</h2>
                <p className="text-purple-200">Apply for leave and track your leave history</p>
                <Button
                  className="mt-4 bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]"
                  onClick={() => setShowLeaveDialog(true)}
                >
                  Apply for Leave
                </Button>
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

            {/* Leave History */}
            <Card id="leave-history-section" className="bg-[#4e2a85] border-[#5d3a96]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center">
                  <Calendar className="mr-2 text-[#ffd84d]" size={18} />
                  Leave History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#5d3a96]">
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Start Date</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">End Date</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Reason</th>
                        <th className="text-left py-3 px-4 text-purple-200 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveHistory.length > 0 ? (
                        leaveHistory.map((leave) => (
                          <tr key={leave.id} className="border-b border-[#5d3a96] hover:bg-[#5d3a96] transition-colors">
                            <td className="py-3 px-4 text-white">{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-white">{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-white">{leave.reason}</td>
                            <td className="py-3 px-4">
                              <Badge
                                className={`${leave.status === "approved"
                                  ? "bg-green-500"
                                  : leave.status === "rejected"
                                    ? "bg-red-500"
                                    : "bg-yellow-500"
                                  }`}
                              >
                                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                              </Badge>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-4 text-center text-purple-200">
                            No leave history found
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

      {/* Apply for Leave Dialog */}
      <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <DialogContent className="bg-[#4e2a85] border-[#5d3a96] text-white">
          <DialogHeader>
            <DialogTitle>Apply for Leave</DialogTitle>
            <DialogDescription className="text-purple-200">
              Fill out the form below to submit your leave request
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitLeave}>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-purple-200">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    className="bg-[#3b1c6a] border-[#5d3a96] text-white"
                    value={leaveFormData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-purple-200">
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    className="bg-[#3b1c6a] border-[#5d3a96] text-white"
                    value={leaveFormData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason" className="text-purple-200">
                  Reason for Leave
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide details about your leave request"
                  className="bg-[#3b1c6a] border-[#5d3a96] text-white placeholder:text-purple-300 min-h-[100px]"
                  value={leaveFormData.reason}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowLeaveDialog(false)}
                className="border-purple-300 text-purple-300 hover:bg-[#5d3a96] hover:text-white"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]">
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="bg-[#4e2a85] border-[#5d3a96] text-white">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription className="text-purple-200">Customize your account preferences</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="notifications">
            <TabsList className="bg-[#3b1c6a] border border-[#5d3a96] p-1">
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger value="password" className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white">
                Password
              </TabsTrigger>
              <TabsTrigger value="theme" className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white">
                Theme
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications" className="text-purple-200">
                  Email notifications
                </Label>
                <Switch id="emailNotifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="leaveUpdates" className="text-purple-200">
                  Leave request updates
                </Label>
                <Switch id="leaveUpdates" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="systemAnnouncements" className="text-purple-200">
                  System announcements
                </Label>
                <Switch id="systemAnnouncements" defaultChecked />
              </div>
            </TabsContent>

            <TabsContent value="password" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-purple-200">
                  Current Password
                </Label>
                <Input id="currentPassword" type="password" className="bg-[#3b1c6a] border-[#5d3a96] text-white" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-purple-200">
                  New Password
                </Label>
                <Input id="newPassword" type="password" className="bg-[#3b1c6a] border-[#5d3a96] text-white" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-purple-200">
                  Confirm New Password
                </Label>
                <Input id="confirmPassword" type="password" className="bg-[#3b1c6a] border-[#5d3a96] text-white" />
              </div>
            </TabsContent>

            <TabsContent value="theme" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-purple-200">Theme Mode</Label>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div
                    className="bg-white p-4 rounded-lg cursor-pointer border-2 border-transparent hover:border-[#ffd84d] transition-all"
                    onClick={() => document.documentElement.classList.remove("dark")}
                  >
                    <div className="h-20 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                      <div className="w-12 h-4 bg-gray-300 rounded-full"></div>
                    </div>
                    <p className="text-gray-800 text-center font-medium">Light</p>
                  </div>
                  <div
                    className="bg-[#1a1025] p-4 rounded-lg cursor-pointer border-2 border-[#ffd84d] transition-all"
                    onClick={() => document.documentElement.classList.add("dark")}
                  >
                    <div className="h-20 bg-[#3b1c6a] rounded-md mb-2 flex items-center justify-center">
                      <div className="w-12 h-4 bg-[#5d3a96] rounded-full"></div>
                    </div>
                    <p className="text-white text-center font-medium">Dark</p>
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

