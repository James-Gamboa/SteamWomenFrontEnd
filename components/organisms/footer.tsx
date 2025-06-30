import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
                <Link
                  href="/dashboard"
                  className="transition-colors hover:underline hover:text-purple-500"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Publicar evento STEAM
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="transition-colors hover:underline hover:text-purple-500"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Publicar oportunidad para mujeres
                </Link>
              </li>
               <li>
                <Link
                  href="https://linktr.ee/ecosystemforwomen"
                  className="transition-colors hover:underline hover:text-purple-500"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Donaciones
                </Link>
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
                <Link
                  href="/oportunidades"
                  className="transition-colors hover:underline hover:text-purple-500"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Oportunidades
                </Link>
              </li>
              <li>
                <Link
                  href="/eventos"
                  className="transition-colors hover:underline hover:text-purple-500"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Eventos
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotras"
                  className="transition-colors hover:underline hover:text-purple-500"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Sobre nosotras
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotras#preguntas-frecuentes"
                  className="transition-colors hover:underline hover:text-purple-500"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="mailto:contacto@ecosystemforwomen.com"
                  className="transition-colors hover:underline hover:text-purple-500"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  contacto@ecosystemforwomen.com
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+50622222222"
                  className="transition-colors hover:underline hover:text-purple-500"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +506 2222 2222
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:underline hover:text-purple-500"
                  style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#C8C8C9",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Heredia, Costa Rica
                </Link>
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
              © 2025 Ecosystem for Women. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/PoliticadePrivacidad.pdf"
                target="_blank"
                className="transition-colors hover:underline hover:text-purple-500"
                style={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#C8C8C9",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                }}
              >
                Política de privacidad
              </Link>
              <Link
                href="/TerminosdeServicio.pdf"
                target="_blank"
                className="transition-colors hover:underline hover:text-purple-500"
                style={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#C8C8C9",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                }}
              >
                Términos de servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
