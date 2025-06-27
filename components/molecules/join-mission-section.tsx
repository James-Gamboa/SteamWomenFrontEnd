import { Button } from "@/components/ui/button";
import Link from "next/link";

export function JoinMissionSection() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container">
        <div className="text-center">
          <h2
            className="mb-4 font-bold text-2xl sm:text-3xl lg:text-4xl"
            style={{
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
              lineHeight: "1.2",
            }}
          >
            Únete a nuestra misión
          </h2>
          <p
            className="mb-8 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl"
            style={{
              color: "#8E9196",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "400",
              lineHeight: "1.6",
            }}
          >
            Hay muchas formas de colaborar con STEAMWomen y ser parte del
            cambio. Ya sea como voluntaria, mentora, aliada o participando, tu
            contribución es valiosa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/oportunidades" passHref legacyBehavior>
              <Button
                variant="outline"
                className="px-8 py-3 hover:opacity-80 text-base lg:text-lg"
                style={{
                  borderColor: "#8B5CF6",
                  color: "#8B5CF6",
                  backgroundColor: "transparent",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                Descubre oportunidades
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
