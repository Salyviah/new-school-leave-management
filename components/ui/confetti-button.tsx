"use client"

import type React from "react"

import { useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"

interface ConfettiButtonProps extends ButtonProps {
  confettiColors?: string[]
  particleCount?: number
}

export function ConfettiButton({
  children,
  confettiColors = ["#ffd84d", "#c4ff40", "#8b5cf6", "#3b82f6", "#22c55e"],
  particleCount = 50,
  ...props
}: ConfettiButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e)

    if (isAnimating) return

    setIsAnimating(true)

    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Create confetti particles
    for (let i = 0; i < particleCount; i++) {
      createParticle(centerX, centerY, confettiColors)
    }

    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  const createParticle = (x: number, y: number, colors: string[]) => {
    const particle = document.createElement("div")
    document.body.appendChild(particle)

    // Random properties
    const size = Math.floor(Math.random() * 10 + 5)
    const color = colors[Math.floor(Math.random() * colors.length)]
    const angle = Math.random() * Math.PI * 2
    const velocity = Math.random() * 6 + 2
    const velocityX = Math.cos(angle) * velocity
    const velocityY = Math.sin(angle) * velocity
    const rotation = Math.random() * 520
    const rotationSpeed = Math.random() * 20 - 10

    // Set initial styles
    particle.style.position = "fixed"
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.backgroundColor = color
    particle.style.borderRadius = "50%"
    particle.style.zIndex = "9999"
    particle.style.pointerEvents = "none"
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    particle.style.transform = `rotate(${rotation}deg)`

    let posX = x
    let posY = y
    let currentRotation = rotation
    let opacity = 1
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime

      if (elapsed > 1000) {
        particle.remove()
        return
      }

      posX += velocityX
      posY += velocityY + elapsed * 0.001 // Add gravity
      currentRotation += rotationSpeed
      opacity = 1 - elapsed / 1000

      particle.style.left = `${posX}px`
      particle.style.top = `${posY}px`
      particle.style.transform = `rotate(${currentRotation}deg)`
      particle.style.opacity = opacity.toString()

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

