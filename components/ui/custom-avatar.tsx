"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

interface CustomAvatarProps {
  name: string
  image?: string
  onAvatarChange?: (image: string) => void
}

export function CustomAvatar({ name, image, onAvatarChange }: CustomAvatarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(image || "")
  const [activeTab, setActiveTab] = useState("avatars")

  // Sample avatar options
  const avatarOptions = [
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
  ]

  // Sample color options
  const colorOptions = [
    "#ffd84d", // Yellow
    "#22c55e", // Green
    "#3b82f6", // Blue
    "#ec4899", // Pink
    "#8b5cf6", // Purple
    "#f97316", // Orange
    "#ef4444", // Red
    "#06b6d4", // Cyan
  ]

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar)
  }

  const handleSave = () => {
    if (onAvatarChange && selectedAvatar) {
      onAvatarChange(selectedAvatar)
    }
    setIsDialogOpen(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  return (
    <>
      <Avatar
        className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-[#ffd84d] transition-all duration-300"
        onClick={() => setIsDialogOpen(true)}
      >
        <AvatarImage src={image} alt={name} />
        <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">{getInitials(name)}</AvatarFallback>
      </Avatar>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#4e2a85] border-[#5d3a96] text-white">
          <DialogHeader>
            <DialogTitle>Customize Your Avatar</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="avatars" onValueChange={setActiveTab}>
            <TabsList className="bg-[#3b1c6a] border border-[#5d3a96] p-1">
              <TabsTrigger value="avatars" className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white">
                Avatars
              </TabsTrigger>
              <TabsTrigger value="colors" className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white">
                Colors
              </TabsTrigger>
              <TabsTrigger value="upload" className="data-[state=active]:bg-[#5d3a96] data-[state=active]:text-white">
                Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="avatars" className="mt-4">
              <div className="grid grid-cols-4 gap-4">
                {avatarOptions.map((avatar, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-lg p-2 ${
                      selectedAvatar === avatar ? "bg-[#ffd84d]/20 ring-2 ring-[#ffd84d]" : "hover:bg-[#5d3a96]"
                    }`}
                    onClick={() => handleAvatarSelect(avatar)}
                  >
                    <Avatar className="h-16 w-16 mx-auto">
                      <AvatarImage src={avatar} alt="Avatar option" />
                    </Avatar>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="colors" className="mt-4">
              <div className="grid grid-cols-4 gap-4">
                {colorOptions.map((color, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-lg p-2 ${
                      selectedAvatar === `color:${color}`
                        ? "bg-[#ffd84d]/20 ring-2 ring-[#ffd84d]"
                        : "hover:bg-[#5d3a96]"
                    }`}
                    onClick={() => handleAvatarSelect(`color:${color}`)}
                  >
                    <div
                      className="h-16 w-16 rounded-full mx-auto flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      <span className="text-[#3b1c6a] font-bold text-lg">{getInitials(name)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upload" className="mt-4">
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#5d3a96] rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-300 mb-4"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
                <p className="text-purple-200 mb-2">Drag and drop your image here</p>
                <p className="text-purple-300 text-sm mb-4">or</p>
                <Button className="bg-[#5d3a96] hover:bg-[#6d4aa6] text-white">Browse Files</Button>
                <p className="text-purple-300 text-xs mt-4">Supported formats: JPG, PNG, GIF (max 2MB)</p>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-purple-300 text-purple-300 hover:bg-[#5d3a96] hover:text-white"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

