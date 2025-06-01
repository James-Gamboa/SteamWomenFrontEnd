"use client"

import { useEffect, useState, useRef } from "react"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

function Counter({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) {
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
    <div ref={counterRef} className="text-center">
      <div
        className="mb-2 font-bold text-3xl sm:text-4xl lg:text-5xl"
        style={{
          color: "#8B5CF6",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: "600",
        }}
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
    </div>
  )
}

export function StatisticsSection() {
  const stats = [
    {
      number: 500,
      suffix: "+",
      label: "Oportunidades publicadas",
      description: "Oportunidades publicadas en nuestra plataforma",
    },
    {
      number: 10000,
      suffix: "+",
      label: "Mujeres alcanzadas",
      description: "Mujeres alcanzadas por nuestra comunidad",
    },
    {
      number: 15,
      suffix: "",
      label: "Países en Latinoamérica",
      description: "Presencia en países de Latinoamérica",
    },
    {
      number: 85,
      suffix: "%",
      label: "Tasa de participación",
      description: "Tasa de participación en eventos y oportunidades",
    },
  ]

  return (
    <section className="py-12 lg:py-20" style={{ backgroundColor: "#F1F0FB" }}>
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className="mb-4 font-bold text-2xl sm:text-3xl lg:text-4xl"
            style={{
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
              lineHeight: "1.2",
            }}
          >
            Nuestro Impacto en Números
          </h2>
          <p
            className="max-w-2xl mx-auto text-base sm:text-lg"
            style={{
              color: "#8E9196",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "400",
              lineHeight: "1.6",
            }}
          >
            Datos que reflejan el crecimiento y el impacto de nuestra comunidad en el ecosistema STEAM
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 lg:p-8 rounded-lg border transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C8C8C9",
              }}
            >
              <Counter end={stat.number} suffix={stat.suffix} duration={3500 + index * 200} />
              <h3
                className="mb-2 font-bold text-center text-lg lg:text-xl"
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                  lineHeight: "1.3",
                }}
              >
                {stat.label}
              </h3>
              <p
                className="text-center text-sm lg:text-base"
                style={{
                  color: "#8E9196",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                  lineHeight: "1.5",
                }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
