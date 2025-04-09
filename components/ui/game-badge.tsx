"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

interface GameBadgeProps {
  title: string
  description: string
  icon: React.ReactNode
  level: number
  maxLevel: number
  xp: number
  xpRequired: number
  isNew?: boolean
}

export function GameBadge({
  title,
  description,
  icon,
  level,
  maxLevel,
  xp,
  xpRequired,
  isNew = false,
}: GameBadgeProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasShownNew, setHasShownNew] = useState(false)

  // Handle new badge animation
  useEffect(() => {
    if (isNew && !hasShownNew) {
      setIsAnimating(true)

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      const timer = setTimeout(() => {
        setIsAnimating(false)
        setHasShownNew(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isNew, hasShownNew])

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.div
        className={`bg-[#4e2a85] rounded-xl overflow-hidden cursor-pointer group ${
          level === maxLevel ? "border-2 border-[#ffd84d]" : ""
        }`}
        onClick={() => setShowDetails(!showDetails)}
        animate={
          isAnimating
            ? {
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0],
                boxShadow: [
                  "0 0 0 rgba(255, 216, 77, 0)",
                  "0 0 20px rgba(255, 216, 77, 0.7)",
                  "0 0 0 rgba(255, 216, 77, 0)",
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: isAnimating ? Number.POSITIVE_INFINITY : 0,
          repeatType: "loop",
        }}
      >
        {/* Badge content */}
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  level === maxLevel ? "bg-[#ffd84d] text-[#3b1c6a]" : "bg-[#8b5cf6] text-white"
                }`}
              >
                {icon}
              </div>

              {/* Level indicator */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#3b1c6a] border-2 border-[#4e2a85] flex items-center justify-center text-white text-xs font-bold">
                {level}
              </div>
            </div>

            <h4 className="text-white font-bold mb-2">{title}</h4>
            <p className="text-purple-200 text-sm mb-4">{description}</p>

            {/* XP Progress */}
            <div className="w-full bg-[#3b1c6a] h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#ffd84d]"
                initial={{ width: 0 }}
                animate={{ width: `${(xp / xpRequired) * 100}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            <p className="text-purple-200 text-xs mt-2">
              {xp}/{xpRequired} XP
            </p>
          </div>
        </div>

        {/* Expand/collapse indicator */}
        <div className="absolute bottom-2 right-2">
          <motion.div animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-200"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
        </div>

        {/* "New" badge */}
        {isNew && !hasShownNew && (
          <div className="absolute -top-2 -right-2">
            <motion.div
              className="bg-[#ffd84d] text-[#3b1c6a] text-xs font-bold px-2 py-1 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              NEW!
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Details panel */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="mt-2 bg-[#3b1c6a] rounded-xl p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h5 className="text-white font-bold mb-2">How to level up:</h5>
            <ul className="text-purple-200 text-sm space-y-2">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#ffd84d] mr-2 mt-1"
                >
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                Complete tasks to earn XP
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#ffd84d] mr-2 mt-1"
                >
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                Reach level {maxLevel} to master this badge
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#ffd84d] mr-2 mt-1"
                >
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                Unlock special rewards at max level
              </li>
            </ul>

            {level === maxLevel && (
              <div className="mt-4 bg-[#ffd84d]/20 rounded-lg p-3 border border-[#ffd84d]/30">
                <p className="text-[#ffd84d] font-medium">Congratulations! You've mastered this badge!</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

