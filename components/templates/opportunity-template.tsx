"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Search, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function OpportunityTemplate() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const opportunities = [
    {
      id: 1,
      title: "Hackathon de Inteligencia Artificial para Salud",
      description:
        "Participa en este hackathon enfocado en desarrollar soluciones de IA para el sector salud. Ideal para programadoras y científicas de datos.",
      location: "San José, Costa Rica",
      date: "16-18 Junio, 2025",
      participants: "50 participantes",
      category: "Evento",
      image:
        "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      slug: "hackathon-ia-salud",
    },
    {
      id: 2,
      title: "Beca para Estudio de Postgrado en Neurociencia",
      description:
        "Beca completa para mujeres estudiantes de maestría o doctorado en neurociencia en universidades de prestigio internacional.",
      location: "Heredia, Costa Rica",
      date: "Aplicaciones hasta 30 Julio, 2025",
      participants: "10 becas disponibles",
      category: "Beca",
      image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "beca-neurociencia",
    },
    {
      id: 3,
      title: "Workshop de Diseño de Experiencia de Usuario",
      description:
        "Taller práctico sobre metodologías y herramientas para el diseño UX, enfocado en mujeres que buscan especializarse en esta área.",
      location: "Virtual",
      date: "22 Mayo, 2025",
      participants: "100 participantes",
      category: "Evento",
      image:
        "https://images.unsplash.com/photo-1717439762694-47ef801e9350?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slug: "workshop-ux",
    },
    {
      id: 4,
      title: "Mentoría para Emprendedoras Tecnológicas",
      description:
        "Programa de mentoría de 3 meses para mujeres que dirigen startups tecnológicas o tienen una idea emprendedora.",
      location: "Cartago, Costa Rica",
      date: "Inicia 1 Junio, 2025",
      participants: "20 participantes",
      category: "Mentoría",
      image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "mentoria-emprendedoras",
    },
    {
      id: 5,
      title: "Conferencia de Mujeres en Matemáticas",
      description:
        "Conferencia internacional que reúne a matemáticas destacadas para compartir investigaciones y crear redes de colaboración.",
      location: "Alajuela, Costa Rica",
      date: "10-12 Agosto, 2025",
      participants: "200 participantes",
      category: "Conferencia",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1988&q=80",
      slug: "conferencia-matematicas",
    },
    {
      id: 6,
      title: "Taller de Robótica para Adolescentes",
      description:
        "Taller introductorio a la robótica para chicas de 13 a 17 años que les interese explorar la ingeniería y tecnología.",
      location: "Puntarenas, Costa Rica",
      date: "Sábados de Julio, 2025",
      participants: "30 participantes",
      category: "Taller",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      slug: "taller-robotica",
    },
    {
      id: 7,
      title: "Programa de Investigación en Ciencias Ambientales",
      description:
        "Oportunidad para participar en proyectos de investigación sobre cambio climático y conservación de ecosistemas.",
      location: "Guanacaste, Costa Rica",
      date: "Septiembre - Diciembre, 2025",
      participants: "15 participantes",
      category: "Investigación",
      image:
        "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      slug: "investigacion-ambiental",
    },
    {
      id: 8,
      title: "Beca para Curso de Desarrollo Web Full Stack",
      description: "Beca completa para un bootcamp intensivo de desarrollo web con enfoque en tecnologías modernas.",
      location: "Virtual",
      date: "Inicia 15 Agosto, 2025",
      participants: "25 becas",
      category: "Beca",
      image:
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slug: "beca-desarrollo-web",
    },
    {
      id: 9,
      title: "Concurso de Innovación Tecnológica",
      description: "Concurso de proyectos innovadores para financiamiento y mentoría para llevar tu siguiente nivel.",
      location: "Limón, Costa Rica",
      date: "Cierre de inscripciones: 30 Junio, 2025",
      participants: "100+ proyectos",
      category: "Concurso",
      image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "concurso-innovacion",
    },
  ]

  const getCategoryStyles = (category: string) => {
    const styles = {
      Evento: { backgroundColor: "#A78BFA", color: "#FFFFFF" },
      Beca: { backgroundColor: "#38BDF8", color: "#FFFFFF" },
      Mentoría: { backgroundColor: "#8B5CF6", color: "#FFFFFF" },
      Conferencia: { backgroundColor: "#0EA5E9", color: "#FFFFFF" },
      Taller: { backgroundColor: "#F97316", color: "#FFFFFF" },
      Investigación: { backgroundColor: "#FB923C", color: "#FFFFFF" },
      Concurso: { backgroundColor: "#A78BFA", color: "#FFFFFF" },
    }
    return styles[category as keyof typeof styles] || { backgroundColor: "#C8C8C9", color: "#1A1F2C" }
  }

  const itemsPerPage = 6
  const filteredOpportunities = opportunities
    .filter(op =>
      (!searchTerm ||
        op.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter(op =>
      selectedCategory === "all" || !selectedCategory || op.category.toLowerCase() === selectedCategory.toLowerCase()
    )
    .filter(op =>
      selectedLocation === "all" || !selectedLocation || op.location.toLowerCase().includes(selectedLocation.toLowerCase())
    )

  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOpportunities = filteredOpportunities.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF", paddingTop: "80px" }}>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1
            className="text-[32px] sm:text-[37px] lg:text-[48px] mb-4 font-bold"
            style={{
              lineHeight: "65px",
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
            }}
          >
            Oportunidades
          </h1>
          <p
            className="max-w-2xl mx-auto"
            style={{
              fontSize: "18px",
              lineHeight: "28px",
              color: "#8E9196",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "400",
            }}
          >
            Explora becas, eventos, talleres y más oportunidades diseñadas para impulsar tu carrera en áreas STEAM en Costa Rica.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
              style={{ color: "#8E9196" }}
            />
            <Input
              placeholder="Buscar oportunidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C8C8C9",
                fontFamily: "DM Sans, sans-serif",
              }}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger
              className="w-full md:w-48"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C8C8C9",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="evento">Evento</SelectItem>
              <SelectItem value="beca">Beca</SelectItem>
              <SelectItem value="mentoria">Mentoría</SelectItem>
              <SelectItem value="conferencia">Conferencia</SelectItem>
              <SelectItem value="taller">Taller</SelectItem>
              <SelectItem value="investigacion">Investigación</SelectItem>
              <SelectItem value="concurso">Concurso</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger
              className="w-full md:w-48"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C8C8C9",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              <SelectValue placeholder="Ubicación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las ubicaciones</SelectItem>
              <SelectItem value="virtual">Virtual</SelectItem>
              <SelectItem value="san-jose">San José</SelectItem>
              <SelectItem value="alajuela">Alajuela</SelectItem>
              <SelectItem value="cartago">Cartago</SelectItem>
              <SelectItem value="heredia">Heredia</SelectItem>
              <SelectItem value="guanacaste">Guanacaste</SelectItem>
              <SelectItem value="puntarenas">Puntarenas</SelectItem>
              <SelectItem value="limon">Limón</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentOpportunities.map((opportunity) => (
            <Link key={opportunity.id} href={`/oportunidades/${opportunity.slug}`}>
              <Card
                className="overflow-hidden hover:shadow-lg border-0 shadow-sm cursor-pointer transition-all hover:scale-[1.01]"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div className="relative">
                  <Image
                    src={opportunity.image || "/placeholder.svg"}
                    alt={opportunity.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge
                    className="absolute top-3 left-3 px-3 py-1 rounded-full border-0"
                    style={{
                      ...getCategoryStyles(opportunity.category),
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "12px",
                      lineHeight: "15px",
                      fontWeight: "600",
                    }}
                  >
                    {opportunity.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle
                    className="line-clamp-2"
                    style={{
                      fontSize: "18px",
                      lineHeight: "25px",
                      color: "#1A1F2C",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    {opportunity.title}
                  </CardTitle>
                  <CardDescription
                    className="line-clamp-3"
                    style={{
                      fontSize: "14px",
                      lineHeight: "18px",
                      color: "#8E9196",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    {opportunity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center" style={{ color: "#8E9196" }}>
                    <MapPin className="h-4 w-4 mr-2" />
                    <span style={{ fontSize: "14px", lineHeight: "18px", fontFamily: "DM Sans, sans-serif" }}>
                      {opportunity.location}
                    </span>
                  </div>
                  <div className="flex items-center" style={{ color: "#8E9196" }}>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span style={{ fontSize: "14px", lineHeight: "18px", fontFamily: "DM Sans, sans-serif" }}>
                      {opportunity.date}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-12 h-12 flex items-center justify-center border rounded border-[#8B5CF6] bg-white transition-all duration-200 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F1F0FB]"}`}
            aria-label="Anterior"
            style={{ outline: "none" }}
          >
            <ChevronLeft className="h-6 w-6 text-[#8B5CF6]" />
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1
            const isCurrentPage = currentPage === pageNumber
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-4 py-2 text-lg font-semibold transition-all duration-200 bg-transparent border-none focus:outline-none ${
                  isCurrentPage
                    ? "text-[#8B5CF6] border-b-2 border-[#8B5CF6]"
                    : "text-[#1A1F2C] hover:text-[#8B5CF6]"
                }`}
                style={{ minWidth: "32px" }}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {pageNumber}
              </button>
            )
          })}
          <button
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-12 h-12 flex items-center justify-center border rounded border-[#8B5CF6] bg-white transition-all duration-200 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F1F0FB]"}`}
            aria-label="Siguiente"
            style={{ outline: "none" }}
          >
            <ChevronRight className="h-6 w-6 text-[#8B5CF6]" />
          </button>
        </div>
      </div>
    </div>
  )
} 