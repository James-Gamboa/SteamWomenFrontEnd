import React, { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { EventMeta } from "./event-meta";

export function OpportunityCard({ opportunity }: { opportunity: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const light = lightRef.current;
    if (!card || !light) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 16;
    const rotateX = -((y - centerY) / centerY) * 16;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    card.style.opacity = "1";
    card.style.display = "block";
    light.style.opacity = "1";
    light.style.left = `${x - 100}px`;
    light.style.top = `${y - 100}px`;
  };
  const handleMouseLeave = () => {
    const card = cardRef.current;
    const light = lightRef.current;
    if (!card || !light) return;
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.opacity = "1";
    card.style.display = "block";
    light.style.opacity = "0";
  };

  const formatDateISO = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  const getProvince = (location: string) => location.split(",")[0].trim();

  return (
    <Link
      href={`/oportunidades/${opportunity.slug}`}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      <div>
        <div
          ref={cardRef}
          className="opportunity-card relative overflow-hidden rounded-xl border-2 border-transparent group transition-all duration-300 cursor-pointer bg-white shadow-md"
          style={{ backgroundColor: "#FFFFFF", opacity: 1, display: "block" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <span className="pointer-events-none absolute inset-0 z-10 rounded-xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#8B5CF6] group-hover:via-[#38BDF8] group-hover:to-[#8B5CF6] transition-all duration-300" />
          <span
            ref={lightRef}
            className="pointer-events-none absolute z-20 w-52 h-52 rounded-full opacity-0 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at center, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.10) 60%, transparent 100%)",
              filter: "blur(16px)",
              transition: "opacity 0.3s, left 0.2s, top 0.2s",
              left: 0,
              top: 0,
            }}
          />
          <Card className="bg-transparent shadow-none border-0">
            <div className="relative">
              <Image
                src={opportunity.image || "/dummy-image.jpg"}
                alt={opportunity.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <Badge
                className="absolute top-3 left-3 px-3 py-1 rounded-full border-0"
                style={{
                  backgroundColor: "#A78BFA",
                  color: "#FFFFFF",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "12px",
                  lineHeight: "15px",
                  fontWeight: "600",
                }}
              >
                {opportunity.category}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle
                className="line-clamp-2"
                style={{
                  fontSize: "18px",
                  lineHeight: "25px",
                  color: "#1A1F2C",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                {opportunity.title}
              </CardTitle>
              <CardDescription
                className="line-clamp-3"
                style={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#8E9196",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "400",
                }}
              >
                {opportunity.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <EventMeta
                date={opportunity.date}
                time={opportunity.time || ""}
                location={getProvince(opportunity.location)}
                formatDate={formatDateISO}
                showOrganizer={false}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Link>
  );
}
