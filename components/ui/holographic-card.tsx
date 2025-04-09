"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface HolographicCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function HolographicCard({ children, className = "", intensity = 0.2 }: HolographicCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Calculate mouse position relative to card center (-1 to 1)
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

    setRotateY(x * 10 * intensity) // -10 to 10 degrees
    setRotateX(-y * 10 * intensity) // -10 to 10 degrees
    setMouseX(e.clientX - rect.left)
    setMouseY(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Holographic overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay"
        style={{
          background: `
            linear-gradient(
              to right,
              rgba(255, 0, 0, 0.5),
              rgba(255, 255, 0, 0.5),
              rgba(0, 255, 0, 0.5),
              rgba(0, 255, 255, 0.5),
              rgba(0, 0, 255, 0.5),
              rgba(255, 0, 255, 0.5)
            )
          `,
          backgroundSize: "200% 200%",
          backgroundPosition: `${cardRef.current ? (mouseX / cardRef.current.offsetWidth) * 100 : 0}% ${cardRef.current ? (mouseY / cardRef.current.offsetHeight) * 100 : 0}%`,
        }}
      />

      {/* Light reflection */}
      <div
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.8) 0%, transparent 50%)`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

