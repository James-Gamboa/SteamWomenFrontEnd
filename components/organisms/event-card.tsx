"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  };
  getCategoryStyles: (category: string) => {
    backgroundColor: string;
    color: string;
  };
  formatDate: (dateString: string) => { day: number; month: string; year: number };
  variant?: "list" | "calendar";
}

export function EventCard({
  event,
  getCategoryStyles,
  formatDate,
  variant = "list",
}: EventCardProps) {
  if (variant === "calendar") {
    const eventDate = formatDate(event.date);
    return (
      <Link href={`/eventos/${event.slug}`}>
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
              {eventDate.day}
            </div>
            <div
              className="text-sm font-medium capitalize"
              style={{ color: "#FFFFFF" }}
            >
              {eventDate.month}
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
            <div className="space-y-1 text-xs">
              <div className="flex items-center" style={{ color: "#8E9196" }}>
                <Calendar className="h-3 w-3 mr-1" />
                <span style={{ fontFamily: "DM Sans, sans-serif" }}>
                  {event.time}
                </span>
              </div>
              <div className="flex items-center" style={{ color: "#8E9196" }}>
                <MapPin className="h-3 w-3 mr-1" />
                <span style={{ fontFamily: "DM Sans, sans-serif" }}>
                  {event.location}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/eventos/${event.slug}`}>
      <Card
        className="overflow-hidden hover:shadow-lg border-0 shadow-sm cursor-pointer transition-all hover:scale-[1.01]"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="relative">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
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
        <CardHeader className="pb-3">
          <CardTitle
            className="line-clamp-2 text-base lg:text-lg"
            style={{
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
              lineHeight: "1.3",
            }}
          >
            {event.title}
          </CardTitle>
          <CardDescription
            className="line-clamp-3 text-sm"
            style={{
              color: "#8E9196",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "400",
              lineHeight: "1.4",
            }}
          >
            {event.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          <div
            className="flex items-center text-sm"
            style={{ color: "#8E9196" }}
          >
            <Calendar className="h-4 w-4 mr-2" />
            <span style={{ fontFamily: "DM Sans, sans-serif" }}>
              {formatDate(event.date).day} {formatDate(event.date).month},{" "}
              {formatDate(event.date).year} • {event.time}
            </span>
          </div>
          <div
            className="flex items-center text-sm"
            style={{ color: "#8E9196" }}
          >
            <MapPin className="h-4 w-4 mr-2" />
            <span style={{ fontFamily: "DM Sans, sans-serif" }}>
              {event.location}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
