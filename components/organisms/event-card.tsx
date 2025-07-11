"use client";

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
import { ExternalLink, Pencil, Trash2, Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: {
    id: string | number;
    slug: string;
    title: string;
    description: string;
    image: string;
    category: string;
    date: string;
    time: string;
    location: string;
    organizer?: string;
    website?: string;
  };
  getCategoryStyles: (category: string) => {
    backgroundColor: string;
    color: string;
  };
  formatDate: (dateString: string) => { day: number; month: string; year: number };
  variant?: "list" | "calendar";
  isDashboard?: boolean;
  onEdit?: (event: any) => void;
  onDelete?: (event: any) => void;
  type: "event" | "oportunidad";
}

export function EventCard({
  event,
  getCategoryStyles,
  formatDate,
  variant = "list",
  isDashboard = false,
  onEdit,
  onDelete,
  type,
}: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  const formatDateISO = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getProvince = (location: string) => location.split(",")[0].trim();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDashboard) return;
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
    if (isDashboard) return;
    const card = cardRef.current;
    const light = lightRef.current;
    if (!card || !light) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.opacity = "1";
    card.style.display = "block";
    light.style.opacity = "0";
  };

  const handleVisitSite = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = event.website?.startsWith('http') ? event.website : `https://${event.website}`;
    window.open(url, '_blank');
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onEdit) onEdit(event);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDelete) onDelete(event);
  };

  const handleViewPublic = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/${type === "event" ? "eventos" : "oportunidades"}/${event.slug}`);
  };

  if (variant === "calendar") {
    return (
      <Link href={`/${type === "event" ? "eventos" : "oportunidades"}/${event.slug}`} className="block">
        <Card
          className="overflow-hidden flex hover:shadow-lg border-0 shadow-sm cursor-pointer transition-all hover:scale-[1.01]"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            className="flex flex-col items-center justify-center p-4 min-w-[80px]"
            style={{ backgroundColor: "#8B5CF6" }}
          >
            <div
              className="text-2xl lg:text-3xl font-bold"
              style={{ color: "#FFFFFF" }}
            >
              {formatDate(event.date).day}
            </div>
            <div
              className="text-sm font-medium capitalize"
              style={{ color: "#FFFFFF" }}
            >
              {formatDate(event.date).month}
            </div>
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <Badge
                className="px-2 py-1 rounded-full border-0 text-xs"
                style={{
                  ...getCategoryStyles(event.category),
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "600",
                }}
              >
                {event.category}
              </Badge>
            </div>
            <h4
              className="font-bold mb-2 line-clamp-2 text-sm lg:text-base"
              style={{
                color: "#1A1F2C",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "600",
                lineHeight: "1.3",
              }}
            >
              {event.title}
            </h4>
            <EventMeta
              date={event.date}
              time={event.time}
              location={getProvince(event.location)}
              formatDate={formatDateISO}
              showOrganizer={false}
            />
          </div>
        </Card>
      </Link>
    );
  }

  if (!isDashboard) {
    return (
      <Link href={`/${type === "event" ? "eventos" : "oportunidades"}/${event.slug}`} tabIndex={0} style={{ outline: "none" }}>
        <div
          ref={cardRef}
          className="event-card relative overflow-hidden rounded-xl border-2 border-transparent group transition-all duration-300 cursor-pointer bg-white shadow-md"
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
                src={event.image || "/dummy-women.jpg.jpeg"}
                alt={event.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <Badge
                className="absolute top-3 left-3 px-3 py-1 rounded-full border-0"
                style={{
                  ...getCategoryStyles(event.category),
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "12px",
                  lineHeight: "15px",
                  fontWeight: "600",
                }}
              >
                {event.category}
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
                {event.title}
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
                {event.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <EventMeta
                date={event.date}
                time={event.time}
                location={getProvince(event.location)}
                formatDate={formatDateISO}
                showOrganizer={false}
              />
            </CardContent>
          </Card>
        </div>
      </Link>
    );
  }

  return (
    <div
      ref={cardRef}
      className={`event-card relative overflow-hidden rounded-xl border-2 border-transparent bg-white shadow-md ${
        !isDashboard ? "group transition-all duration-300 cursor-pointer" : ""
      }`}
      style={{ backgroundColor: "#FFFFFF", opacity: 1, display: "block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {!isDashboard && (
        <>
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
        </>
      )}
      <Card className="bg-white shadow-md hover:shadow-xl rounded-xl p-6 transition-shadow w-full max-w-full">
        <div className="relative">
          <Image
            src={event.image || "/dummy-women.jpg.jpeg"}
            alt={event.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <Badge
            className="absolute top-3 left-3 px-3 py-1 rounded-full border-0"
            style={{
              ...getCategoryStyles(event.category),
              fontFamily: "DM Sans, sans-serif",
              fontSize: "12px",
              lineHeight: "15px",
              fontWeight: "600",
            }}
          >
            {event.category}
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
            {event.title}
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
            {event.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <EventMeta
            date={event.date}
            time={event.time}
            location={getProvince(event.location)}
            formatDate={formatDateISO}
            showOrganizer={false}
          />
        </CardContent>
        {isDashboard && (
          <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4">
            <button
              onClick={e => { e.preventDefault(); onEdit?.(event); }}
              className="flex items-center gap-1 text-[#8B5CF6] bg-gray-50 rounded px-3 py-1.5 hover:bg-[#ede9fe] transition focus:outline-none focus:ring-2"
              tabIndex={0}
              aria-label="Editar"
            >
              <Pencil className="h-4 w-4" />
              Editar
            </button>
            <button
              onClick={e => { e.preventDefault(); onDelete?.(event); }}
              className="flex items-center gap-1 text-[#EF4444] bg-gray-50 rounded px-3 py-1.5 hover:bg-red-100 transition focus:outline-none focus:ring-2"
              tabIndex={0}
              aria-label="Eliminar"
            >
              <X className="h-4 w-4" />
              Eliminar
            </button>
            <a
              href={`/${type === "event" ? "eventos" : "oportunidades"}/${event.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#8B5CF6] bg-gray-50 rounded px-3 py-1.5 hover:bg-[#ede9fe] transition focus:outline-none focus:ring-2"
              tabIndex={0}
              aria-label={type === "event" ? "Ir al evento" : "Ver"}
            >
              <Eye className="h-4 w-4" />
              {type === "event" ? "Ir al evento" : "Ver"}
            </a>
          </div>
        )}
      </Card>
    </div>
  );
}
