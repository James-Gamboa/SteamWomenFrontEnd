import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function OpportunityHeader({ opportunity }: { opportunity: any }) {
  return (
    <div className="relative mb-6">
      <Image
        src={opportunity.image || "/dummy-image.jpg"}
        alt={opportunity.title}
        width={800}
        height={400}
        className="w-full h-64 md:h-80 object-cover rounded-lg"
      />
      <Badge
        className="absolute top-4 left-4 px-3 py-1 rounded-full border-0"
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
  );
}
