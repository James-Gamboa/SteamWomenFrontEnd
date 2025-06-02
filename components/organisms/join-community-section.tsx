import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function JoinCommunitySection() {
  return (
    <section
      className="py-20"
      style={{
        background: "linear-gradient(to right, #F1F0FB, #FFFFFF)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1573167243872-43c6433b9d40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
              alt="Comunidad STEAMWomen"
              width={500}
              height={400}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h2
              className="mb-6 font-bold"
              style={{
                fontSize: "48px",
                lineHeight: "65px",
                color: "#1A1F2C",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
              }}
            >
              Únete a la comunidad STEAMWomen
            </h2>
            <p
              className="mb-8 leading-relaxed"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#8E9196",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "400",
              }}
            >
              Descubre oportunidades exclusivas, eventos y conecta con mujeres líderes en STEAM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="px-8 py-3 hover:opacity-90 border-0"
                style={{
                  backgroundColor: "#8B5CF6",
                  color: "#FFFFFF",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: "600",
                }}
              >
                <Link href="/oportunidades">
                  <span>Descubre oportunidades</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
