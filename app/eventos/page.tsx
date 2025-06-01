import { EventsTemplate } from "@/components/templates/events-template";
import type { Metadata } from "next";

export default function EventsPage() {
  return <EventsTemplate />;
}

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Eventos STEAM para Mujeres | STEAMWomen",
  description: "Descubre eventos exclusivos para mujeres en ciencia, tecnología, ingeniería, arte y matemáticas.",
  openGraph: {
    title: "Eventos STEAM para Mujeres | STEAMWomen",
    description: "Descubre eventos exclusivos para mujeres en ciencia, tecnología, ingeniería, arte y matemáticas.",
    url: "https://steam-women-front-end.vercel.app/eventos",
    siteName: "STEAMWomen",
    images: [
      {
        url: "/img/og-eventos.jpg",
        width: 1200,
        height: 630,
        alt: "STEAMWomen Eventos",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventos STEAM para Mujeres | STEAMWomen",
    description: "Descubre eventos exclusivos para mujeres en ciencia, tecnología, ingeniería, arte y matemáticas.",
    images: ["/img/og-eventos.jpg"],
  },
});
