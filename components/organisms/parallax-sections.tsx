"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/img/dummy-women.jpg.jpeg",
  "/img/dummy-image-header.jpg",
  "/img/dummy-image-header-2.jpg",
  "/img/dummy-image-header-3.jpg",
  "/img/dummy-image-header-4.jpg",
];

const texts = [
  "",
  "La educación es el arma más poderosa para cambiar el mundo",
  "El conocimiento abre puertas a nuevas oportunidades",
  "La curiosidad es el motor del aprendizaje",
  "Juntas construimos un mañana más brillante",
];

export function ParallaxSections() {
  useEffect(() => {
    let getRatio = (el: HTMLElement) =>
      window.innerHeight / (window.innerHeight + el.offsetHeight);
    gsap.utils
      .toArray<HTMLElement>("section.parallax-section")
      .forEach((section, i) => {
        const bg = section.querySelector(".bg") as HTMLElement;
        if (!bg) return;
        bg.style.backgroundImage = `url(${images[i]})`;
        gsap.fromTo(
          bg,
          {
            backgroundPosition: () =>
              i
                ? `50% ${-window.innerHeight * getRatio(section)}px`
                : "50% 0px",
          },
          {
            backgroundPosition: () =>
              `50% ${window.innerHeight * (1 - getRatio(section))}px`,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: () => (i ? "top bottom" : "top top"),
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div>
      {images.map((img, i) => (
        <section
          key={img}
          className="parallax-section relative h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="bg absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10" />
          {i === 0 ? (
            <div className="text-center max-w-4xl mx-auto px-4">
              <h1
                className="mb-6 font-bold text-[38px] lg:text-[90px] text-white"
                style={{
                  lineHeight: "95px",
                  fontSize: "60px",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 600,
                }}
              >
                STEAM WOMEN
              </h1>
              <h2
                className="mb-4 font-medium text-white"
                style={{
                  fontSize: "48px",
                  lineHeight: "65px",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 500,
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
                  fontWeight: 400,
                }}
              >
                Plataforma dedicada a potenciar el talento femenino en áreas
                STEAM a través de oportunidades, eventos y comunidad.
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
                  asChild
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
                  <Link href="/nosotras">Conoce más</Link>
                </Button>
              </div>
            </div>
          ) : (
            <h1 className="text-white text-3xl md:text-5xl font-bold text-center drop-shadow-lg px-4">
              {texts[i]}
            </h1>
          )}
        </section>
      ))}
    </div>
  );
}
