'use client';

import { OpportunityTemplate } from "@/components/templates/opportunity-template";
import { useEffect, useRef } from "react";
import { textReveal, parallaxScroll, gridReveal, magneticHover } from "@/lib/animations";

export default function OpportunitiesPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      textReveal(titleRef.current);
    }

    if (heroRef.current) {
      parallaxScroll(heroRef.current, 0.3);
    }

    document.querySelectorAll('.magnetic-button').forEach(button => {
      magneticHover(button);
    });
  }, []);

  return (
    <div className="opportunities-page">
      <div ref={heroRef} className="hero-section">
        <h1 ref={titleRef} className="text-4xl font-bold mb-6">
          Oportunidades STEAM para Mujeres
        </h1>
      </div>
      <OpportunityTemplate />
    </div>
  );
}
