import { NosotrasTemplate } from "@/components/templates/nosotras-template"
import type { Metadata } from "next";

export default function NosotrasPage() {
  return <NosotrasTemplate />
}

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Sobre Nosotras | STEAMWomen",
  description: "Conoce la historia, misión y equipo detrás de STEAMWomen, la comunidad que impulsa a mujeres en STEAM.",
  openGraph: {
    title: "Sobre Nosotras | STEAMWomen",
    description: "Conoce la historia, misión y equipo detrás de STEAMWomen, la comunidad que impulsa a mujeres en STEAM.",
    url: "https://steam-women-front-end.vercel.app/nosotras",
    siteName: "STEAMWomen",
    images: [
      {
        url: "/img/dummy-women.jpg.jpeg",
        width: 1200,
        height: 630,
        alt: "STEAMWomen Nosotras",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Nosotras | STEAMWomen",
    description: "Conoce la historia, misión y equipo detrás de STEAMWomen, la comunidad que impulsa a mujeres en STEAM.",
    images: ["/img/dummy-women.jpg.jpeg"],
  },
});
