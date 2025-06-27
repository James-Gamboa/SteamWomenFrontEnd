import Image from "next/image";

export function MissionVisionSection() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1573167243872-43c6433b9d40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
              alt="Mujeres en tecnología"
              width={600}
              height={400}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h2
                className="mb-4 font-bold text-2xl sm:text-3xl lg:text-4xl"
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                  lineHeight: "1.2",
                }}
              >
                Nuestra Misión
              </h2>
              <p
                className="mb-6 text-sm sm:text-base lg:text-lg"
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                  lineHeight: "1.6",
                }}
              >
                En STEAMWomen, nuestra misión es potenciar el talento femenino
                en áreas de Ciencia, Tecnología, Ingeniería, Arte y Matemáticas
                (STEAM) a través de oportunidades educativas, profesionales y de
                networking que impulsen su desarrollo y liderazgo.
              </p>
              <p
                className="text-sm sm:text-base lg:text-lg"
                style={{
                  color: "#8E9196",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                  lineHeight: "1.6",
                }}
              >
                Trabajamos para reducir la brecha de género en estos campos,
                creando espacios inclusivos donde las mujeres puedan desarrollar
                su potencial y contribuir con su talento a la innovación y el
                avance científico-tecnológico.
              </p>
            </div>

            <div>
              <h2
                className="mb-4 font-bold text-2xl sm:text-3xl lg:text-4xl"
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                  lineHeight: "1.2",
                }}
              >
                Nuestra Visión
              </h2>
              <p
                className="text-sm sm:text-base lg:text-lg"
                style={{
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                  lineHeight: "1.6",
                }}
              >
                Aspiramos a un futuro donde la participación de las mujeres en
                áreas STEAM sea equitativa, diversa y valorada, contribuyendo a
                la construcción de sociedades más innovadoras, inclusivas y
                sostenibles en Latinoamérica y el mundo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
