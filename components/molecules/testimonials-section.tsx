"use client"

import * as React from "react"
import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const carouselRef = useRef<any>(null)

  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Ingeniera de Software",
      company: "TechCR",
      image: "img/women-testimonia-2.jpg",
      testimonial:
        "STEAMWomen me ayudó a conectar con mentoras increíbles que me guiaron en mi carrera. Gracias a esta comunidad, pude conseguir mi trabajo soñado en una startup tecnológica.",
    },
    {
      id: 2,
      name: "Ana Rodríguez",
      role: "Científica de Datos",
      company: "DataCR",
      image: "img/women-testimonia-3.jpg",
      testimonial:
        "La plataforma me permitió acceder a oportunidades que no sabía que existían. Los eventos de networking han sido fundamentales para mi desarrollo profesional.",
    },
    {
      id: 3,
      name: "Carmen Jiménez",
      role: "Investigadora en IA",
      company: "Universidad de Costa Rica",
      image: "img/women-testimonial-4.jpg",
      testimonial:
        "Como investigadora, encontré en STEAMWomen una comunidad que entiende los desafíos únicos que enfrentamos las mujeres en ciencia y tecnología.",
    },
    {
      id: 4,
      name: "Sofía Vargas",
      role: "Desarrolladora Frontend",
      company: "InnovaCR",
      image: "img/women-testimonial.jpg",
      testimonial:
        "Los talleres y workshops de STEAMWomen me dieron las herramientas técnicas y la confianza que necesitaba para avanzar en mi carrera como desarrolladora.",
    },
    {
      id: 5,
      name: "Lucía Herrera",
      role: "Emprendedora Tech",
      company: "StartupCR",
      image: "img/women-testimonial-5jpg.jpg",
      testimonial:
        "STEAMWomen no solo me conectó con oportunidades, sino que me inspiró a crear mi propia empresa. La mentoría que recibí fue invaluable.",
    },
  ]

  const nextTestimonial = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo(currentTestimonial + 1)
    }
  }

  const prevTestimonial = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo(currentTestimonial - 1)
    }
  }

  const handleSlideChange = (index: number) => {
    setCurrentTestimonial(index)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <section className="py-12 lg:py-20 bg-[#1A1F2C]">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl text-white font-dm-sans font-semibold leading-tight">
            Lo que dicen nuestras usuarias
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#C8C8C9] font-dm-sans font-normal leading-relaxed">
            Historias reales de mujeres que han transformado sus carreras a través de STEAMWomen
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto select-none">
          <Carousel
            className="transition-transform duration-300 ease-in-out"
            opts={{ 
              containScroll: "trimSnaps",
              loop: false,
              dragFree: false,
              align: "center",
              skipSnaps: false
            }}
            setApi={(api) => {
              if (api && api.selectedScrollSnap) {
                api.on("select", () => {
                  setCurrentTestimonial(api.selectedScrollSnap())
                })
              }
              carouselRef.current = api
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="transition-all duration-300 ease-in-out">
                  <Card className="border-0 shadow-2xl overflow-hidden bg-[#F1F0FB]">
                    <CardContent className="p-8 lg:p-12">
                      <div className="flex flex-col lg:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className={`w-32 h-32 lg:w-38 lg:h-38 rounded-full bg-gray-200 animate-pulse ${isLoading ? 'block' : 'hidden'}`} />
                            <Image
                              src={testimonial.image || "/img/dummy-women.jpg.jpeg"}
                              alt={testimonial.name}
                              width={180}
                              height={180}
                              quality={85}
                              loading={index === 0 ? "eager" : "lazy"}
                              sizes="(max-width: 768px) 96px, 120px"
                              className={`w-32 h-32 lg:w-38 lg:h-38 rounded-full object-cover border-4 border-[#8B5CF6] transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                              onLoad={handleImageLoad}
                              priority={index === 0}
                            />
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center bg-[#8B5CF6]">
                              <Quote className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 text-center lg:text-left">
                          <blockquote className="text-lg lg:text-xl mb-6 italic select-none text-[#1A1F2C] font-dm-sans font-normal leading-relaxed">
                            "{testimonial.testimonial}"
                          </blockquote>
                          <div>
                            <h4 className="text-lg lg:text-xl mb-1 text-[#1A1F2C] font-dm-sans font-semibold">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm lg:text-base text-[#8B5CF6] font-dm-sans font-medium">
                              {testimonial.role}
                            </p>
                            <p className="text-sm text-[#8E9196] font-dm-sans font-normal">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => carouselRef.current && carouselRef.current.scrollPrev()}
              disabled={carouselRef.current && carouselRef.current.selectedScrollSnap() === 0}
              className={`w-12 h-12 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                carouselRef.current && carouselRef.current.selectedScrollSnap() === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-[#8B5CF6] hover:text-white'
              }`}
              style={{
                borderColor: "#8B5CF6",
                color: "#8B5CF6",
                backgroundColor: "transparent",
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => carouselRef.current && carouselRef.current.scrollNext()}
              disabled={carouselRef.current && carouselRef.current.selectedScrollSnap() === testimonials.length - 1}
              className={`w-12 h-12 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                carouselRef.current && carouselRef.current.selectedScrollSnap() === testimonials.length - 1 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-[#8B5CF6] hover:text-white'
              }`}
              style={{
                borderColor: "#8B5CF6",
                color: "#8B5CF6",
                backgroundColor: "transparent",
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => carouselRef.current && carouselRef.current.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "scale-125" : "hover:scale-110"
                }`}
                style={{
                  backgroundColor: index === currentTestimonial ? "#8B5CF6" : "#C8C8C9",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
