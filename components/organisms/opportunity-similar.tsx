import { OpportunityCard } from "@/components/organisms/opportunity-card";

export function OpportunitySimilar({
  similarOpportunities,
}: {
  similarOpportunities: any[];
}) {
  if (!similarOpportunities?.length) return null;
  return (
    <div className="mt-12">
      <h3
        className="mb-6 font-bold"
        style={{
          fontSize: "24px",
          lineHeight: "30px",
          color: "#1A1F2C",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: "600",
        }}
      >
        Oportunidades similares
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {similarOpportunities.map((op) => (
          <OpportunityCard key={op.id} opportunity={op} />
        ))}
      </div>
    </div>
  );
}
