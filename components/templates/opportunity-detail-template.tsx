"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowLeft, Share, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { opportunitiesEventsData } from "@/lib/opportunities-events-data";
import { OpportunityHeader } from "@/components/organisms/opportunity-header";
import { OpportunityInfo } from "@/components/organisms/opportunity-info";
import { OpportunitySidebar } from "@/components/organisms/opportunity-sidebar";
import { OpportunitySimilar } from "@/components/organisms/opportunity-similar";

interface OpportunityDetailTemplateProps {
  slug: string;
}

const opportunitiesData = opportunitiesEventsData.reduce(
  (acc, curr) => {
    acc[curr.slug] = curr;
    return acc;
  },
  {} as Record<string, (typeof opportunitiesEventsData)[number]>,
);

export function OpportunityDetailTemplate({
  slug,
}: OpportunityDetailTemplateProps) {
  const [isSticky, setIsSticky] = useState(true);
  const applicationProcessRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const opportunity = opportunitiesData[slug as keyof typeof opportunitiesData];
  const similarOpportunities = Object.entries(opportunitiesData)
    .filter(([key]) => key !== slug)
    .slice(0, 2)
    .map(([key, value]) => ({
      ...value,
      slug: key,
    }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        rootMargin: "-100px 0px 0px 0px",
        threshold: 0,
      },
    );

    if (applicationProcessRef.current) {
      observer.observe(applicationProcessRef.current);
    }

    return () => {
      if (applicationProcessRef.current) {
        observer.unobserve(applicationProcessRef.current);
      }
    };
  }, []);

  const getCategoryStyles = (category: string) => {
    const styles = {
      Evento: { backgroundColor: "#A78BFA", color: "#FFFFFF" },
      Taller: { backgroundColor: "#F97316", color: "#FFFFFF" },
      Conferencia: { backgroundColor: "#0EA5E9", color: "#FFFFFF" },
    };
    return (
      styles[category as keyof typeof styles] || {
        backgroundColor: "#C8C8C9",
        color: "#1A1F2C",
      }
    );
  };

  if (!opportunity) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FFFFFF", paddingTop: "80px" }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Oportunidad no encontrada</h1>
          <Link
            href="/oportunidades"
            className="inline-flex items-center text-purple-600 hover:opacity-80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a oportunidades
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#FFFFFF", paddingTop: "80px" }}
    >
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/oportunidades"
          className="inline-flex items-center mb-6 transition-colors hover:opacity-80"
          style={{
            color: "#8E9196",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a oportunidades
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <OpportunityHeader opportunity={opportunity} />
            <OpportunityInfo opportunity={opportunity} />
          </div>
          <div className="lg:col-span-1">
            <OpportunitySidebar opportunity={opportunity} />
          </div>
        </div>

        <OpportunitySimilar
          similarOpportunities={Object.values(opportunitiesData)
            .filter((op) => op.slug !== slug)
            .slice(0, 2)}
        />
      </div>
    </div>
  );
}
