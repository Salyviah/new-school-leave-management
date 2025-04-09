"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface ThreeDCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  depth?: number
}

export function ThreeDCard({ children, className = "", glowColor = "#ffd84d", depth = 20 }: ThreeDCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glowX, setGlowX] = useState(50)
  const [glowY, setGlowY] = useState(50)

  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Calculate mouse position relative to card (0 to 1)
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    // Calculate rotation (-15 to 15 degrees)
    const rotX = (y - 0.5) * -depth
    const rotY = (x - 0.5) * depth

    // Calculate glow position (0 to 100%)
    const glX = x * 100
    const glY = y * 100

    setRotateX(rotX)
    setRotateY(rotY)
    setGlowX(glX)
    setGlowY(glY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlowX(50)
    setGlowY(50)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-xl overflow-hidden perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}40 0%, transparent 50%)`,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

