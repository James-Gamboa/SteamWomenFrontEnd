import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} font-sans antialiased min-h-screen`} style={{ fontFamily: "DM Sans, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}