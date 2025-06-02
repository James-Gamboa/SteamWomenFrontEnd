import { HomeTemplate } from "@/components/templates/home-template";
import type { Metadata } from "next";

export default function Home() {
  return (
    <div>
      <HomeTemplate />
    </div>
  );
}

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "STEAMWomen - Impulsando mujeres en STEAM",
  description: "Plataforma dedicada a potenciar el talento femenino en áreas STEAM a través de oportunidades, eventos y comunidad.",
  openGraph: {
    title: "STEAMWomen - Impulsando mujeres en STEAM",
    description: "Plataforma dedicada a potenciar el talento femenino en áreas STEAM a través de oportunidades, eventos y comunidad.",
    url: "https://steam-women-front-end.vercel.app/",
    siteName: "STEAMWomen",
    images: [
      {
        url: "/img/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "STEAMWomen Home",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STEAMWomen - Impulsando mujeres en STEAM",
    description: "Plataforma dedicada a potenciar el talento femenino en áreas STEAM a través de oportunidades, eventos y comunidad.",
    images: ["/img/og-home.jpg"],
  },
});
