"use client";

import { EventsDetailTemplate } from "@/components/templates/events-detail-template";
import { use } from "react";

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <EventsDetailTemplate slug={slug} />;
}
