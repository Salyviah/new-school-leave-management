"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ChartData {
  label: string
  value: number
  color: string
}

interface InteractiveChartProps {
  data: ChartData[]
  title?: string
  height?: number
  animationDuration?: number
  showValues?: boolean
  type?: "bar" | "pie" | "donut"
}

export function InteractiveChart({
  data,
  title,
  height = 300,
  animationDuration = 1,
  showValues = true,
  type = "bar",
}: InteractiveChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current)
      }
    }
  }, [])

  const maxValue = Math.max(...data.map((item) => item.value))

  const renderBarChart = () => (
    <div className="flex items-end h-full gap-2 pt-6">
      {data.map((item, index) => {
        const percentage = (item.value / maxValue) * 100

        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center gap-2"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              className="relative w-full rounded-t-md"
              style={{ backgroundColor: item.color }}
              initial={{ height: 0 }}
              animate={{ height: isVisible ? `${percentage}%` : 0 }}
              transition={{ duration: animationDuration, delay: index * 0.1 }}
            >
              {(hoveredIndex === index || !showValues) && (
                <motion.div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#3b1c6a] text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {item.value}
                </motion.div>
              )}
            </motion.div>
            <span className="text-xs text-purple-200 truncate max-w-full">{item.label}</span>
          </div>
        )
      })}
    </div>
  )

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let cumulativePercentage = 0

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const startAngle = (cumulativePercentage / 100) * 360
            const endAngle = ((cumulativePercentage + percentage) / 100) * 360

            // Calculate SVG arc path
            const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180))
            const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180))
            const endX = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180))
            const endY = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180))

            const largeArcFlag = percentage > 50 ? 1 : 0

            const pathData = [
              `M 50 50`,
              `L ${startX} ${startY}`,
              `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `Z`,
            ].join(" ")

            cumulativePercentage += percentage

            return (
              <motion.path
                key={index}
                d={pathData}
                fill={item.color}
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                  transformOrigin: "center",
                  transition: "transform 0.2s ease-out",
                }}
              />
            )
          })}

          {type === "donut" && <circle cx="50" cy="50" r="20" fill="#4e2a85" />}
        </svg>

        {hoveredIndex !== null && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#3b1c6a] text-white px-3 py-2 rounded text-sm">
              <p className="font-bold">{data[hoveredIndex].label}</p>
              <p>
                {data[hoveredIndex].value} ({((data[hoveredIndex].value / total) * 100).toFixed(1)}%)
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={chartRef} className="w-full" style={{ height: `${height}px` }}>
      {title && <h3 className="text-white font-bold mb-4">{title}</h3>}

      {type === "bar" ? renderBarChart() : renderPieChart()}

      {showValues && type === "bar" && (
        <div className="flex justify-between mt-2">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <motion.span
                className="text-white font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + animationDuration }}
              >
                {item.value}
              </motion.span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

