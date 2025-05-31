"use client";

import { Calendar, MapPin, Clock, User } from "lucide-react";

interface EventMetaProps {
  date: string;
  time: string;
  location: string;
  organizer?: string;
  formatDate: (dateString: string) => string;
  showOrganizer?: boolean;
}

export function EventMeta({
  date,
  time,
  location,
  organizer,
  formatDate,
  showOrganizer = true,
}: EventMetaProps) {
  return (
    <div className="flex flex-wrap gap-4 text-sm" style={{ color: "#8E9196" }}>
      <div className="flex items-center">
        <Calendar className="h-4 w-4 mr-1" />
        <span style={{ fontFamily: "DM Sans, sans-serif" }}>
          {formatDate(date)}
        </span>
      </div>
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-1" />
        <span style={{ fontFamily: "DM Sans, sans-serif" }}>{time}</span>
      </div>
      <div className="flex items-center">
        <MapPin className="h-4 w-4 mr-1" />
        <span style={{ fontFamily: "DM Sans, sans-serif" }}>{location}</span>
      </div>
      {showOrganizer && organizer && (
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          <span style={{ fontFamily: "DM Sans, sans-serif" }}>{organizer}</span>
        </div>
      )}
    </div>
  );
}
