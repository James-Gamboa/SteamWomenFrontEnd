import { Button } from "@/components/ui/button";
import Image from "next/image";

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
              Únete a nuestra comunidad
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
              Forma parte de una red de mujeres apasionadas por STEAM. Accede a
              oportunidades exclusivas, eventos inspiradores y conecta con
              mentoras que pueden ayudarte a alcanzar tus metas profesionales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
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
                Registrarse ahora
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 hover:opacity-80"
                style={{
                  borderColor: "#8B5CF6",
                  color: "#8B5CF6",
                  backgroundColor: "transparent",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: "600",
                }}
              >
                Conoce más
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
