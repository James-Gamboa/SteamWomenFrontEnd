'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { heroTextReveal } from "@/lib/animations";
import { ParallaxHero } from "@/components/atoms/parallax-hero";

export function TextRevealHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      heroTextReveal(titleRef.current);
    }
    if (subtitleRef.current) {
      heroTextReveal(subtitleRef.current);
    }
  }, []);

  return (
    <ParallaxHero>
      <h1 
        ref={titleRef}
        className="mb-6 font-bold text-[38px] lg:text-[90px] text-white"
        style={{
          lineHeight: "95px",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: "600",
        }}
      >
        STEAMWOMEN
      </h1>
      <h2 
        ref={subtitleRef}
        className="mb-4 font-medium text-white"
        style={{
          fontSize: "48px",
          lineHeight: "65px",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: "500",
        }}
      >
        Impulsando mujeres en STEAM
      </h2>
      <p
        className="mb-8 max-w-2xl mx-auto leading-relaxed text-white"
        style={{
          fontSize: "18px",
          lineHeight: "28px",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: "400",
        }}
      >
        Plataforma dedicada a potenciar el talento femenino en áreas STEAM a
        través de oportunidades, eventos y comunidad.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          asChild
          variant="outline"
          className="backdrop-blur-sm px-8 py-3 border hover:opacity-80"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            color: "#FFFFFF",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "16px",
            lineHeight: "20px",
            fontWeight: "600",
          }}
        >
          <Link href="/oportunidades">Explorar oportunidades</Link>
        </Button>
        <Button
          className="px-8 py-3 hover:opacity-90"
          style={{
            backgroundColor: "#8B5CF6",
            color: "#FFFFFF",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "16px",
            lineHeight: "20px",
            fontWeight: "600",
          }}
        >
          Unirse
        </Button>
      </div>
    </ParallaxHero>
  );
}
