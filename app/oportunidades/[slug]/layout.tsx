import type { Metadata } from "next";
import { opportunitiesEventsData } from "@/lib/opportunities-events-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const opportunity = opportunitiesEventsData.find((o) => o.slug === slug);
  if (!opportunity) {
    return {
      title: "Oportunidad no encontrada | STEAMWomen",
      description: "Esta oportunidad no existe o ha sido eliminada.",
    };
  }
  return {
    title: `${opportunity.title} | STEAMWomen`,
    description: opportunity.description,
    openGraph: {
      title: `${opportunity.title} | STEAMWomen`,
      description: opportunity.description,
      url: `https://steam-women-front-end.vercel.app/oportunidades/${opportunity.slug}`,
      images: [
        {
          url: opportunity.image,
          width: 1200,
          height: 630,
          alt: opportunity.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${opportunity.title} | STEAMWomen`,
      description: opportunity.description,
      images: [opportunity.image],
    },
  };
}

export default function OpportunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 