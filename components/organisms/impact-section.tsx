"use client"

import { useEffect, useState, useRef } from "react"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
}

function Counter({ end, duration = 2000, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isVisible, end, duration])

  return (
    <div
      ref={counterRef}
      className="mb-2 font-bold"
      style={{
        fontSize: "60px",
        lineHeight: "85px",
        color: "#A78BFA",
        fontFamily: "DM Sans, sans-serif",
        fontWeight: "600",
      }}
    >
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export function ImpactSection() {
  const stats = [
    {
      number: 500,
      suffix: "+",
      label: "Oportunidades publicadas",
    },
    {
      number: 10000,
      suffix: "+",
      label: "Mujeres alcanzadas",
    },
    {
      number: 15,
      suffix: "",
      label: "Países en Latinoamérica",
    },
    {
      number: 85,
      suffix: "%",
      label: "Tasa de participación",
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: "#1A1F2C" }}>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(139, 92, 246, 0.5), rgba(14, 165, 233, 0.5))",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2
            className="mb-4 font-bold"
            style={{
              fontSize: "48px",
              lineHeight: "65px",
              color: "#FFFFFF",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
            }}
          >
            Nuestro impacto
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <Counter
                end={stat.number}
                suffix={stat.suffix}
                duration={2500 + index * 200}
              />
              <div
                style={{
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#C8C8C9",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
