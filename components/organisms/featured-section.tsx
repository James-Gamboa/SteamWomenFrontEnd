import Image from "next/image";

export function FeaturedSection() {
  return (
    <section className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="mb-6 font-bold break-words text-[36px] md:text-[48px] sm:text-[36px]"
              style={{
                lineHeight: "65px",
                color: "#1A1F2C",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
              }}
            >
              Potenciando el talento femenino en STEAM
            </h2>
            <p
              className="mb-6 leading-relaxed break-words"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#8E9196",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "400",
              }}
            >
              Somos una plataforma comprometida con el empoderamiento y la
              diversidad en los campos de Ciencia, Tecnología, Ingeniería, Arte
              y Matemáticas. Nuestra misión es conectar a mujeres talentosas con
              oportunidades que impulsen su desarrollo profesional y personal.
            </p>
            <p
              className="leading-relaxed break-words"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#8E9196",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "400",
              }}
            >
              Creemos que la diversidad alimenta la innovación y que las nuevas
              generaciones y promover la equidad de género en áreas
              tradicionalmente dominadas por hombres.
            </p>
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Mujeres trabajando en tecnología"
              width={500}
              height={400}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
