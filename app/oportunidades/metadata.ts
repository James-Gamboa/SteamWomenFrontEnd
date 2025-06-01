import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Oportunidades STEAM para Mujeres | STEAMWomen",
  description: "Encuentra oportunidades exclusivas para mujeres en ciencia, tecnología, ingeniería, arte y matemáticas.",
  openGraph: {
    title: "Oportunidades STEAM para Mujeres | STEAMWomen",
    description: "Encuentra oportunidades exclusivas para mujeres en ciencia, tecnología, ingeniería, arte y matemáticas.",
    url: "https://steam-women-front-end.vercel.app/oportunidades",
    siteName: "STEAMWomen",
    images: [
      {
        url: "/img/og-oportunidades.jpg",
        width: 1200,
        height: 630,
        alt: "STEAMWomen Oportunidades",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oportunidades STEAM para Mujeres | STEAMWomen",
    description: "Encuentra oportunidades exclusivas para mujeres en ciencia, tecnología, ingeniería, arte y matemáticas.",
    images: ["/img/og-oportunidades.jpg"],
  },
}); 