"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState("student")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would authenticate the user here

    // Redirect based on user type
    if (userType === "student") {
      router.push("/student/dashboard")
    } else if (userType === "teacher") {
      router.push("/teacher/dashboard")
    } else if (userType === "deputy") {
      router.push("/deputy/dashboard")
    } else if (userType === "admin") {
      router.push("/admin/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-[#3b1c6a] flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-purple-200 hover:text-white">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to School Leave</h1>
            <p className="text-purple-200">Sign in to access your dashboard</p>
          </div>

          <div className="bg-[#4e2a85] rounded-xl p-6 shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userType" className="text-purple-200">
                    I am a
                  </Label>
                  <Select value={userType} onValueChange={setUserType}>
                    <SelectTrigger id="userType" className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="deputy">Deputy Principal</SelectItem>
                      <SelectItem value="admin">Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userId" className="text-purple-200">
                    Personal Email
                  </Label>
                  <Input
                    id="userId"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-[#3b1c6a] border-[#5d3a96] text-white placeholder:text-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-purple-200">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="bg-[#3b1c6a] border-[#5d3a96] text-white placeholder:text-purple-400"
                  />
                </div>

                <div className="flex justify-end">
                  <Link href="/forgot-password" className="text-sm text-purple-200 hover:text-white">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f] font-medium">
                  Sign In
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-[#5d3a96] text-center">
              <p className="text-purple-200 text-sm mb-2">Each user has their own personal account for secure access</p>
              <p className="text-purple-200">
                Don't have an account?{" "}
                <Link href="/register" className="text-[#ffd84d] hover:underline">
                  Contact administrator
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#3b1c6a] py-6 border-t border-[#5d3a96]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-purple-200">&copy; {new Date().getFullYear()} School Leave. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

