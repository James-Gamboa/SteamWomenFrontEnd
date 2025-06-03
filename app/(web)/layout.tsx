import { DM_Sans } from "next/font/google";
import "@/app/globals.css";
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

export default function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} font-sans antialiased min-h-screen`} style={{ fontFamily: "DM Sans, sans-serif" }}>
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
