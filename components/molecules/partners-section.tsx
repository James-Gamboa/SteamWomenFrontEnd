"use client";

import { useState } from "react";
import Image from "next/image";

export function PartnersSection() {
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null);

  const partners = [
    {
      id: 1,
      name: "Apple",
      logo: "img/Apple-Logo.png",
    },
    {
      id: 2,
      name: "Batman",
      logo: "img/Batman-Logo.png",
    },
    {
      id: 3,
      name: "Twitch",
      logo: "img/contraccion-nerviosa.png",
    },
    {
      id: 4,
      name: "Facebook",
      logo: "img/facebook.png",
    },
    {
      id: 5,
      name: "Huawei",
      logo: "img/huawei.png",
    },
    {
      id: 6,
      name: "Instagram",
      logo: "img/instagram.png",
    },
    {
      id: 7,
      name: "LG",
      logo: "img/LG-Logo.png",
    },
    {
      id: 8,
      name: "LinkedIn",
      logo: "img/linkedin.png",
    },
    {
      id: 9,
      name: "Spotify",
      logo: "img/spotify.png",
    },
    {
      id: 10,
      name: "TikTok",
      logo: "img/tik-tok.png",
    },
  ];

  const duplicatedPartners = [...partners, ...partners, ...partners];

  const handlePartnerClick = (partnerId: number) => {
    setSelectedPartner(selectedPartner === partnerId ? null : partnerId);
  };

  return (
    <section className="py-12 lg:py-20" style={{ backgroundColor: "#F1F0FB" }}>
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className="mb-4 font-bold text-2xl sm:text-3xl lg:text-4xl"
            style={{
              color: "#1A1F2C",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: "600",
              lineHeight: "1.2",
            }}
          >
            Nuestros Aliados
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div
            className={`flex space-x-8 lg:space-x-12 ${
              selectedPartner ? "" : "animate-scroll"
            } transition-all duration-500`}
            style={{
              width: "fit-content",
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                  selectedPartner === partner.id
                    ? "transform scale-125 z-10"
                    : selectedPartner
                      ? "opacity-50 scale-90"
                      : "hover:scale-110"
                }`}
                onClick={() => handlePartnerClick(partner.id)}
              >
                <div
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg flex items-center justify-center shadow-md"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <Image
                    src={partner.logo || "/dummy-women.jpg.jpeg"}
                    alt={partner.name}
                    width={60}
                    height={60}
                    className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedPartner && (
          <div className="text-center mt-8">
            <p
              className="text-lg lg:text-xl font-medium"
              style={{
                color: "#1A1F2C",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: "500",
              }}
            >
              {partners.find((p) => p.id === selectedPartner)?.name}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
