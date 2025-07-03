"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EventsCTA() {
  return (
    <div
      className="mt-16 lg:mt-20 text-center py-12 lg:py-16"
      style={{ backgroundColor: "#F1F0FB" }}
    >
      <h2
        className="mb-4 font-bold text-2xl sm:text-3xl lg:text-4xl"
        style={{
          color: "#1A1F2C",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: "600",
          lineHeight: "1.2",
        }}
      >
        ¿Organizas un evento para mujeres en STEAM?
      </h2>
      <p
        className="mb-8 max-w-2xl mx-auto text-base lg:text-lg"
        style={{
          color: "#8E9196",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: "400",
          lineHeight: "1.6",
        }}
      >
        Publica tu evento en nuestra plataforma y llega a miles de mujeres
        interesadas en oportunidades en ciencia, tecnología, ingeniería, arte y
        matemáticas.
      </p>
      <Button
        className="px-8 py-3 hover:opacity-90 border-0 text-base lg:text-lg"
        style={{
          backgroundColor: "#8B5CF6",
          color: "#FFFFFF",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: "600",
        }}
        asChild
      >
        <Link href="/eventos">Explorar más eventos</Link>
      </Button>
    </div>
  );
}
