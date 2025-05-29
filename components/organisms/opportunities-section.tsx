import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"

export function OpportunitiesSection() {
  const opportunities = [
    {
      id: 1,
      title: "Hackathon de Inteligencia Artificial para Mujeres",
      description:
        "Únete a este hackathon enfocado en desarrollar soluciones de IA para problemas sociales. Ideal para mujeres en tecnología.",
      location: "Ciudad de México, México",
      date: "15 de marzo 2024",
      participants: "50 participantes",
      category: "Hackathon",
      image:
        "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    },
    {
      id: 2,
      title: "Beca para Estudio de Postgrado en Neurociencia",
      description:
        "Beca completa para mujeres estudiantes de maestría o doctorado en neurociencia y áreas relacionadas.",
      location: "Barcelona, España",
      date: "Aplicaciones hasta 30 abril 2024",
      participants: "10 becas disponibles",
      category: "Beca",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Workshop de Diseño de Experiencia de Usuario",
      description:
        "Taller práctico sobre metodologías y herramientas para el diseño de experiencias digitales centradas en el usuario.",
      location: "Online",
      date: "22 de marzo 2024",
      participants: "100 participantes",
      category: "Workshop",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Mentoría para Emprendedoras Tecnológicas",
      description: "Programa de mentoría de 6 meses para mujeres que están desarrollando startups tecnológicas.",
      location: "Bogotá, Colombia",
      date: "Inicia 1 abril 2024",
      participants: "20 participantes",
      category: "Mentoría",
      image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Conferencia de Mujeres en Matemáticas",
      description:
        "Evento anual que reúne a investigadoras y estudiantes de matemáticas para compartir investigaciones y experiencias.",
      location: "Buenos Aires, Argentina",
      date: "5-7 mayo 2024",
      participants: "200 participantes",
      category: "Conferencia",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1988&q=80",
    },
    {
      id: 6,
      title: "Taller de Robótica para Adolescentes",
      description: "Taller introductorio de robótica dirigido a adolescentes interesadas en ingeniería y tecnología.",
      location: "Lima, Perú",
      date: "Sábados abril 2024",
      participants: "30 participantes",
      category: "Taller",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ]

  const getCategoryStyles = (category: string) => {
    const styles = {
      Hackathon: { backgroundColor: "#A78BFA", color: "#FFFFFF" },
      Beca: { backgroundColor: "#38BDF8", color: "#FFFFFF" },
      Workshop: { backgroundColor: "#FB923C", color: "#FFFFFF" },
      Mentoría: { backgroundColor: "#8B5CF6", color: "#FFFFFF" },
      Conferencia: { backgroundColor: "#0EA5E9", color: "#FFFFFF" },
      Taller: { backgroundColor: "#F97316", color: "#FFFFFF" },
    }
    return styles[category as keyof typeof styles] || { backgroundColor: "#C8C8C9", color: "#1A1F2C" }
  }

  return (
    <section className="py-20" style={{ backgroundColor: "#F1F0FB" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="mb-4 font-bold"
            style={{
              fontSize: "48px",
              lineHeight: "65px",
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
            }}
          >
            Oportunidades destacadas
          </h2>
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
            Descubre las últimas oportunidades en ciencia, tecnología, ingeniería, arte y matemáticas para impulsar tu
            carrera.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {opportunities.map((opportunity) => (
            <Card
              key={opportunity.id}
              className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-sm"
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
                <div className="flex items-center" style={{ color: "#8E9196" }}>
                  <Users className="h-4 w-4 mr-2" />
                  <span style={{ fontSize: "14px", lineHeight: "18px", fontFamily: "DM Sans, sans-serif" }}>
                    {opportunity.participants}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            className="px-8 py-3 hover:opacity-90 border-0"
            style={{
              backgroundColor: "#8B5CF6",
              color: "#FFFFFF",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "16px",
              lineHeight: "20px",
              fontWeight: "600",
            }}
          >
            Ver todas las oportunidades
          </Button>
        </div>
      </div>
    </section>
  )
}
