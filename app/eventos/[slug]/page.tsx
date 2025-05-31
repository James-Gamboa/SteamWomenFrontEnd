"use client";

import { EventsDetailTemplate } from "@/components/templates/events-detail-template";

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  return <EventsDetailTemplate slug={params.slug} />;
}
