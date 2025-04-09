"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, duration = 1000, className = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const previousValueRef = useRef(0)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    previousValueRef.current = displayValue
    startTimeRef.current = null

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      const newValue = Math.floor(previousValueRef.current + (value - previousValueRef.current) * progress)

      setDisplayValue(newValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [value, duration])

  return <span className={className}>{displayValue}</span>
}

