"use client";

import { OpportunityDetailTemplate } from "@/components/templates/opportunity-detail-template";
import { useEffect, useState, use } from "react";
import { opportunitiesEventsData } from "@/lib/opportunities-events-data";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOpportunity = () => {
      setIsLoading(true);
      const items = JSON.parse(localStorage.getItem("items") || "[]");
      let currentOpportunity = items.find(
        (o: any) => o.type === "opportunity" && o.slug === slug,
      );
      if (!currentOpportunity) {
        currentOpportunity = (opportunitiesEventsData as any[]).find(
          (o: any) => o.slug === slug,
        );
      }
      setOpportunity(currentOpportunity || null);
      setIsLoading(false);
    };
    loadOpportunity();
    window.addEventListener("storage", loadOpportunity);
    return () => window.removeEventListener("storage", loadOpportunity);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container py-16 text-center">
        <div className="text-lg">Cargando oportunidad...</div>
      </div>
    );
  }

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
