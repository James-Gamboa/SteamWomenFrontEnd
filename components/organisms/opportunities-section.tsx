import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OpportunityCard } from "./opportunity-card";
import { opportunitiesEventsData } from "@/lib/opportunities-events-data";

export function OpportunitiesSection() {
  const getCategoryStyles = (category: string) => {
    const styles = {
      Evento: { backgroundColor: "#A78BFA", color: "#FFFFFF" },
      Beca: { backgroundColor: "#38BDF8", color: "#FFFFFF" },
      Mentoría: { backgroundColor: "#8B5CF6", color: "#FFFFFF" },
      Conferencia: { backgroundColor: "#0EA5E9", color: "#FFFFFF" },
      Taller: { backgroundColor: "#F97316", color: "#FFFFFF" },
    };
    return (
      styles[category as keyof typeof styles] || {
        backgroundColor: "#C8C8C9",
        color: "#1A1F2C",
      }
    );
  };

  return (
    <section className="py-20" style={{ backgroundColor: "#F1F0FB" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="mb-4 font-bold text-[41px] lg:text-[48px]"
            style={{
              lineHeight: "65px",
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
            }}
          >
            Oportunidades destacadas
          </h2>
          <p
            className="max-w-auto mx-auto"
            style={{
              fontSize: "18px",
              lineHeight: "28px",
              color: "#8E9196",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "400",
            }}
          >
            Descubre las últimas oportunidades en ciencia, tecnología,
            ingeniería, arte y matemáticas para impulsar tu carrera.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {opportunitiesEventsData.slice(0, 6).map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            className="px-8 py-3 hover:opacity-90 border-0"
            style={{
              backgroundColor: "#8B5CF6",
              color: "#FFFFFF",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "16px",
              lineHeight: "20px",
              fontWeight: "600",
            }}
          >
            <Link href="/oportunidades">Ver todas las oportunidades</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
