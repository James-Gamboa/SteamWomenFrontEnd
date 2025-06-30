import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión - STEAM WOMEN",
  description:
    "Accede a tu cuenta de STEAM WOMEN para gestionar tu perfil, aplicar a oportunidades y participar en eventos.",
  keywords: "login, iniciar sesión, cuenta, STEAM WOMEN, acceso",
  openGraph: {
    title: "Iniciar Sesión - STEAM WOMEN",
    description: "Accede a tu cuenta de STEAM WOMEN",
    type: "website",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
