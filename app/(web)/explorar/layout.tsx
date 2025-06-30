import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorar - STEAM WOMEN",
  description:
    "Explora recursos, herramientas y contenido educativo para mujeres en STEAM. Descubre nuevas oportunidades y expande tus conocimientos.",
  keywords:
    "explorar STEAM, recursos mujeres, herramientas, contenido educativo, STEAM",
  openGraph: {
    title: "Explorar - STEAM WOMEN",
    description: "Explora recursos y herramientas para mujeres en STEAM",
    type: "website",
  },
};

export default function ExplorarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
