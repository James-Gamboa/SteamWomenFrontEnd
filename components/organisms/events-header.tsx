"use client";

export function EventsHeader() {
  return (
    <div className="text-center mb-8 lg:mb-12">
      <h1
        className="mb-4 font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
        style={{
          color: "#1A1F2C",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: "600",
          lineHeight: "1.1",
        }}
      >
        Eventos
      </h1>
      <p
        className="max-w-2xl mx-auto text-base sm:text-lg"
        style={{
          color: "#8E9196",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: "400",
          lineHeight: "1.6",
        }}
      >
        Descubre talleres, conferencias, hackathons y más eventos diseñados para
        impulsar tu carrera en áreas STEAM.
      </p>
    </div>
  );
}
