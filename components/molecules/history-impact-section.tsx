export function HistoryImpactSection() {
  const timeline = [
    {
      year: "2018",
      title: "Los inicios",
      description:
        "Ecosystem for women nace como una iniciativa local para conectar a mujeres estudiantes de carreras STEAM con profesionales del sector.",
    },
    {
      year: "2020",
      title: "Expansión regional",
      description:
        "Ampliamos nuestro alcance a varios países de Latinoamérica y adaptamos el componente virtual, transformándonos en STEAMWomen.",
    },
    {
      year: "2025",
      title: "Plataforma digital",
      description:
        "Lanzamos nuestra plataforma digital para conectar a mujeres con oportunidades en áreas STEAM a nivel global.",
    },
  ];

  return (
    <section className="py-12 lg:py-20">
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
            Nuestra Historia e Impacto
          </h2>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-8 lg:space-x-16">
            <button
              className="pb-2 border-b-2 font-medium text-sm lg:text-base"
              style={{
                color: "#8B5CF6",
                borderColor: "#8B5CF6",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "500",
              }}
            >
              Historia
            </button>
            <button
              className="pb-2 border-b-2 border-transparent font-medium text-sm lg:text-base transition-colors hover:opacity-70"
              style={{
                color: "#8E9196",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "500",
              }}
            >
              Impacto
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {timeline.map((item, index) => (
            <div
              key={item.year}
              className="p-6 lg:p-8 rounded-lg border transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              style={{
                backgroundColor: "#F1F0FB",
                borderColor: "#C8C8C9",
              }}
            >
              <div
                className="text-2xl lg:text-3xl font-bold mb-3"
                style={{
                  color: "#8B5CF6",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                {item.year}
              </div>
              <h3
                className="mb-3 font-bold text-lg lg:text-xl"
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                  lineHeight: "1.3",
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm lg:text-base"
                style={{
                  color: "#8E9196",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                  lineHeight: "1.5",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
