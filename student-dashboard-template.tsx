"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StudentDashboardTemplate() {
  // Mock data for student leave requests
  const leaveRequests = [
    { id: 1, reason: "Medical appointment", startDate: "2025-03-20", endDate: "2025-03-21", status: "approved" },
    { id: 2, reason: "Family event", startDate: "2025-04-05", endDate: "2025-04-07", status: "pending" },
    { id: 3, reason: "Sports competition", startDate: "2025-05-10", endDate: "2025-05-12", status: "declined" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header with hexagon pattern background */}
      <header className="bg-gray-800 border-b border-blue-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544v-2.26zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413 7.07-7.07v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 11.8l7.07 7.414v-.002zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%233b82f6' fillOpacity='0.4' fillRule='evenodd'/%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center relative z-10">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-400">School</span>
            <span className="text-xl font-bold text-white">Leave</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-right">
              <div className="font-medium">John Smith</div>
              <div className="text-gray-400">Class 10A • Adm #12345</div>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Student" />
              <AvatarFallback className="bg-blue-900 text-blue-100">JS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Student Dashboard</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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
              className="mr-2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Leave Request
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-gray-800 border border-blue-900">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-900">
              Overview
            </TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-blue-900">
              My Requests
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-900">
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gray-800 border-blue-900 shadow-lg shadow-blue-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Leave Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">7 days</div>
                  <p className="text-xs text-gray-400 mt-1">Out of 15 allowed days</p>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "46%" }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-blue-900 shadow-lg shadow-blue-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-500">1</div>
                  <p className="text-xs text-gray-400 mt-1">Last updated: Today</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-blue-900 shadow-lg shadow-blue-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Next Class Test</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">Mar 25</div>
                  <p className="text-xs text-gray-400 mt-1">Mathematics</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-blue-900 shadow-lg shadow-blue-900/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Leave Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between border-b border-gray-700 pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <h4 className="font-medium text-white">{request.reason}</h4>
                        <p className="text-sm text-gray-400">
                          {request.startDate} to {request.endDate}
                        </p>
                      </div>
                      <Badge
                        className={
                          request.status === "approved"
                            ? "bg-green-600 hover:bg-green-700"
                            : request.status === "pending"
                              ? "bg-yellow-600 hover:bg-yellow-700"
                              : "bg-red-600 hover:bg-red-700"
                        }
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card className="bg-gray-800 border-blue-900 shadow-lg shadow-blue-900/20">
              <CardHeader>
                <CardTitle className="text-white">All Leave Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-700 overflow-hidden">
                  <div className="grid grid-cols-5 bg-gray-700 p-4 font-medium text-gray-200">
                    <div>Reason</div>
                    <div>From</div>
                    <div>To</div>
                    <div>Duration</div>
                    <div>Status</div>
                  </div>
                  {leaveRequests.map((request) => (
                    <div key={request.id} className="grid grid-cols-5 p-4 border-t border-gray-700">
                      <div className="text-white">{request.reason}</div>
                      <div className="text-gray-300">{request.startDate}</div>
                      <div className="text-gray-300">{request.endDate}</div>
                      <div className="text-gray-300">3 days</div>
                      <div>
                        <Badge
                          className={
                            request.status === "approved"
                              ? "bg-green-600 hover:bg-green-700"
                              : request.status === "pending"
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : "bg-red-600 hover:bg-red-700"
                          }
                        >
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="bg-gray-800 border-blue-900 shadow-lg shadow-blue-900/20">
              <CardHeader>
                <CardTitle className="text-white">Student Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Student" />
                      <AvatarFallback className="text-2xl bg-blue-900 text-blue-100">JS</AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 border-blue-700 text-blue-400 hover:bg-blue-900/20"
                    >
                      Change Photo
                    </Button>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Full Name</h4>
                        <p className="text-white">John Smith</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Admission Number</h4>
                        <p className="text-white">12345</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Class</h4>
                        <p className="text-white">10A</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Gender</h4>
                        <p className="text-white">Male</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Date of Birth</h4>
                        <p className="text-white">15 May 2008</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Contact Number</h4>
                        <p className="text-white">+1 234 567 8901</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

