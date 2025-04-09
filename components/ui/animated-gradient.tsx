"use client"

import { type ButtonHTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedGradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  gradientColors?: string[]
  hoverScale?: number
  pulseEffect?: boolean
  glowEffect?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
}

export const AnimatedGradientButton = forwardRef<HTMLButtonElement, AnimatedGradientButtonProps>(
  (
    {
      children,
      className,
      gradientColors = ["#8b5cf6", "#ffd84d", "#ec4899"],
      hoverScale = 1.05,
      pulseEffect = true,
      glowEffect = true,
      ...props
    },
    ref,
  ) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(90deg, ${gradientColors.join(", ")})`,
      backgroundSize: "200% 100%",
    }

    return (
    <motion.button
      ref={ref}
      type={["submit", "reset", "button"].includes(props.type ?? "") ? (props.type as "submit" | "reset" | "button") : "button"}
      className={cn(
        "relative overflow-hidden rounded-full px-6 py-3 font-medium text-white shadow-md",
        glowEffect && "shadow-lg",
        className,
      )}
      style={gradientStyle}
      whileHover={{
        scale: hoverScale,
        backgroundPosition: "100% 0%",
      }}
      animate={
        pulseEffect
        ? {
            backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
          }
        : undefined
      }
      transition={
        pulseEffect
        ? {
            backgroundPosition: {
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            },
            scale: {
            duration: 0.2,
            },
          }
        : {
            duration: 0.3,
          }
      }
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}

      {glowEffect && (
        <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        whileHover={{ opacity: 0.4 }}
        style={{
          background: `radial-gradient(circle at center, ${gradientColors[1]}80 0%, transparent 70%)`,
          filter: "blur(15px)",
          zIndex: -1,
        }}
        />
      )}
    </motion.button>
    )
  },
)

AnimatedGradientButton.displayName = "AnimatedGradientButton"


