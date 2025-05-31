import type React from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/molecules/whatsapp-button";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "STEAMWomen - Impulsando mujeres en STEAM",
  description:
    "Plataforma dedicada a potenciar el talento femenino en áreas STEAM a través de oportunidades, eventos y comunidad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${dmSans.variable} font-sans antialiased min-h-screen`}
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
