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

export function OpportunityCard({ opportunity }: { opportunity: any }) {
  return (
    <Link
      href={`/oportunidades/${opportunity.slug}`}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      <Card
        className="overflow-hidden hover:shadow-lg border-0 shadow-sm cursor-pointer transition-all hover:scale-[1.01] focus:outline-none focus:ring-0"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="relative">
          <Image
            src={opportunity.image || "/dummy-image.jpg"}
            alt={opportunity.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
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
          <div className="flex items-center" style={{ color: "#8E9196" }}>
            <MapPin className="h-4 w-4 mr-2" />
            <span
              style={{
                fontSize: "14px",
                lineHeight: "18px",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              {opportunity.location}
            </span>
          </div>
          <div className="flex items-center" style={{ color: "8E9196" }}>
            <Calendar className="h-4 w-4 mr-2" />
            <span
              style={{
                fontSize: "14px",
                lineHeight: "18px",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              {opportunity.date}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
