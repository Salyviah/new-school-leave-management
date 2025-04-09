import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function TeacherDashboardTemplate() {
  // Mock data for leave requests
  const todayRequests = [
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
          <h1 className="text-xl font-bold text-green-800">SchoolLeave Teacher</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-right">
              <div className="font-medium">Ms. Jennifer Parker</div>
              <div className="text-gray-500">Teacher on Duty</div>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Teacher" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h2>

          <div className="relative w-full md:w-64">
            <Input placeholder="Search by student name..." />
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Requests</CardTitle>
              <CardDescription>Pending approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">2</div>
              <p className="text-xs text-gray-500 mt-1">Updated just now</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Students on Leave</CardTitle>
              <CardDescription>Currently absent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">3</div>
              <p className="text-xs text-gray-500 mt-1">From all classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Duty Status</CardTitle>
              <CardDescription>March 16-22, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Active</div>
              <p className="text-xs text-gray-500 mt-1">Next: Ms. Thompson</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>Review and manage student leave applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="today">Today (2)</TabsTrigger>
                <TabsTrigger value="thisWeek">This Week (5)</TabsTrigger>
              </TabsList>

              <TabsContent value="today">
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 bg-gray-100 p-4 font-medium text-sm">
                    <div>Student</div>
                    <div>Class</div>
                    <div>Reason</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>

                  {todayRequests.map((request) => (
                    <div key={request.id} className="grid grid-cols-6 p-4 border-t text-sm">
                      <div>
                        <div className="font-medium">{request.student}</div>
                        <div className="text-gray-500 text-xs">#{request.admNo}</div>
                      </div>
                      <div className="self-center">{request.class}</div>
                      <div className="self-center">{request.reason}</div>
                      <div className="self-center">
                        {request.startDate} to {request.endDate}
                      </div>
                      <div className="self-center">
                        <Badge className="bg-yellow-500">Pending</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="thisWeek">
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 bg-gray-100 p-4 font-medium text-sm">
                    <div>Student</div>
                    <div>Class</div>
                    <div>Reason</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>

                  <div className="p-8 text-center text-gray-500">This week's leave requests will appear here</div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Dialog>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
            <DialogDescription>Request from John Smith (10A)</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Admission Number</h4>
                <p>12345</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Class</h4>
                <p>10A</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">From</h4>
                <p>2025-03-20</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">To</h4>
                <p>2025-03-21</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Reason</h4>
              <p>Medical appointment</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Supporting Documents</h4>
              <div className="border rounded p-2 text-sm text-gray-500">No documents attached</div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Comments</h4>
              <Textarea placeholder="Add your comments or notes about this request" className="mt-1" />
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
              Decline
            </Button>
            <Button className="bg-green-500 hover:bg-green-600">Approve Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

