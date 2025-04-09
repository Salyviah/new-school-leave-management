"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, X, Send, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your EduLeave assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample responses for demo purposes
  const sampleResponses = [
    {
      keywords: ["leave", "request", "apply"],
      response:
        "To apply for leave, go to your dashboard and click on the 'Apply for Leave' button. Fill out the form with your leave details and submit it for approval.",
    },
    {
      keywords: ["status", "check", "approved"],
      response:
        "You can check the status of your leave requests in the 'My Leaves' tab on your dashboard. It will show whether your request is pending, approved, or rejected.",
    },
    {
      keywords: ["policy", "rules", "guidelines"],
      response:
        "According to our school policy, students are allowed up to 15 days of leave per semester. Medical leaves require proper documentation from a healthcare provider.",
    },
    {
      keywords: ["cancel", "delete", "withdraw"],
      response:
        "To cancel a leave request, go to 'My Leaves', find the request you want to cancel, and click on the 'Cancel Request' button. Note that you can only cancel pending requests.",
    },
    {
      keywords: ["hello", "hi", "hey"],
      response: "Hello! How can I assist you with EduLeave today?",
    },
  ]

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const response = getAIResponse(input)

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response,
        sender: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (query: string) => {
    // Simple keyword matching for demo
    const lowerQuery = query.toLowerCase()

    for (const item of sampleResponses) {
      if (item.keywords.some((keyword) => lowerQuery.includes(keyword))) {
        return item.response
      }
    }

    return "I'm not sure how to help with that specific question. Please contact the school administration for more information."
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      // Simulate speech recognition
      setTimeout(() => {
        setInput("How do I apply for leave?")
        setIsRecording(false)
      }, 3000)
    }
  }

  return (
    <>
      {/* Chat button */}
      <button
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${isOpen ? "bg-red-500 hover:bg-red-600" : "bg-[#ffd84d] hover:bg-[#ffce1f]"
          }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-[#3b1c6a]" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] bg-[#4e2a85] rounded-xl shadow-xl flex flex-col border border-[#5d3a96] overflow-hidden">
          {/* Header */}
          <div className="bg-[#3b1c6a] p-4 flex items-center border-b border-[#5d3a96]">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Assistant" />
              <AvatarFallback className="bg-[#ffd84d] text-[#3b1c6a]">AI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-white font-medium">EduLeave Assistant</h3>
              <p className="text-purple-200 text-xs">Always here to help</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-[#ffd84d] text-[#3b1c6a]" : "bg-[#5d3a96] text-white"
                    }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="bg-[#5d3a96] text-white max-w-[80%] rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-white animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-white animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-white animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#5d3a96] bg-[#3b1c6a]">
            <div className="flex items-center">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-[#4e2a85] border-[#5d3a96] text-white placeholder:text-purple-300"
              />
              <Button
                className="ml-2 text-white hover:bg-[#5d3a96]"
                onClick={toggleRecording}
              >
                {isRecording ? <MicOff className="h-5 w-5 text-red-400" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Button
                className="ml-1 text-white hover:bg-[#5d3a96]"
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

