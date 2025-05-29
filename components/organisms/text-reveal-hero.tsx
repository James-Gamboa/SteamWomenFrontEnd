import { Button } from "@/components/ui/button"

export function TextRevealHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/dummy-women.jpg.jpeg')",
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4" style={{ color: "#FFFFFF" }}>
        <h1
          className="mb-6 font-bold"
          style={{
            fontSize: "90px",
            lineHeight: "95px",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: "600",
          }}
        >
          STEAMWOMEN
        </h1>
        <h2
          className="mb-4 font-medium"
          style={{
            fontSize: "48px",
            lineHeight: "65px",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: "500",
          }}
        >
          Impulsando mujeres en STEAM
        </h2>
        <p
          className="mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{
            fontSize: "18px",
            lineHeight: "28px",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: "400",
          }}
        >
          Plataforma dedicada a potenciar el talento femenino en áreas STEAM a través de oportunidades, eventos y
          comunidad.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="outline"
            className="backdrop-blur-sm px-8 py-3 border hover:opacity-80"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "#FFFFFF",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "16px",
              lineHeight: "20px",
              fontWeight: "600",
            }}
          >
            Explorar oportunidades
          </Button>
          <Button
            className="px-8 py-3 hover:opacity-90"
            style={{
              backgroundColor: "#8B5CF6",
              color: "#FFFFFF",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "16px",
              lineHeight: "20px",
              fontWeight: "600",
            }}
          >
            Unirse
          </Button>
        </div>
      </div>
    </section>
  )
}
