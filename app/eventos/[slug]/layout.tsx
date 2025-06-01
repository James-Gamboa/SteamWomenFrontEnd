import type { Metadata } from "next";
import { eventsData } from "@/lib/events-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);
  if (!event) {
    return {
      title: "Evento no encontrado | STEAMWomen",
      description: "Este evento no existe o ha sido eliminado.",
    };
  }
  return {
    title: `${event.title} | STEAMWomen`,
    description: event.description,
    openGraph: {
      title: `${event.title} | STEAMWomen`,
      description: event.description,
      url: `https://steam-women-front-end.vercel.app/eventos/${event.slug}`,
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | STEAMWomen`,
      description: event.description,
      images: [event.image],
    },
  };
}

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 