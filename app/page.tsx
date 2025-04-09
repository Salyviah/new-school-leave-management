"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"

export default function HomePage() {
  // Mock data for the dashboard preview
  const pendingRequests = 2
  const totalRequests = 5
  const approvedRequests = 8
  const totalAllowed = 10
  const leaveBalance = 60

  // Calendar data - highlighted dates
  const highlightedDates = [4, 9, 13, 16, 17, 23, 24]

  // Generate calendar days
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const calendarDays = Array.from({ length: 28 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-[#3b1c6a]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <div className="inline-block px-4 py-2 rounded-full bg-[#4e2a85] text-white text-sm mb-6">
              School Leave Management System
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Manage student leaves <span className="text-[#ffd84d]">efficiently</span>
            </h1>
            <p className="text-lg text-purple-200 mb-8 max-w-lg">
              Streamline leave requests, approvals, and tracking for students and staff with our intuitive platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/login">
                <Button className="bg-[#ffd84d] hover:bg-[#ffce1f] text-[#3b1c6a] font-medium text-lg px-6 py-6 h-auto rounded-full">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                className="border border-white text-white hover:bg-white/10 font-medium text-lg px-6 py-6 h-auto rounded-full"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="bg-[#4e2a85] rounded-3xl p-6 shadow-xl">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white">School Leave</h2>
              <p className="text-purple-200">Student Dashboard</p>
              <div className="inline-block px-3 py-1 bg-[#ffd84d] text-[#3b1c6a] font-medium rounded-full text-sm mt-2">
                User-friendly app
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Pending Requests Card */}
              <div className="bg-[#5d3a96] rounded-xl p-4">
                <p className="text-purple-200 mb-1">Pending</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white">{pendingRequests}</span>
                  <span className="text-xl text-white">/{totalRequests}</span>
                </div>
                <p className="text-purple-200 text-sm">requests</p>
              </div>

              {/* Approved Requests Card */}
              <div className="bg-[#5d3a96] rounded-xl p-4">
                <p className="text-purple-200 mb-1">Approved</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white">{approvedRequests}</span>
                  <span className="text-xl text-white">/{totalAllowed}</span>
                </div>
                <p className="text-purple-200 text-sm">this semester</p>
              </div>
            </div>

            {/* Leave Balance */}
            <div className="bg-[#5d3a96] rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-purple-200">Leave Balance</p>
                <p className="text-[#ffd84d] font-bold">{leaveBalance}%</p>
              </div>
              <div className="h-2 bg-[#3b1c6a] rounded-full overflow-hidden">
                <div className="h-full bg-[#ffd84d] rounded-full" style={{ width: `${leaveBalance}%` }}></div>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-[#5d3a96] rounded-xl p-4">
              <div className="grid grid-cols-7 gap-2 text-center">
                {days.map((day, index) => (
                  <div key={index} className="text-purple-200 text-sm">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((day) => (
                  <div
                    key={day}
                    className={`aspect-square flex items-center justify-center rounded-md text-sm
                      ${highlightedDates.includes(day) ? "bg-[#ffd84d] text-[#3b1c6a] font-medium" : "bg-[#4e2a85] text-white"}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[#3b1c6a] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-purple-200 max-w-3xl mx-auto">
              Our platform provides comprehensive tools for managing student and staff leave requests efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#4e2a85] rounded-xl p-6 relative">
              <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#ffd84d] flex items-center justify-center text-[#3b1c6a] font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-white mt-4 mb-3">Easy Submissions</h3>
              <p className="text-purple-200">
                Submit leave requests with just a few clicks and attach necessary documents.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#4e2a85] rounded-xl p-6 relative">
              <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#ffd84d] flex items-center justify-center text-[#3b1c6a] font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-white mt-4 mb-3">Quick Approvals</h3>
              <p className="text-purple-200">
                Streamlined approval process with notifications for all parties involved.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#4e2a85] rounded-xl p-6 relative">
              <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#ffd84d] flex items-center justify-center text-[#3b1c6a] font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-white mt-4 mb-3">Real-time Tracking</h3>
              <p className="text-purple-200">
                Monitor leave status and history with comprehensive dashboards and reports.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Roles Section */}
      <div className="bg-[#4e2a85] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Tailored For Every Role</h2>
            <p className="text-purple-200 max-w-3xl mx-auto">
              School Leave provides customized dashboards for each user role in the leave management process
            </p>
          </div>

          {/* Student Dashboard */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 bg-[#ffd84d] text-[#3b1c6a] font-medium rounded-full text-sm mb-4">
                  STUDENT DASHBOARD
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Submit & Track Your Leaves</h3>
                <p className="text-purple-200 mb-6">
                  Students can easily submit leave requests, track their status, and view their leave history all in one
                  place.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ffd84d]/20 flex items-center justify-center text-[#ffd84d]">
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
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <p className="text-white">Submit leave requests with supporting documents</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ffd84d]/20 flex items-center justify-center text-[#ffd84d]">
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
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                    </div>
                    <p className="text-white">View leave history and upcoming leaves</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ffd84d]/20 flex items-center justify-center text-[#ffd84d]">
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
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <p className="text-white">Receive real-time notifications on request status</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-[#3b1c6a] rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-[#5d3a96] rounded-lg p-3">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-white font-bold">Student Dashboard</h3>
                        <p className="text-purple-200 text-sm">Alex Johnson</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-[#4e2a85] rounded-lg p-3">
                        <p className="text-white font-medium mb-2">Leave Balance</p>
                        <div className="h-2 bg-[#3b1c6a] rounded-full overflow-hidden">
                          <div className="h-full bg-[#ffd84d] rounded-full" style={{ width: "60%" }}></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <p className="text-purple-200 text-xs">Used: 6 days</p>
                          <p className="text-purple-200 text-xs">Remaining: 9 days</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#4e2a85] rounded-lg p-3 flex justify-between items-center">
                          <div>
                            <p className="text-white font-medium">Pending</p>
                            <p className="text-purple-200 text-xs">2 requests</p>
                          </div>
                          <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">2</span>
                        </div>
                        <div className="bg-[#4e2a85] rounded-lg p-3 flex justify-between items-center">
                          <div>
                            <p className="text-white font-medium">Approved</p>
                            <p className="text-purple-200 text-xs">8 requests</p>
                          </div>
                          <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Dashboard */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 bg-[#ec4899] text-white font-medium rounded-full text-sm mb-4">
                  TEACHER DASHBOARD
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Approve & Manage Student Leaves</h3>
                <p className="text-purple-200 mb-6">
                  Teachers can efficiently review and approve student leave requests, track class attendance, and manage
                  leave calendars.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ec4899]/20 flex items-center justify-center text-[#ec4899]">
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
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <p className="text-white">Approve or reject student leave requests</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ec4899]/20 flex items-center justify-center text-[#ec4899]">
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
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <p className="text-white">View class attendance and leave patterns</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ec4899]/20 flex items-center justify-center text-[#ec4899]">
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
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                    </div>
                    <p className="text-white">Manage leave calendar for your class</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-[#3b1c6a] rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-[#5d3a96] rounded-lg p-3">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-white font-bold">Teacher Dashboard</h3>
                        <p className="text-purple-200 text-sm">Ms. Jennifer Parker</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-[#4e2a85] rounded-lg p-3">
                        <p className="text-white font-medium mb-2">Pending Approvals</p>
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="h-2 bg-[#3b1c6a] rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-500 rounded-full" style={{ width: "40%" }}></div>
                            </div>
                          </div>
                          <span className="ml-3 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">5</span>
                        </div>
                      </div>
                      <div className="bg-[#4e2a85] rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-white font-medium">Recent Requests</p>
                          <span className="text-purple-200 text-xs">View all</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-[#3b1c6a] rounded-lg">
                            <div>
                              <p className="text-white text-sm">Alex Johnson</p>
                              <p className="text-purple-200 text-xs">Medical Leave • 3 days</p>
                            </div>
                            <div className="flex gap-1">
                              <button className="p-1 bg-green-500 rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-white"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </button>
                              <button className="p-1 bg-red-500 rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-white"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-[#3b1c6a] rounded-lg">
                            <div>
                              <p className="text-white text-sm">Emma Davis</p>
                              <p className="text-purple-200 text-xs">Family Event • 2 days</p>
                            </div>
                            <div className="flex gap-1">
                              <button className="p-1 bg-green-500 rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-white"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </button>
                              <button className="p-1 bg-red-500 rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-white"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deputy Principal Dashboard */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 bg-[#3b82f6] text-white font-medium rounded-full text-sm mb-4">
                  DEPUTY PRINCIPAL DASHBOARD
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Analyze & Oversee Leave Management</h3>
                <p className="text-purple-200 mb-6">
                  Deputy Principals can analyze school-wide leave patterns, handle escalated cases, and generate
                  comprehensive reports.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6]">
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
                      >
                        <path d="M3 3v18h18" />
                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                      </svg>
                    </div>
                    <p className="text-white">Access school-wide leave analytics</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6]">
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
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <p className="text-white">Handle escalated leave requests</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6]">
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
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" x2="12" y1="3" y2="15" />
                      </svg>
                    </div>
                    <p className="text-white">Generate detailed reports for administration</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-[#3b1c6a] rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-[#5d3a96] rounded-lg p-3">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-white font-bold">Deputy Principal Dashboard</h3>
                        <p className="text-purple-200 text-sm">Mr. Robert Chen</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#4e2a85] rounded-lg p-3">
                          <p className="text-white font-medium mb-2">Escalated Cases</p>
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-white">2</span>
                            <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                              Urgent
                            </span>
                          </div>
                        </div>
                        <div className="bg-[#4e2a85] rounded-lg p-3">
                          <p className="text-white font-medium mb-2">Total Requests</p>
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-white">24</span>
                            <span className="ml-2 text-green-400 text-xs">↑ 12%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#4e2a85] rounded-lg p-3">
                        <p className="text-white font-medium mb-2">Leave Distribution</p>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#ffd84d] mr-2"></div>
                            <span className="text-purple-200 text-xs">Medical</span>
                          </div>
                          <span className="text-white text-xs">45%</span>
                        </div>
                        <div className="h-2 bg-[#3b1c6a] rounded-full overflow-hidden mb-2">
                          <div className="h-full bg-[#ffd84d] rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#3b82f6] mr-2"></div>
                            <span className="text-purple-200 text-xs">Family</span>
                          </div>
                          <span className="text-white text-xs">30%</span>
                        </div>
                        <div className="h-2 bg-[#3b1c6a] rounded-full overflow-hidden mb-2">
                          <div className="h-full bg-[#3b82f6] rounded-full" style={{ width: "30%" }}></div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#ec4899] mr-2"></div>
                            <span className="text-purple-200 text-xs">Other</span>
                          </div>
                          <span className="text-white text-xs">25%</span>
                        </div>
                        <div className="h-2 bg-[#3b1c6a] rounded-full overflow-hidden">
                          <div className="h-full bg-[#ec4899] rounded-full" style={{ width: "25%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Principal Dashboard */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 bg-[#f59e0b] text-white font-medium rounded-full text-sm mb-4">
                  PRINCIPAL DASHBOARD
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Complete System Administration</h3>
                <p className="text-purple-200 mb-6">
                  Principals have full administrative control over the system, including user management, policy
                  configuration, and system-wide settings.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b]">
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
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" x2="20" y1="8" y2="14" />
                        <line x1="23" x2="17" y1="11" y2="11" />
                      </svg>
                    </div>
                    <p className="text-white">Manage user accounts and permissions</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b]">
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
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <p className="text-white">Configure leave policies and rules</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b]">
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
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    </div>
                    <p className="text-white">Access system-wide settings and reports</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-[#3b1c6a] rounded-xl p-4 shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-[#5d3a96] rounded-lg p-3">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-white font-bold">Principal Dashboard</h3>
                        <p className="text-purple-200 text-sm">Dr. Sarah Williams</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-[#4e2a85] rounded-lg p-3">
                          <p className="text-white font-medium text-sm">Users</p>
                          <p className="text-2xl font-bold text-white">42</p>
                        </div>
                        <div className="bg-[#4e2a85] rounded-lg p-3">
                          <p className="text-white font-medium text-sm">Pending</p>
                          <p className="text-2xl font-bold text-white">3</p>
                        </div>
                        <div className="bg-[#4e2a85] rounded-lg p-3">
                          <p className="text-white font-medium text-sm">Approved</p>
                          <p className="text-2xl font-bold text-white">15</p>
                        </div>
                      </div>
                      <div className="bg-[#4e2a85] rounded-lg p-3">
                        <p className="text-white font-medium mb-2">System Status</p>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-purple-200 text-sm">Database</p>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                            <span className="text-green-400 text-xs">Online</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-purple-200 text-sm">API Services</p>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                            <span className="text-green-400 text-xs">Online</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-purple-200 text-sm">Notifications</p>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                            <span className="text-green-400 text-xs">Active</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#4e2a85] rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-white font-medium">Quick Actions</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="bg-[#3b1c6a] text-white text-xs p-2 rounded-lg hover:bg-[#6d4aa6]">
                            User Management
                          </button>
                          <button className="bg-[#3b1c6a] text-white text-xs p-2 rounded-lg hover:bg-[#6d4aa6]">
                            Generate Reports
                          </button>
                          <button className="bg-[#3b1c6a] text-white text-xs p-2 rounded-lg hover:bg-[#6d4aa6]">
                            System Settings
                          </button>
                          <button className="bg-[#3b1c6a] text-white text-xs p-2 rounded-lg hover:bg-[#6d4aa6]">
                            Policy Config
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-[#4e2a85] py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to simplify leave management?</h2>
              <p className="text-purple-200 mb-6">
                Sign in with your personal email to access your dedicated dashboard
              </p>
              <Link href="/login">
                <Button className="bg-[#ffd84d] hover:bg-[#ffce1f] text-[#3b1c6a] font-medium text-lg px-8 py-6 h-auto rounded-full">
                  Sign In Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#3b1c6a] py-8 border-t border-[#5d3a96]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-white">School Leave</h2>
              <p className="text-purple-200">School Leave Management System</p>
            </div>
            <div className="text-purple-200">&copy; {new Date().getFullYear()} School Leave. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

