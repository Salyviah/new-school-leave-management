"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function LeaveRequestFormTemplate() {
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-4 text-gray-300 hover:text-white hover:bg-gray-700">
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
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </Button>
            <h1 className="text-xl font-bold text-white">New Leave Request</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto bg-gray-800 border-blue-900 shadow-lg shadow-blue-900/20">
          <CardHeader>
            <CardTitle className="text-white">Submit Leave Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="leaveType" className="text-gray-300">
                    Leave Type
                  </Label>
                  <Select>
                    <SelectTrigger id="leaveType" className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600 text-white">
                      <SelectItem value="medical">Medical Leave</SelectItem>
                      <SelectItem value="family">Family Emergency</SelectItem>
                      <SelectItem value="sports">Sports Event</SelectItem>
                      <SelectItem value="religious">Religious Holiday</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-gray-300">
                      Start Date
                    </Label>
                    <Input id="startDate" type="date" className="bg-gray-700 border-gray-600 text-white" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-gray-300">
                      End Date
                    </Label>
                    <Input id="endDate" type="date" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reason" className="text-gray-300">
                    Reason for Leave
                  </Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide detailed information about your leave request"
                    className="min-h-[120px] bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label htmlFor="attachment" className="text-gray-300">
                    Supporting Documents (Optional)
                  </Label>
                  <Input id="attachment" type="file" className="bg-gray-700 border-gray-600 text-white" />
                  <p className="text-xs text-gray-400 mt-1">
                    Upload medical certificates or other relevant documents (PDF, JPG, PNG)
                  </p>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="parentConsent" className="border-gray-600 data-[state=checked]:bg-blue-600" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="parentConsent" className="text-sm font-medium leading-none text-gray-300">
                      Parent/Guardian Consent
                    </Label>
                    <p className="text-sm text-gray-400">
                      I confirm that my parent/guardian is aware of this leave request
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Submit Request
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

