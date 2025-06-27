"use client";

export default function Error500({ reset }: { reset: () => void }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 container"
      style={{ backgroundColor: "#FFFFFF", paddingTop: 80 }}
    >
      <div className="flex items-center justify-center gap-4 mb-6">
        <h1
          className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-center"
          style={{ color: "#8B5CF6", fontFamily: "DM Sans, sans-serif" }}
        >
          500
        </h1>
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden sm:block"
        >
          <circle cx="40" cy="40" r="40" fill="#F1F0FB" />
          <path
            d="M40 22V46"
            stroke="#8B5CF6"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="40" cy="58" r="4" fill="#8B5CF6" />
        </svg>
      </div>
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center"
        style={{ color: "#1A1F2C", fontFamily: "DM Sans, sans-serif" }}
      >
        Error interno del servidor
      </h2>
      <p
        className="mb-10 text-xl sm:text-2xl md:text-3xl text-center"
        style={{
          color: "#8E9196",
          fontFamily: "DM Sans, sans-serif",
          maxWidth: 600,
        }}
      >
        Ha ocurrido un error inesperado en el servidor. Por favor, intenta de
        nuevo más tarde o regresa al inicio.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="px-8 py-4 rounded font-semibold shadow-md transition-all text-lg sm:text-xl"
          style={{
            backgroundColor: "#8B5CF6",
            color: "#FFFFFF",
            fontFamily: "DM Sans, sans-serif",
            textDecoration: "none",
          }}
        >
          Reintentar
        </button>
        <a
          href="/"
          className="px-8 py-4 rounded font-semibold shadow-md transition-all text-lg sm:text-xl"
          style={{
            backgroundColor: "#8B5CF6",
            color: "#FFFFFF",
            fontFamily: "DM Sans, sans-serif",
            textDecoration: "none",
          }}
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
