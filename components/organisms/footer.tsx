import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="py-16" style={{ backgroundColor: "#1A1F2C" }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3
              className="mb-4 font-bold"
              style={{
                fontSize: "18px",
                lineHeight: "25px",
                color: "#FFFFFF",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
              }}
            >
              Enlaces rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:opacity-80"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Plataforma de eventos basados en áreas STEAM
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:opacity-80"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Eventos y oportunidades para mujeres
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className="mb-4 font-bold"
              style={{
                fontSize: "18px",
                lineHeight: "25px",
                color: "#FFFFFF",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
              }}
            >
              Contacto
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:opacity-80"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Oportunidades
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:opacity-80"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Eventos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:opacity-80"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Sobre nosotras
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:opacity-80"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:opacity-80"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  contacto@steamwomen.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:opacity-80"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  +506 2222 2222
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:opacity-80"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Heredia, Costa Rica
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className="mb-4 font-bold"
              style={{
                fontSize: "18px",
                lineHeight: "25px",
                color: "#FFFFFF",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
              }}
            >
              Suscríbete
            </h3>
            <p
              className="mb-4"
              style={{
                fontSize: "14px",
                lineHeight: "18px",
                color: "#C8C8C9",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "400",
              }}
            >
              Recibe las últimas oportunidades y eventos en tu correo.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                placeholder="Tu correo electrónico"
                className="border-0"
                style={{
                  backgroundColor: "#1A1F2C",
                  borderColor: "#8E9196",
                  color: "#FFFFFF",
                  fontFamily: "DM Sans, sans-serif",
                }}
              />
              <Button
                className="hover:opacity-90 border-0"
                style={{
                  backgroundColor: "#8B5CF6",
                  color: "#FFFFFF",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: "600",
                }}
              >
                Suscribirse
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-8" style={{ borderColor: "#8E9196" }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className="mb-4 md:mb-0"
              style={{
                fontSize: "14px",
                lineHeight: "18px",
                color: "#C8C8C9",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "400",
              }}
            >
              © 2025 STEAMWomen. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="transition-colors hover:opacity-80"
                style={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#C8C8C9",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                }}
              >
                Política de privacidad
              </a>
              <a
                href="#"
                className="transition-colors hover:opacity-80"
                style={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#C8C8C9",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                }}
              >
                Términos de servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
