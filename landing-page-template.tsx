import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPageTemplate() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">SchoolLeave</h1>
          <div className="flex gap-4">
            <Button variant="outline">Login</Button>
            <Button>Register</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">School Leave Management System</h2>
          <p className="text-xl text-gray-600">
            Streamline leave requests and approvals for your educational institution
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-blue-700">For Students</CardTitle>
              <CardDescription>Submit and track leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                <img
                  src="/placeholder.svg?height=160&width=280"
                  alt="Student dashboard preview"
                  className="h-32 w-auto"
                />
              </div>
              <p className="text-gray-600">
                Submit leave requests with all required details and track approval status.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Student Login</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-green-700">For Teachers</CardTitle>
              <CardDescription>Review and manage student leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-green-100 rounded-md flex items-center justify-center mb-4">
                <img
                  src="/placeholder.svg?height=160&width=280"
                  alt="Teacher dashboard preview"
                  className="h-32 w-auto"
                />
              </div>
              <p className="text-gray-600">Review, approve or decline student leave requests as the teacher on duty.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700">Teacher Login</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-purple-700">For Administration</CardTitle>
              <CardDescription>Complete oversight of all leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-purple-100 rounded-md flex items-center justify-center mb-4">
                <img
                  src="/placeholder.svg?height=160&width=280"
                  alt="Admin dashboard preview"
                  className="h-32 w-auto"
                />
              </div>
              <p className="text-gray-600">Principal and deputy principal dashboard for complete leave management.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Admin Login</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
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
                  className="text-blue-700"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Role-Based Access</h4>
                <p className="text-gray-600">Different permissions for students, teachers, and administrators</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
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
                  className="text-blue-700"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Comprehensive Forms</h4>
                <p className="text-gray-600">Capture all essential student details for leave requests</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
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
                  className="text-blue-700"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Secure Access</h4>
                <p className="text-gray-600">Protected routes and data security measures</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
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
                  className="text-blue-700"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Notifications</h4>
                <p className="text-gray-600">Real-time updates on leave request status changes</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t mt-20 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} SchoolLeave Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

