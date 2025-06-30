"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Award, Globe } from "lucide-react";

export function InteractiveTimelineSection() {
  const [activeYear, setActiveYear] = useState(2018);

  const timelineData = [
    {
      year: 2018,
      title: "Los inicios",
      description:
        "Ecosystem for women nace como una iniciativa local para conectar a mujeres estudiantes de carreras STEAM con profesionales del sector.",
      achievements: [
        "Primera comunidad de 500 mujeres",
        "10 eventos de networking",
        "Alianza con Universidad de Costa Rica",
      ],
      icon: Users,
      color: "#8B5CF6",
    },
    {
      year: 2020,
      title: "Expansión regional",
      description:
        "Ampliamos nuestro alcance a varios países de Latinoamérica y adaptamos el componente virtual, transformándonos en STEAMWomen.",
      achievements: [
        "Presencia en 15 países",
        "10000+ mujeres en la comunidad",
        "20 eventos virtuales",
        "Programa de mentoría lanzado",
      ],
      icon: Globe,
      color: "#0EA5E9",
    },
    {
      year: 2025,
      title: "Plataforma digital",
      description:
        "Lanzamos nuestra plataforma digital para conectar a mujeres con oportunidades en áreas STEAM a nivel global.",
      achievements: [
        "500+ usuarias registradas",
        "10000+ eventos realizados",
        "15 países en Latinoamérica",
        "85% tasa de satisfacción",
      ],
      icon: Award,
      color: "#F97316",
    },
  ];

  const activeData =
    timelineData.find((item) => item.year === activeYear) || timelineData[0];
  const IconComponent = activeData.icon;

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
            Nuestra Historia Interactiva
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
            Explora los momentos clave que han definido el crecimiento de
            STEAMWomen
          </p>
        </div>
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div
              className="absolute top-6 left-0 right-0 h-1 rounded-full"
              style={{ backgroundColor: "#C8C8C9" }}
            />
            <div
              className="absolute top-6 left-0 h-1 rounded-full transition-all duration-500"
              style={{
                backgroundColor: activeData.color,
                width: `${((timelineData.findIndex((item) => item.year === activeYear) + 1) / timelineData.length) * 100}%`,
              }}
            />
            <div className="flex justify-between items-center relative z-10 space-x-8">
              {timelineData.map((item) => (
                <button
                  key={item.year}
                  onClick={() => setActiveYear(item.year)}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    activeYear === item.year ? "scale-110" : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                      activeYear === item.year ? "shadow-lg" : ""
                    }`}
                    style={{
                      backgroundColor:
                        activeYear === item.year ? item.color : "#FFFFFF",
                      borderColor: item.color,
                    }}
                  >
                    <Calendar
                      className="w-5 h-5"
                      style={{
                        color:
                          activeYear === item.year ? "#FFFFFF" : item.color,
                      }}
                    />
                  </div>
                  <span
                    className={`mt-2 font-bold text-sm lg:text-base transition-colors duration-300`}
                    style={{
                      color: activeYear === item.year ? item.color : "#8E9196",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    {item.year}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <Card
            className="border-0 shadow-xl overflow-hidden transition-all duration-500"
            style={{ backgroundColor: "#F1F0FB" }}
          >
            <CardContent className="p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: activeData.color }}
                  >
                    <IconComponent
                      className="w-10 h-10 lg:w-12 lg:h-12"
                      style={{ color: "#FFFFFF" }}
                    />
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <Badge
                    className="mb-4 px-4 py-2 text-sm lg:text-base"
                    style={{
                      backgroundColor: activeData.color,
                      color: "#FFFFFF",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    {activeData.year}
                  </Badge>
                  <h3
                    className="mb-4 font-bold text-2xl lg:text-3xl"
                    style={{
                      color: "#1A1F2C",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "600",
                      lineHeight: "1.2",
                    }}
                  >
                    {activeData.title}
                  </h3>
                  <p
                    className="mb-6 text-base lg:text-lg"
                    style={{
                      color: "#1A1F2C",
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: "400",
                      lineHeight: "1.6",
                    }}
                  >
                    {activeData.description}
                  </p>

                  <div>
                    <h4
                      className="mb-3 font-bold text-lg"
                      style={{
                        color: "#1A1F2C",
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      Logros destacados:
                    </h4>
                    <ul className="space-y-2">
                      {activeData.achievements.map((achievement, index) => (
                        <li
                          key={index}
                          className="flex items-start text-sm lg:text-base"
                          style={{
                            color: "#1A1F2C",
                            fontFamily: "DM Sans, sans-serif",
                            fontWeight: "400",
                            lineHeight: "1.5",
                          }}
                        >
                          <span
                            className="mr-2"
                            style={{ color: activeData.color }}
                          >
                            •
                          </span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
