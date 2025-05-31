"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, ArrowLeft, Share, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"

interface OpportunityDetailTemplateProps {
  slug: string
}

const opportunitiesData = {
  "hackathon-ia-salud": {
    id: 1,
    title: "Hackathon de Inteligencia Artificial para Salud",
    description:
      "Participa en este hackathon enfocado en desarrollar soluciones de IA para el sector salud. Ideal para programadoras y científicas de datos.",
    location: "San José, Costa Rica",
    date: "16-18 Junio, 2025",
    organizer: "HealthTech Costa Rica",
    category: "Evento",
    website: "https://healthtechcr.org/hackathon2025",
    image:
      "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    fullDescription: `El Hackathon de Inteligencia Artificial para Salud es un evento de 48 horas donde equipos multidisciplinarios trabajarán en el desarrollo de soluciones innovadoras utilizando IA para resolver desafíos actuales en el sector salud de Costa Rica. Los participantes tendrán acceso a datasets reales de hospitales nacionales, mentores expertos y la oportunidad de presentar sus proyectos ante un panel de jueces del sector salud y tecnología. Este evento está especialmente diseñado para mujeres en áreas STEAM, con el objetivo de fomentar la participación femenina en el desarrollo de soluciones tecnológicas para el sector salud.`,
    requirements: [
      "Conocimientos básicos de programación",
      "Interés en inteligencia artificial y/o salud",
      "Disponibilidad para participar durante todo el evento (48 horas)",
      "Equipo de computadora personal",
    ],
    benefits: [
      "Premios en efectivo para los equipos ganadores",
      "Mentoría con expertos en IA y salud",
      "Networking con profesionales del sector",
      "Posibilidad de implementar tu solución con instituciones de salud costarricenses",
      "Certificado de participación",
    ],
    applicationProcess: `Para participar, completa el formulario de registro en el sitio web oficial antes del 1 de junio de 2025. Puedes registrarte individualmente o como equipo (máximo 4 personas). Se dará prioridad a equipos con al menos un 50% de participación femenina.`,
  },
  "workshop-ux": {
    id: 3,
    title: "Workshop de Diseño de Experiencia de Usuario",
    description:
      "Taller práctico sobre metodologías y herramientas para el diseño UX, enfocado en mujeres que buscan especializarse en esta área.",
    location: "Virtual",
    date: "22 Mayo, 2025",
    organizer: "UX Women Costa Rica",
    category: "Taller",
    website: "https://uxwomencr.org/workshop2025",
    image:
      "https://images.unsplash.com/photo-1717439762694-47ef801e9350?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DBCWHMhUw",
    fullDescription: `Este workshop intensivo de 2 días te introducirá en el mundo del diseño de experiencia de usuario. Aprenderás metodologías, herramientas y mejores prácticas para crear interfaces intuitivas y accesibles. El taller está diseñado específicamente para mujeres que buscan iniciar o avanzar en su carrera en UX/UI en Costa Rica.`,
    requirements: [
      "Interés en diseño y experiencia de usuario",
      "Computadora portátil",
      "Conocimientos básicos de diseño",
    ],
    benefits: [
      "Certificado de participación",
      "Kit de herramientas digitales",
      "Acceso a comunidad de diseñadoras costarricenses",
      "Mentoría personalizada",
    ],
    applicationProcess: `Regístrate a través de nuestro formulario en línea. Las plazas son limitadas y se asignarán por orden de registro.`,
  },
  "conferencia-matematicas": {
    id: 5,
    title: "Conferencia de Mujeres en Matemáticas",
    description:
      "Conferencia internacional que reúne a matemáticas destacadas para compartir investigaciones y crear redes de colaboración.",
    location: "Alajuela, Costa Rica",
    date: "10-12 Agosto, 2025",
    organizer: "Women in Mathematics Costa Rica",
    category: "Conferencia",
    website: "https://womeninmathcr.org/conference2025",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1988&q=80",
    fullDescription: `La Conferencia Internacional de Mujeres en Matemáticas es un evento que reúne a investigadoras, profesoras y estudiantes de matemáticas de todo el mundo. Durante tres días, se presentarán investigaciones de vanguardia, se realizarán talleres especializados y se crearán redes de colaboración entre mujeres matemáticas, con especial énfasis en la participación de mujeres costarricenses.`,
    requirements: [
      "Ser estudiante o profesional en matemáticas",
      "Presentar un resumen de investigación (opcional)",
      "Dominio del inglés (para presentaciones internacionales)",
    ],
    benefits: [
      "Presentación de investigaciones",
      "Networking internacional",
      "Talleres especializados",
      "Publicación de trabajos",
    ],
    applicationProcess: `Envía tu propuesta de ponencia o regístrate como asistente a través del sitio web oficial. Las becas de asistencia están disponibles para estudiantes costarricenses.`,
  },
  "beca-neurociencia": {
    id: 2,
    title: "Beca para Estudio de Postgrado en Neurociencia",
    description: "Beca completa para mujeres estudiantes de maestría o doctorado en neurociencia en universidades de prestigio internacional.",
    location: "Heredia, Costa Rica",
    date: "Aplicaciones hasta 30 Julio, 2025",
    organizer: "Instituto Nacional de Neurociencia Costa Rica",
    category: "Beca",
    website: "https://neurocienciacr.org/beca2025",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fullDescription: "Esta beca está dirigida a mujeres costarricenses interesadas en realizar estudios de postgrado en neurociencia. El programa cubre matrícula, manutención y gastos de investigación en universidades de prestigio internacional.",
    requirements: [
      "Ser mujer costarricense",
      "Título universitario en ciencias de la vida o afines",
      "Dominio del inglés",
      "Carta de motivación y dos cartas de recomendación"
    ],
    benefits: [
      "Cobertura total de matrícula",
      "Estipendio mensual",
      "Acceso a laboratorios internacionales",
      "Mentoría académica"
    ],
    applicationProcess: "Completa el formulario en línea y adjunta los documentos requeridos antes del 30 de julio de 2025. Las entrevistas se realizarán en agosto."
  },
  "mentoria-emprendedoras": {
    id: 4,
    title: "Mentoría para Emprendedoras Tecnológicas",
    description: "Programa de mentoría de 3 meses para mujeres que dirigen startups tecnológicas o tienen una idea emprendedora.",
    location: "Cartago, Costa Rica",
    date: "Inicia 1 Junio, 2025",
    organizer: "Red de Mujeres Emprendedoras CR",
    category: "Mentoría",
    website: "https://emprendedorascr.org/mentoria2025",
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fullDescription: "Este programa conecta a mujeres emprendedoras con mentoras expertas en tecnología y negocios. Incluye sesiones grupales, asesoría personalizada y acceso a una red de contactos.",
    requirements: [
      "Ser fundadora o cofundadora de una startup tecnológica",
      "Residir en Costa Rica",
      "Disponibilidad para sesiones semanales"
    ],
    benefits: [
      "Mentoría personalizada",
      "Acceso a eventos exclusivos",
      "Networking con otras emprendedoras",
      "Certificado de finalización"
    ],
    applicationProcess: "Regístrate en la web antes del 20 de mayo de 2025. Se seleccionarán 20 participantes."
  },
  "taller-robotica": {
    id: 6,
    title: "Taller de Robótica para Adolescentes",
    description: "Taller introductorio a la robótica para chicas de 13 a 17 años que les interese explorar la ingeniería y tecnología.",
    location: "Puntarenas, Costa Rica",
    date: "Sábados de Julio, 2025",
    organizer: "STEM Girls Costa Rica",
    category: "Taller",
    website: "https://stemgirlscr.org/robotica2025",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    fullDescription: "Un taller práctico donde las participantes aprenderán a construir y programar robots básicos, fomentando el interés por la ingeniería y la tecnología.",
    requirements: [
      "Tener entre 13 y 17 años",
      "Interés en tecnología",
      "Autorización de padres o tutores"
    ],
    benefits: [
      "Materiales incluidos",
      "Certificado de participación",
      "Premios para los mejores proyectos"
    ],
    applicationProcess: "Inscríbete en línea antes del 25 de junio de 2025. Cupo limitado."
  },
  "investigacion-ambiental": {
    id: 7,
    title: "Programa de Investigación en Ciencias Ambientales",
    description: "Oportunidad para participar en proyectos de investigación sobre cambio climático y conservación de ecosistemas.",
    location: "Guanacaste, Costa Rica",
    date: "Septiembre - Diciembre, 2025",
    organizer: "Centro de Investigación Ambiental CR",
    category: "Investigación",
    website: "https://ciacr.org/investigacion2025",
    image: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    fullDescription: "Participa en investigaciones reales sobre biodiversidad, cambio climático y conservación en Costa Rica. Incluye trabajo de campo y laboratorio.",
    requirements: [
      "Ser estudiante universitaria o egresada en ciencias",
      "Interés en medio ambiente",
      "Disponibilidad para viajar a Guanacaste"
    ],
    benefits: [
      "Experiencia en investigación",
      "Publicación de resultados",
      "Red de contactos científicos"
    ],
    applicationProcess: "Envía tu CV y carta de motivación antes del 10 de agosto de 2025."
  },
  "beca-desarrollo-web": {
    id: 8,
    title: "Beca para Curso de Desarrollo Web Full Stack",
    description: "Beca completa para un bootcamp intensivo de desarrollo web con enfoque en tecnologías modernas.",
    location: "Virtual",
    date: "Inicia 15 Agosto, 2025",
    organizer: "Academia Web CR",
    category: "Beca",
    website: "https://academiawebcr.org/beca2025",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fullDescription: "Bootcamp intensivo de 12 semanas donde aprenderás desarrollo web front-end y back-end con tecnologías actuales. Incluye mentoría y proyectos reales.",
    requirements: [
      "Mayor de 18 años",
      "Conocimientos básicos de programación",
      "Acceso a computadora e internet"
    ],
    benefits: [
      "Beca completa",
      "Mentoría personalizada",
      "Bolsa de empleo al finalizar"
    ],
    applicationProcess: "Aplica en línea antes del 1 de agosto de 2025. Se notificará a las seleccionadas por correo."
  },
  "concurso-innovacion": {
    id: 9,
    title: "Concurso de Innovación Tecnológica",
    description: "Concurso de proyectos innovadores para financiamiento y mentoría para llevar tu siguiente nivel.",
    location: "Limón, Costa Rica",
    date: "Cierre de inscripciones: 30 Junio, 2025",
    organizer: "Innovatech CR",
    category: "Concurso",
    website: "https://innovatechcr.org/concurso2025",
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fullDescription: "Presenta tu proyecto tecnológico y compite por financiamiento, mentoría y visibilidad nacional. Abierto a mujeres de todo el país.",
    requirements: [
      "Proyecto tecnológico original",
      "Equipo liderado por mujer",
      "Presentación de pitch en vivo"
    ],
    benefits: [
      "Premios en efectivo",
      "Mentoría de expertos",
      "Difusión en medios nacionales"
    ],
    applicationProcess: "Registra tu proyecto antes del 30 de junio de 2025. Las finalistas presentarán en Limón en agosto."
  }
}

export function OpportunityDetailTemplate({ slug }: OpportunityDetailTemplateProps) {
  const [isSticky, setIsSticky] = useState(true)
  const applicationProcessRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const opportunity = opportunitiesData[slug as keyof typeof opportunitiesData]
  const similarOpportunities = Object.entries(opportunitiesData)
    .filter(([key]) => key !== slug)
    .slice(0, 2)
    .map(([key, value]) => ({
      ...value,
      slug: key,
    }))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      {
        rootMargin: "-100px 0px 0px 0px",
        threshold: 0,
      },
    )

    if (applicationProcessRef.current) {
      observer.observe(applicationProcessRef.current)
    }

    return () => {
      if (applicationProcessRef.current) {
        observer.unobserve(applicationProcessRef.current)
      }
    }
  }, [])

  const getCategoryStyles = (category: string) => {
    const styles = {
      Evento: { backgroundColor: "#A78BFA", color: "#FFFFFF" },
      Taller: { backgroundColor: "#F97316", color: "#FFFFFF" },
      Conferencia: { backgroundColor: "#0EA5E9", color: "#FFFFFF" },
    }
    return styles[category as keyof typeof styles] || { backgroundColor: "#C8C8C9", color: "#1A1F2C" }
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FFFFFF", paddingTop: "80px" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Oportunidad no encontrada</h1>
          <Link
            href="/oportunidades"
            className="inline-flex items-center text-purple-600 hover:opacity-80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a oportunidades
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF", paddingTop: "80px" }}>
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/oportunidades"
          className="inline-flex items-center mb-6 transition-colors hover:opacity-80"
          style={{
            color: "#8E9196",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a oportunidades
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative mb-6">
              <Image
                src={opportunity.image || "/placeholder.svg"}
                alt={opportunity.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
              <Badge
                className="absolute top-4 left-4 px-3 py-1 rounded-full border-0"
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

            <div className="mb-6">
              <h1
                className="mb-4 font-bold"
                style={{
                  fontSize: "32px",
                  lineHeight: "40px",
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                {opportunity.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: "#8E9196" }}>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span style={{ fontFamily: "DM Sans, sans-serif" }}>{opportunity.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span style={{ fontFamily: "DM Sans, sans-serif" }}>{opportunity.date}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span style={{ fontFamily: "DM Sans, sans-serif" }}>{opportunity.organizer}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p
                className="leading-relaxed"
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                }}
              >
                {opportunity.fullDescription}
              </p>
            </div>

            <div className="mb-8">
              <h3
                className="mb-4 font-bold"
                style={{
                  fontSize: "20px",
                  lineHeight: "25px",
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                Requisitos
              </h3>
              <ul className="space-y-2">
                {opportunity.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#1A1F2C",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    <span className="mr-2" style={{ color: "#8B5CF6" }}>
                      •
                    </span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3
                className="mb-4 font-bold"
                style={{
                  fontSize: "20px",
                  lineHeight: "25px",
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                Beneficios
              </h3>
              <ul className="space-y-2">
                {opportunity.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#1A1F2C",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    <span className="mr-2" style={{ color: "#8B5CF6" }}>
                      •
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div ref={applicationProcessRef} className="mb-8">
              <h3
                className="mb-4 font-bold"
                style={{
                  fontSize: "20px",
                  lineHeight: "25px",
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                Proceso de aplicación
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                }}
              >
                {opportunity.applicationProcess}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div ref={sidebarRef} className={`transition-all duration-300 ${isSticky ? "lg:sticky lg:top-24" : ""}`}>
              <Card
                className="mb-6 shadow-lg border-0 transform transition-transform hover:scale-[1.01]"
                style={{ backgroundColor: "#F1F0FB" }}
              >
                <CardHeader>
                  <Button
                    className="w-full mb-4 py-6 text-lg shadow-md transform transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      backgroundColor: "#8B5CF6",
                      color: "#FFFFFF",
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                      borderRadius: "8px",
                    }}
                  >
                    Aplicar ahora
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 py-5 transition-all hover:bg-pink-50"
                      style={{
                        borderColor: "#C8C8C9",
                        color: "#1A1F2C",
                        fontFamily: "DM Sans, sans-serif",
                        borderRadius: "8px",
                      }}
                    >
                      <Heart className="h-5 w-5 mr-1 text-pink-500" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 py-5 transition-all hover:bg-blue-50"
                      style={{
                        borderColor: "#C8C8C9",
                        color: "#1A1F2C",
                        fontFamily: "DM Sans, sans-serif",
                        borderRadius: "8px",
                      }}
                    >
                      <Share className="h-5 w-5 mr-1 text-blue-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4
                    className="mb-3 font-bold"
                    style={{
                      fontSize: "16px",
                      lineHeight: "20px",
                      color: "#1A1F2C",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    Información clave
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: "#8E9196", fontFamily: "DM Sans, sans-serif" }}>Categoría</span>
                      <span style={{ color: "#1A1F2C", fontFamily: "DM Sans, sans-serif", fontWeight: "600" }}>
                        {opportunity.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "#8E9196", fontFamily: "DM Sans, sans-serif" }}>Ubicación</span>
                      <span style={{ color: "#1A1F2C", fontFamily: "DM Sans, sans-serif", fontWeight: "600" }}>
                        {opportunity.location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "#8E9196", fontFamily: "DM Sans, sans-serif" }}>Fecha</span>
                      <span style={{ color: "#1A1F2C", fontFamily: "DM Sans, sans-serif", fontWeight: "600" }}>
                        {opportunity.date}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "#8E9196", fontFamily: "DM Sans, sans-serif" }}>Organizador</span>
                      <span style={{ color: "#1A1F2C", fontFamily: "DM Sans, sans-serif", fontWeight: "600" }}>
                        {opportunity.organizer}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: "#C8C8C9" }}>
                    <h5
                      className="mb-2 font-bold"
                      style={{
                        fontSize: "14px",
                        lineHeight: "18px",
                        color: "#1A1F2C",
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      Sitio web oficial
                    </h5>
                    <a
                      href={opportunity.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:opacity-80"
                      style={{
                        color: "#8B5CF6",
                        fontFamily: "DM Sans, sans-serif",
                        textDecoration: "underline",
                      }}
                    >
                      {opportunity.website}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3
            className="mb-6 font-bold"
            style={{
              fontSize: "24px",
              lineHeight: "30px",
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
            }}
          >
            Oportunidades similares
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {similarOpportunities.map((similar) => (
              <Link key={similar.id} href={`/oportunidades/${similar.slug}`}>
                <Card
                  className="overflow-hidden hover:shadow-lg border-0 shadow-sm cursor-pointer transition-all hover:scale-[1.01]"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <div className="relative">
                    <Image
                      src={similar.image || "/placeholder.svg"}
                      alt={similar.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className="absolute top-3 left-3 px-3 py-1 rounded-full border-0"
                      style={{
                        ...getCategoryStyles(similar.category),
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "12px",
                        lineHeight: "15px",
                        fontWeight: "600",
                      }}
                    >
                      {similar.category}
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
                      {similar.title}
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
                      {similar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center" style={{ color: "#8E9196" }}>
                      <MapPin className="h-4 w-4 mr-2" />
                      <span style={{ fontSize: "14px", lineHeight: "18px", fontFamily: "DM Sans, sans-serif" }}>
                        {similar.location}
                      </span>
                    </div>
                    <div className="flex items-center" style={{ color: "#8E9196" }}>
                      <Calendar className="h-4 w-4 mr-2" />
                      <span style={{ fontSize: "14px", lineHeight: "18px", fontFamily: "DM Sans, sans-serif" }}>
                        {similar.date}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 