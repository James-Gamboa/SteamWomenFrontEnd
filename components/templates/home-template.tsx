"use client";

import { FeaturedSection } from "@/components/organisms/featured-section";
import { OpportunitiesSection } from "@/components/organisms/opportunities-section";
import { ImpactSection } from "@/components/organisms/impact-section";
import { JoinCommunitySection } from "@/components/organisms/join-community-section";
import { ParallaxSections } from "@/components/organisms/parallax-sections";

export function HomeTemplate() {

  return (
    <>
      <ParallaxSections />
        <FeaturedSection />
        <OpportunitiesSection />
        <ImpactSection />
        <JoinCommunitySection />
    </>
  );
}
