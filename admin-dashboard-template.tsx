"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminDashboardTemplate() {
  // Mock data for leave requests
  const pendingRequests = [
    {
      id: 1,
      student: "John Smith",
      admNo: "12345",
      class: "10A",
      reason: "Medical appointment",
      startDate: "2025-03-20",
      endDate: "2025-03-21",
      status: "pending",
    },
    {
      id: 2,
      student: "Emily Johnson",
      admNo: "12346",
      class: "11B",
      reason: "Family event",
      startDate: "2025-04-05",
      endDate: "2025-04-07",
      status: "pending",
    },
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
            <span className="ml-2 text-lg font-bold text-purple-400">ADMIN</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-right">
              <div className="font-medium">Dr. Robert Williams</div>
              <div className="text-gray-400">Principal</div>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
              <AvatarFallback className="bg-purple-900 text-purple-100">RW</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-white">Leave Management Dashboard</h2>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Input
                placeholder="Search by name or ID..."
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gray-800 border-purple-900 shadow-lg shadow-purple-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{pendingRequests.length}</div>
              <p className="text-xs text-gray-400 mt-1">Updated just now</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-purple-900 shadow-lg shadow-purple-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Approved This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">15</div>
              <p className="text-xs text-gray-400 mt-1">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-purple-900 shadow-lg shadow-purple-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Declined This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">3</div>
              <p className="text-xs text-gray-400 mt-1">-2 from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800 border-purple-900 shadow-lg shadow-purple-900/20">
          <CardHeader>
            <CardTitle className="text-white">Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="space-y-4">
              <TabsList className="bg-gray-700 border border-purple-900">
                <TabsTrigger value="pending" className="data-[state=active]:bg-purple-900">
                  Pending ({pendingRequests.length})
                </TabsTrigger>
                <TabsTrigger value="approved" className="data-[state=active]:bg-purple-900">
                  Approved (15)
                </TabsTrigger>
                <TabsTrigger value="declined" className="data-[state=active]:bg-purple-900">
                  Declined (3)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                <div className="rounded-md border border-gray-700 overflow-hidden">
                  <div className="grid grid-cols-7 bg-gray-700 p-4 font-medium text-gray-200 text-sm">
                    <div>Student</div>
                    <div>Class</div>
                    <div>Reason</div>
                    <div>From</div>
                    <div>To</div>
                    <div>Duration</div>
                    <div>Actions</div>
                  </div>

                  {pendingRequests.map((request) => (
                    <div key={request.id} className="grid grid-cols-7 p-4 border-t border-gray-700 text-sm">
                      <div>
                        <div className="font-medium text-white">{request.student}</div>
                        <div className="text-gray-400 text-xs">#{request.admNo}</div>
                      </div>
                      <div className="self-center text-gray-300">{request.class}</div>
                      <div className="self-center text-gray-300">{request.reason}</div>
                      <div className="self-center text-gray-300">{request.startDate}</div>
                      <div className="self-center text-gray-300">{request.endDate}</div>
                      <div className="self-center text-gray-300">2 days</div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-900/20">
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="approved">
                <div className="p-8 text-center text-gray-400">Approved leave requests will appear here</div>
              </TabsContent>

              <TabsContent value="declined">
                <div className="p-8 text-center text-gray-400">Declined leave requests will appear here</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

