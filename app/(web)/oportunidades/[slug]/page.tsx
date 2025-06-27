"use client";

import { OpportunityDetailTemplate } from "@/components/templates/opportunity-detail-template";
import { useEffect, useState, use } from "react";
import { opportunitiesEventsData } from "@/lib/opportunities-events-data";
import { getLocalOpportunities } from "@/lib/data-storage";

interface Opportunity {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  category: string;
  organizer: string;
  website: string;
  slug: string;
  image: string;
  fullDescription: string;
  requirements: string[];
  benefits: string[];
  applicationProcess: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export default function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    const storedOpportunities = getLocalOpportunities?.() || [];
    let currentOpportunity = storedOpportunities.find(
      (o: any) => o.slug === slug,
    );
    if (!currentOpportunity) {
      currentOpportunity = (opportunitiesEventsData as any[]).find(
        (o: any) => o.slug === slug,
      );
    }
    setOpportunity(currentOpportunity || null);
  }, [slug]);

  if (!opportunity) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold">Oportunidad no encontrada</h2>
        <a href="/oportunidades" className="text-primary underline">
          Volver a oportunidades
        </a>
      </div>
    );
  }

  return <OpportunityDetailTemplate opportunity={opportunity} />;
}
