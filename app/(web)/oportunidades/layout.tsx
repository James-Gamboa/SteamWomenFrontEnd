import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oportunidades - STEAM WOMEN",
  description:
    "Encuentra oportunidades laborales, becas, programas de mentoría y recursos para mujeres en STEAM. Impulsa tu carrera profesional.",
  keywords:
    "oportunidades STEAM, empleo mujeres, becas, mentoría, carrera profesional, STEAM",
  openGraph: {
    title: "Oportunidades - STEAM WOMEN",
    description:
      "Encuentra oportunidades laborales y recursos para mujeres en STEAM",
    type: "website",
  },
};

export default function OportunidadesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
