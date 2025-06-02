import type React from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/molecules/whatsapp-button";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import NextTopLoader from 'nextjs-toploader';
import { SmoothScrollProvider } from "./providers/smooth-scroll-provider";
import { ApolloWrapper } from "./providers/apollo-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "STEAMWomen - Impulsando mujeres en STEAM",
  description:
    "Plataforma dedicada a potenciar el talento femenino en áreas STEAM a través de oportunidades, eventos y comunidad.",
  metadataBase: new URL("https://steam-women-front-end.vercel.app"),
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
        <NextTopLoader color="#8B5CF6" showSpinner={true} height={4} />
        <ApolloWrapper>
          <SmoothScrollProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </SmoothScrollProvider>
        </ApolloWrapper>
        <Toaster />
      </body>
    </html>
  );
}
