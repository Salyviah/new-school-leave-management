"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
  glowColor?: string
}

export function GlassmorphicCard({
  children,
  className,
  hoverEffect = true,
  glowColor = "#ffd84d",
}: GlassmorphicCardProps) {
  return (
    <motion.div
      className={cn(
        "relative backdrop-blur-md bg-[#4e2a85]/70 border border-[#8b5cf6]/30 rounded-xl overflow-hidden",
        hoverEffect && "hover:shadow-lg transition-all duration-300",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hoverEffect ? { scale: 1.02, transition: { duration: 0.2 } } : undefined}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}40 0%, transparent 70%)`,
          zIndex: -1,
        }}
      />

      {/* Gradient border */}
      <div className="absolute inset-0 rounded-xl p-[1px] overflow-hidden">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8b5cf6] via-[#ffd84d] to-[#8b5cf6] opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

