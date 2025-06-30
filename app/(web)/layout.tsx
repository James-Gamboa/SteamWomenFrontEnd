import { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/molecules/whatsapp-button";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import NextTopLoader from "nextjs-toploader";
import { SmoothScrollProvider } from "./providers/smooth-scroll-provider";
import { ApolloWrapper } from "./providers/apollo-provider";
import { GlobalToasts } from "./GlobalToasts";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Inicio - STEAM WOMEN",
  description:
    "Plataforma dedicada a potenciar el talento femenino en áreas STEAM a través de oportunidades, eventos y comunidad.",
  keywords:
    "STEAM, mujeres, tecnología, ciencia, ingeniería, matemáticas, oportunidades, eventos",
  authors: [{ name: "STEAM WOMEN" }],
  openGraph: {
    title: "Inicio - STEAM WOMEN",
    description:
      "Plataforma dedicada a potenciar el talento femenino en áreas STEAM",
    type: "website",
  },
};

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <NextTopLoader color="#8B5CF6" showSpinner={true} height={4} />
        <ApolloWrapper>
          <SmoothScrollProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
            <GlobalToasts />
          </SmoothScrollProvider>
        </ApolloWrapper>
        <Toaster />
      </body>
    </html>
  );
}
