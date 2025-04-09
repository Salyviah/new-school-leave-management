"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea" // Ensure Textarea is exported from this path

interface LeaveEvent {
  id: string
  title: string
  startDate: Date
  endDate: Date
  type: string
  status: "pending" | "approved" | "rejected"
}

interface DragCalendarProps {
  events?: LeaveEvent[]
  onEventAdd?: (event: LeaveEvent) => void
  onEventUpdate?: (event: LeaveEvent) => void
  readOnly?: boolean
}

export function DragCalendar({ events = [], onEventAdd, onEventUpdate, readOnly = false }: DragCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<Date[]>([])
  const [dragStart, setDragStart] = useState<Date | null>(null)
  const [dragEnd, setDragEnd] = useState<Date | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<LeaveEvent | null>(null)
  const [newEvent, setNewEvent] = useState<Partial<LeaveEvent>>({
    title: "",
    type: "medical",
    status: "pending",
  })

  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    generateCalendarDays()
  }, [currentDate])

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // Get first day of month
    const firstDay = new Date(year, month, 1)
    const startingDayOfWeek = firstDay.getDay()

    // Get last day of month
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()

    // Generate array of days
    const days: Date[] = []

    // Add days from previous month
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i))
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    // Add days from next month to complete the grid (6 rows x 7 columns)
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i))
    }

    setCalendarDays(days)
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleMouseDown = (day: Date) => {
    if (readOnly) return

    setDragStart(day)
    setDragEnd(day)
    setIsDragging(true)
  }

  const handleMouseMove = (day: Date) => {
    if (!isDragging || readOnly) return

    setDragEnd(day)
  }

  const handleMouseUp = () => {
    if (!isDragging || !dragStart || !dragEnd || readOnly) return

    // Ensure start date is before end date
    const startDate = dragStart < dragEnd ? dragStart : dragEnd
    const endDate = dragStart < dragEnd ? dragEnd : dragStart

    setNewEvent({
      title: "",
      startDate,
      endDate,
      type: "medical",
      status: "pending",
    })

    setShowEventDialog(true)
    setIsDragging(false)
  }

  const handleEventClick = (event: LeaveEvent) => {
    setSelectedEvent(event)
    setShowEventDialog(true)
  }

  const handleSaveEvent = () => {
    if (!newEvent.startDate || !newEvent.endDate || !newEvent.title) return

    const event: LeaveEvent = {
      id: selectedEvent?.id || `event-${Date.now()}`,
      title: newEvent.title || "",
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      type: (newEvent.type as string) || "medical",
      status: (newEvent.status as "pending" | "approved" | "rejected") || "pending",
    }

    if (selectedEvent) {
      onEventUpdate?.(event)
    } else {
      onEventAdd?.(event)
    }

    setShowEventDialog(false)
    setSelectedEvent(null)
    setNewEvent({
      title: "",
      type: "medical",
      status: "pending",
    })
  }

  const isInRange = (day: Date) => {
    if (!dragStart || !dragEnd) return false

    const start = dragStart < dragEnd ? dragStart : dragEnd
    const end = dragStart < dragEnd ? dragEnd : dragStart

    return day >= start && day <= end
  }

  const getEventForDay = (day: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.startDate)
      const eventEnd = new Date(event.endDate)

      return day >= eventStart && day <= eventEnd
    })
  }

  const isCurrentMonth = (day: Date) => {
    return day.getMonth() === currentDate.getMonth()
  }

  const isToday = (day: Date) => {
    const today = new Date()
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="bg-[#4e2a85] rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[#5d3a96] text-white hover:bg-[#5d3a96]"
            onClick={handlePrevMonth}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-[#5d3a96] text-white hover:bg-[#5d3a96]"
            onClick={handleNextMonth}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 select-none" ref={calendarRef} onMouseUp={handleMouseUp}>
        {/* Weekday headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-purple-200 font-medium text-center py-2">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays.map((day, index) => {
          const dayEvents = getEventForDay(day)
          const inDragRange = isInRange(day)

          return (
            <div
              key={index}
              className={`
                min-h-24 p-1 rounded-md text-sm flex flex-col relative
                ${
                  !isCurrentMonth(day)
                    ? "bg-[#4e2a85] text-purple-300 opacity-50"
                    : isToday(day)
                      ? "bg-[#ffd84d]/20 text-white border border-[#ffd84d]"
                      : inDragRange && !readOnly
                        ? "bg-[#ffd84d]/30 text-white border border-[#ffd84d]"
                        : "bg-[#5d3a96] text-white hover:bg-[#6d4aa6] cursor-pointer"
                }
              `}
              onMouseDown={() => handleMouseDown(day)}
              onMouseMove={() => handleMouseMove(day)}
            >
              <div className="text-right mb-1">{day.getDate()}</div>

              {/* Events */}
              <div className="flex flex-col gap-1 overflow-y-auto max-h-20">
                {dayEvents.map((event, eventIndex) => (
                  <div
                    key={`${event.id}-${eventIndex}`}
                    className={`
                      text-xs p-1 rounded truncate cursor-pointer
                      ${
                        event.status === "approved"
                          ? "bg-green-500/20 text-green-300 border-l-2 border-green-500"
                          : event.status === "rejected"
                            ? "bg-red-500/20 text-red-300 border-l-2 border-red-500"
                            : "bg-yellow-500/20 text-yellow-300 border-l-2 border-yellow-500"
                      }
                    `}
                    onClick={() => handleEventClick(event)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Event Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="bg-[#4e2a85] border-[#5d3a96] text-white">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? "Edit Leave Request" : "New Leave Request"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={selectedEvent?.title || newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="bg-[#3b1c6a] border-[#5d3a96] text-white"
                placeholder="Enter leave title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={
                    selectedEvent?.startDate.toISOString().split("T")[0] ||
                    newEvent.startDate?.toISOString().split("T")[0]
                  }
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      startDate: new Date(e.target.value),
                    })
                  }
                  className="bg-[#3b1c6a] border-[#5d3a96] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={
                    selectedEvent?.endDate.toISOString().split("T")[0] || newEvent.endDate?.toISOString().split("T")[0]
                  }
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      endDate: new Date(e.target.value),
                    })
                  }
                  className="bg-[#3b1c6a] border-[#5d3a96] text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Leave Type</Label>
              <Select
                value={selectedEvent?.type || newEvent.type}
                onValueChange={(value: string) => setNewEvent({ ...newEvent, type: value })}
              >
                <SelectTrigger id="type" className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent className="bg-[#3b1c6a] border-[#5d3a96] text-white">
                  <SelectItem value="medical">Medical Leave</SelectItem>
                  <SelectItem value="family">Family Event</SelectItem>
                  <SelectItem value="sports">Sports Competition</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                placeholder="Provide details about your leave request"
                className="bg-[#3b1c6a] border-[#5d3a96] text-white min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEventDialog(false)}
              className="border-purple-300 text-purple-300 hover:bg-[#5d3a96] hover:text-white"
            >
              Cancel
            </Button>
            <Button onClick={handleSaveEvent} className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]">
              {selectedEvent ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

