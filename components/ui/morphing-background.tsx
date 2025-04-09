"use client"

import { useEffect, useRef } from "react"

interface MorphingBackgroundProps {
  colors?: string[]
  speed?: number
  complexity?: number
  className?: string
}

export function MorphingBackground({
  colors = ["#3b1c6a", "#4e2a85", "#5d3a96", "#8b5cf6"],
  speed = 0.003,
  complexity = 5,
  className = "",
}: MorphingBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create gradient points
    interface GradientPoint {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
    }

    const points: GradientPoint[] = []
    for (let i = 0; i < complexity; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed * 100,
        vy: (Math.random() - 0.5) * speed * 100,
        radius: Math.random() * 300 + 100,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Animation loop
    let time = 0
    const animate = () => {
      time += speed

      // Clear canvas with base color
      ctx.fillStyle = colors[0]
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw gradient points
      for (const point of points) {
        // Update position with boundary check
        point.x += point.vx
        point.y += point.vy

        if (point.x < -point.radius) point.x = canvas.width + point.radius
        if (point.x > canvas.width + point.radius) point.x = -point.radius
        if (point.y < -point.radius) point.y = canvas.height + point.radius
        if (point.y > canvas.height + point.radius) point.y = -point.radius

        // Create radial gradient
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)

        gradient.addColorStop(0, point.color + "80") // Semi-transparent
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [colors, speed, complexity])

  return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 ${className}`} />
}

