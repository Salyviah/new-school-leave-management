import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DeputyDashboardTemplate() {
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-800">SchoolLeave Deputy</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-right">
              <div className="font-medium">Mrs. Sarah Johnson</div>
              <div className="text-gray-500">Deputy Principal</div>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Deputy" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Deputy Principal Dashboard</h2>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Input placeholder="Search by name or ID..." />
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
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <CardDescription>Awaiting your approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">2</div>
              <p className="text-xs text-gray-500 mt-1">Updated just now</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Teacher on Duty</CardTitle>
              <CardDescription>Current week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ms. Parker</div>
              <p className="text-xs text-gray-500 mt-1">Until March 22, 2025</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <CardDescription>School-wide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">96.5%</div>
              <p className="text-xs text-gray-500 mt-1">+0.5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>Manage student leave applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">Pending (2)</TabsTrigger>
                <TabsTrigger value="approved">Approved (15)</TabsTrigger>
                <TabsTrigger value="declined">Declined (3)</TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 bg-gray-100 p-4 font-medium text-sm">
                    <div>Student</div>
                    <div>Class</div>
                    <div>Reason</div>
                    <div>From</div>
                    <div>To</div>
                    <div>Duration</div>
                    <div>Actions</div>
                  </div>

                  {pendingRequests.map((request) => (
                    <div key={request.id} className="grid grid-cols-7 p-4 border-t text-sm">
                      <div>
                        <div className="font-medium">{request.student}</div>
                        <div className="text-gray-500 text-xs">#{request.admNo}</div>
                      </div>
                      <div className="self-center">{request.class}</div>
                      <div className="self-center">{request.reason}</div>
                      <div className="self-center">{request.startDate}</div>
                      <div className="self-center">{request.endDate}</div>
                      <div className="self-center">2 days</div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="approved">
                <div className="p-8 text-center text-gray-500">Approved leave requests will appear here</div>
              </TabsContent>

              <TabsContent value="declined">
                <div className="p-8 text-center text-gray-500">Declined leave requests will appear here</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
