"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ParallaxHero({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        fastScrollEnd: true,
        preventOverlaps: true,
      },
    });

    gsap.utils.toArray(".parallax").forEach((layer: any) => {
      const depth = layer.dataset.depth;
      const movement = -(layer.offsetHeight * depth);
      tl.to(layer, { y: movement, ease: "none", force3D: true }, 0);
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="layer-bg layer parallax absolute inset-0"
          data-depth="0.10"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
            style={{
              backgroundImage: "url('/img/dummy-women.jpg.jpeg')",
              opacity: 0.8,
              transform: "translateZ(0)",
            }}
          />
        </div>
        <div
          className="layer-1 layer parallax absolute inset-0 will-change-transform"
          data-depth="0.20"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        </div>
        <div
          className="layer-2 layer parallax absolute inset-0 will-change-transform"
          data-depth="0.50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>
        <div
          className="layer-3 layer parallax absolute inset-0 will-change-transform"
          data-depth="0.80"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
        </div>
        <div
          className="layer-overlay layer parallax absolute inset-0 will-change-transform"
          data-depth="0.85"
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div
          className="layer-4 layer parallax absolute inset-0 will-change-transform"
          data-depth="1.00"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
