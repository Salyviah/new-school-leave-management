"use client"

import type React from "react"

import { useState } from "react"
import { Grip, X, Plus, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog"
import { Checkbox } from "../../components/ui/checkbox"
import { Label } from "../../components/ui/label"

interface Widget {
  id: string
  title: string
  type: "stats" | "chart" | "calendar" | "notifications" | "activity"
  size: "small" | "medium" | "large"
  enabled: boolean
  position: number
}

export function DashboardWidgets() {
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: "w1", title: "Leave Statistics", type: "stats", size: "small", enabled: true, position: 0 },
    { id: "w2", title: "Monthly Trends", type: "chart", size: "medium", enabled: true, position: 1 },
    { id: "w3", title: "Upcoming Leaves", type: "calendar", size: "medium", enabled: true, position: 2 },
    { id: "w4", title: "Recent Notifications", type: "notifications", size: "small", enabled: true, position: 3 },
    { id: "w5", title: "Activity Feed", type: "activity", size: "large", enabled: false, position: 4 },
  ])

  const [isCustomizing, setIsCustomizing] = useState(false)
  const [showWidgetDialog, setShowWidgetDialog] = useState(false)
  const [draggedWidget, setDraggedWidget] = useState<Widget | null>(null)

  const handleDragStart = (widget: Widget) => {
    setDraggedWidget(widget)
  }

  const handleDragOver = (e: React.DragEvent, targetWidget: Widget) => {
    e.preventDefault()

    if (!draggedWidget || draggedWidget.id === targetWidget.id) return

    // Swap positions
    const updatedWidgets = widgets.map((w) => {
      if (w.id === draggedWidget.id) {
        return { ...w, position: targetWidget.position }
      }
      if (w.id === targetWidget.id) {
        return { ...w, position: draggedWidget.position }
      }
      return w
    })

    setWidgets(updatedWidgets)
  }

  const handleDragEnd = () => {
    setDraggedWidget(null)
  }

  const toggleWidget = (widgetId: string) => {
    setWidgets(widgets.map((widget) => (widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget)))
  }

  const getSortedEnabledWidgets = () => {
    return [...widgets].filter((widget) => widget.enabled).sort((a, b) => a.position - b.position)
  }

  return (
    <div className="space-y-4">
      {/* Customization Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Dashboard</h2>
        <div className="flex gap-2">
          {isCustomizing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-300 text-purple-300 hover:bg-[#5d3a96] hover:text-white"
                onClick={() => setShowWidgetDialog(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Widget
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-red-400 text-red-400 hover:bg-red-500/20 hover:text-red-400"
                onClick={() => setIsCustomizing(false)}
              >
                <X className="h-4 w-4 mr-1" />
                Done
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-purple-300 text-purple-300 hover:bg-[#5d3a96] hover:text-white"
              onClick={() => setIsCustomizing(true)}
            >
              <Settings className="h-4 w-4 mr-1" />
              Customize
            </Button>
          )}
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getSortedEnabledWidgets().map((widget) => (
          <div
            key={widget.id}
            className={`${
              widget.size === "small"
                ? "col-span-1"
                : widget.size === "medium"
                  ? "col-span-1 md:col-span-1 lg:col-span-1"
                  : "col-span-1 md:col-span-2 lg:col-span-3"
            }`}
            draggable={isCustomizing}
            onDragStart={() => handleDragStart(widget)}
            onDragOver={(e) => handleDragOver(e, widget)}
            onDragEnd={handleDragEnd}
          >
            <Card
              className={`bg-[#4e2a85] border-[#5d3a96] ${isCustomizing ? "ring-2 ring-[#ffd84d]/50 cursor-move" : ""}`}
            >
              <CardHeader className="pb-2 flex flex-row justify-between items-center">
                <CardTitle className="text-white flex items-center">
                  {isCustomizing && <Grip className="h-4 w-4 mr-2 text-purple-300" />}
                  {widget.title}
                </CardTitle>
                {isCustomizing && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full hover:bg-red-500/20 text-red-400"
                    onClick={() => toggleWidget(widget.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-center justify-center bg-[#5d3a96] rounded-md">
                  <p className="text-purple-200">Widget Content</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Add Widget Placeholder */}
        {isCustomizing && (
          <div className="col-span-1">
            <Button
              variant="outline"
              className="w-full h-40 border-dashed border-2 border-[#5d3a96] bg-transparent hover:bg-[#5d3a96]/20 text-purple-200"
              onClick={() => setShowWidgetDialog(true)}
            >
              <Plus className="h-6 w-6 mr-2" />
              Add Widget
            </Button>
          </div>
        )}
      </div>

      {/* Widget Selection Dialog */}
      <Dialog open={showWidgetDialog} onOpenChange={setShowWidgetDialog}>
        <DialogContent className="bg-[#4e2a85] border-[#5d3a96] text-white">
          <DialogHeader>
            <DialogTitle>Manage Widgets</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {widgets.map((widget) => (
              <div key={widget.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-[#5d3a96]">
                <Checkbox
                  id={widget.id}
                  checked={widget.enabled}
                  onCheckedChange={() => toggleWidget(widget.id)}
                  className="data-[state=checked]:bg-[#ffd84d] data-[state=checked]:text-[#3b1c6a]"
                />
                <Label htmlFor={widget.id} className="flex-1 cursor-pointer">
                  {widget.title}
                </Label>
                <span className="text-xs text-purple-300 px-2 py-1 bg-[#3b1c6a] rounded">{widget.size}</span>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              onClick={() => setShowWidgetDialog(false)}
              className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

