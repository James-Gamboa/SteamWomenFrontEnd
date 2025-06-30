export function HeroSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container">
        <div className="text-center">
          <h1
            className="mb-4 font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
            style={{
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
              lineHeight: "1.1",
            }}
          >
            Sobre Nosotras
          </h1>
          <p
            className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl"
            style={{
              color: "#8E9196",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "400",
              lineHeight: "1.6",
            }}
          >
            Conoce más sobre Ecosystem for women, nuestra misión, visión y el equipo
            detrás de esta iniciativa para potenciar el talento femenino en
            áreas STEAM.
          </p>
        </div>
      </div>
    </section>
  );
}
