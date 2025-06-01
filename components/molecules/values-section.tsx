export function ValuesSection() {
  const values = [
    {
      number: "1",
      title: "Diversidad e Inclusión",
      description:
        "Valoramos y celebramos la diversidad en todas sus formas, creando espacios donde todas las mujeres se sientan bienvenidas y representadas.",
    },
    {
      number: "2",
      title: "Colaboración",
      description:
        "Creemos en el poder de la colaboración y el trabajo en red para generar un impacto positivo y duradero en la sociedad.",
    },
    {
      number: "3",
      title: "Innovación",
      description:
        "Fomentamos el pensamiento creativo y la búsqueda constante de soluciones innovadoras a los desafíos actuales.",
    },
    {
      number: "4",
      title: "Empoderamiento",
      description:
        "Trabajamos para empoderar a las mujeres, brindándoles herramientas, conocimientos y confianza para alcanzar su máximo potencial.",
    },
  ]

  return (
    <section className="py-12 lg:py-20" style={{ backgroundColor: "#F1F0FB" }}>
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className="mb-4 font-bold text-2xl sm:text-3xl lg:text-4xl"
            style={{
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
              lineHeight: "1.2",
            }}
          >
            Nuestros Valores
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {values.map((value) => (
            <div
              key={value.number}
              className="p-6 lg:p-8 rounded-lg border transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#C8C8C9",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto"
                style={{ backgroundColor: "#8B5CF6" }}
              >
                <span
                  className="text-xl font-bold"
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  {value.number}
                </span>
              </div>
              <h3
                className="mb-3 font-bold text-center text-lg lg:text-xl"
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                  lineHeight: "1.3",
                }}
              >
                {value.title}
              </h3>
              <p
                className="text-center text-sm lg:text-base"
                style={{
                  color: "#8E9196",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                  lineHeight: "1.5",
                }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
