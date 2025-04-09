"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button" // Adjust the path based on your project structure

interface TourStep {
  target: string
  title: string
  content: string
  position: "top" | "right" | "bottom" | "left"
}

interface TourGuideProps {
  steps: TourStep[]
  onComplete?: () => void
}

export function TourGuide({ steps, onComplete }: TourGuideProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    // Check if user has completed the tour
    const tourCompleted = localStorage.getItem("tourCompleted") === "true"
    if (tourCompleted) {
      return
    }

    // Start tour after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
      positionTooltip()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible) {
      positionTooltip()
    }
  }, [currentStep, isVisible])

  const positionTooltip = () => {
    if (currentStep >= steps.length) return

    const step = steps[currentStep]
    const targetElement = document.querySelector(step.target)

    if (!targetElement) return

    const rect = targetElement.getBoundingClientRect()
    const tooltipWidth = 300
    const tooltipHeight = 150
    const spacing = 12

    let top = 0
    let left = 0

    switch (step.position) {
      case "top":
        top = rect.top - tooltipHeight - spacing
        left = rect.left + rect.width / 2 - tooltipWidth / 2
        break
      case "right":
        top = rect.top + rect.height / 2 - tooltipHeight / 2
        left = rect.right + spacing
        break
      case "bottom":
        top = rect.bottom + spacing
        left = rect.left + rect.width / 2 - tooltipWidth / 2
        break
      case "left":
        top = rect.top + rect.height / 2 - tooltipHeight / 2
        left = rect.left - tooltipWidth - spacing
        break
    }

    // Keep tooltip within viewport
    top = Math.max(10, Math.min(window.innerHeight - tooltipHeight - 10, top))
    left = Math.max(10, Math.min(window.innerWidth - tooltipWidth - 10, left))

    setPosition({ top, left })

    // Highlight target element
    targetElement.classList.add("tour-highlight")

    return () => {
      targetElement.classList.remove("tour-highlight")
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      // Remove highlight from current element
      const currentTarget = document.querySelector(steps[currentStep].target)
      if (currentTarget) {
        currentTarget.classList.remove("tour-highlight")
      }

      setCurrentStep((prev) => prev + 1)
    } else {
      completeTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      // Remove highlight from current element
      const currentTarget = document.querySelector(steps[currentStep].target)
      if (currentTarget) {
        currentTarget.classList.remove("tour-highlight")
      }

      setCurrentStep((prev) => prev - 1)
    }
  }

  const completeTour = () => {
    setIsVisible(false)
    localStorage.setItem("tourCompleted", "true")

    // Remove highlight from last element
    const currentTarget = document.querySelector(steps[currentStep].target)
    if (currentTarget) {
      currentTarget.classList.remove("tour-highlight")
    }

    if (onComplete) {
      onComplete()
    }
  }

  if (!isVisible || currentStep >= steps.length) return null

  const step = steps[currentStep]

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[999]" />

      {/* Tooltip */}
      <div
        className="fixed z-[1000] w-[300px] bg-[#4e2a85] border border-[#5d3a96] rounded-lg shadow-lg p-4 transition-all duration-300"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-bold">{step.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full hover:bg-[#5d3a96] text-white"
            onClick={completeTour}
          >
            <X size={14} />
          </Button>
        </div>

        <p className="text-purple-200 text-sm mb-4">{step.content}</p>

        <div className="flex justify-between">
          <div>
            <Button
              variant="outline"
              size="sm"
              className="border-[#5d3a96] text-white hover:bg-[#5d3a96]"
              onClick={completeTour}
            >
              Skip
            </Button>
          </div>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="border-[#5d3a96] text-white hover:bg-[#5d3a96]"
                onClick={prevStep}
              >
                Previous
              </Button>
            )}
            <Button size="sm" className="bg-[#ffd84d] text-[#3b1c6a] hover:bg-[#ffce1f]" onClick={nextStep}>
              {currentStep < steps.length - 1 ? "Next" : "Finish"}
            </Button>
          </div>
        </div>
      </div>

      {/* Add global styles for highlighted elements */}
      <style jsx global>{`
        .tour-highlight {
          position: relative;
          z-index: 1000;
          box-shadow: 0 0 0 4px rgba(255, 216, 77, 0.5);
          border-radius: 4px;
        }
      `}</style>
    </>
  )
}

