import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotras - STEAM WOMEN",
  description:
    "Conoce nuestra misión, visión y el equipo detrás de STEAM WOMEN. Descubre cómo trabajamos para empoderar a las mujeres en STEAM.",
  keywords:
    "STEAM WOMEN, misión, visión, equipo, empoderamiento mujeres, STEAM",
  openGraph: {
    title: "Nosotras - STEAM WOMEN",
    description: "Conoce nuestra misión y el equipo detrás de STEAM WOMEN",
    type: "website",
  },
};

export default function NosotrasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
