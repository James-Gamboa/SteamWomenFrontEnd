"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section className="py-12 lg:py-20">
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
            Contáctanos
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
            ¿Tienes preguntas, sugerencias o quieres colaborar con nosotras? Nos encantaría escucharte.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg" style={{ backgroundColor: "#F1F0FB" }}>
              <CardHeader>
                <CardTitle
                  className="text-xl lg:text-2xl"
                  style={{
                    color: "#1A1F2C",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "600",
                  }}
                >
                  Información de contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#8B5CF6" }}
                  >
                    <Mail className="w-5 h-5" style={{ color: "#FFFFFF" }} />
                  </div>
                  <div>
                    <p
                      className="font-medium text-sm lg:text-base"
                      style={{
                        color: "#1A1F2C",
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: "500",
                      }}
                    >
                      Email
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color: "#8E9196",
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      contacto@steamwomen.cr
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#8B5CF6" }}
                  >
                    <Phone className="w-5 h-5" style={{ color: "#FFFFFF" }} />
                  </div>
                  <div>
                    <p
                      className="font-medium text-sm lg:text-base"
                      style={{
                        color: "#1A1F2C",
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: "500",
                      }}
                    >
                      Teléfono
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color: "#8E9196",
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      +506 2234 5678
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#8B5CF6" }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: "#FFFFFF" }} />
                  </div>
                  <div>
                    <p
                      className="font-medium text-sm lg:text-base"
                      style={{
                        color: "#1A1F2C",
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: "500",
                      }}
                    >
                      Ubicación
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color: "#8E9196",
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      Heredia, Costa Rica
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg" style={{ backgroundColor: "#FFFFFF" }}>
              <CardContent className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="name"
                        className="mb-2 block text-sm lg:text-base"
                        style={{
                          color: "#1A1F2C",
                          fontFamily: "DM Sans, sans-serif",
                          fontWeight: "600",
                        }}
                      >
                        Nombre completo
                      </Label>
                      <Input
                        id="name"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        style={{
                          backgroundColor: "#F1F0FB",
                          borderColor: "#C8C8C9",
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="mb-2 block text-sm lg:text-base"
                        style={{
                          color: "#1A1F2C",
                          fontFamily: "DM Sans, sans-serif",
                          fontWeight: "600",
                        }}
                      >
                        Correo electrónico
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@correo.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        style={{
                          backgroundColor: "#F1F0FB",
                          borderColor: "#C8C8C9",
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="type"
                      className="mb-2 block text-sm lg:text-base"
                      style={{
                        color: "#1A1F2C",
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      Tipo de consulta
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger
                        style={{
                          backgroundColor: "#F1F0FB",
                          borderColor: "#C8C8C9",
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      >
                        <SelectValue placeholder="Selecciona el tipo de consulta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Consulta general</SelectItem>
                        <SelectItem value="partnership">Alianza estratégica</SelectItem>
                        <SelectItem value="mentorship">Programa de mentoría</SelectItem>
                        <SelectItem value="events">Organización de eventos</SelectItem>
                        <SelectItem value="press">Prensa y medios</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="subject"
                      className="mb-2 block text-sm lg:text-base"
                      style={{
                        color: "#1A1F2C",
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      Asunto
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Asunto de tu mensaje"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      style={{
                        backgroundColor: "#F1F0FB",
                        borderColor: "#C8C8C9",
                        fontFamily: "DM Sans, sans-serif",
                      }}
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="mb-2 block text-sm lg:text-base"
                      style={{
                        color: "#1A1F2C",
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      Mensaje
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      style={{
                        backgroundColor: "#F1F0FB",
                        borderColor: "#C8C8C9",
                        fontFamily: "DM Sans, sans-serif",
                      }}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3 text-base lg:text-lg flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "#8B5CF6",
                      color: "#FFFFFF",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    <Send className="w-5 h-5" />
                    Enviar mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
