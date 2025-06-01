"use client";

import { OpportunityDetailTemplate } from "@/components/templates/opportunity-detail-template";
import { use } from "react";

export default function OpportunityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  return <OpportunityDetailTemplate slug={resolvedParams.slug} />;
}
