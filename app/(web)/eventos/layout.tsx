import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventos - STEAM WOMEN",
  description:
    "Descubre eventos, conferencias y actividades para mujeres en STEAM. Conecta con la comunidad y expande tu red profesional.",
  keywords:
    "eventos STEAM, conferencias mujeres, networking, actividades STEAM, comunidad",
  openGraph: {
    title: "Eventos - STEAM WOMEN",
    description: "Descubre eventos y actividades para mujeres en STEAM",
    type: "website",
  },
};

export default function EventosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
