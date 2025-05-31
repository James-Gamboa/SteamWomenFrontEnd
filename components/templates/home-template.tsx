"use client"

import { TextRevealHero } from "@/components/organisms/text-reveal-hero"
import { FeaturedSection } from "@/components/organisms/featured-section"
import { OpportunitiesSection } from "@/components/organisms/opportunities-section"
import { ImpactSection } from "@/components/organisms/impact-section"
import { JoinCommunitySection } from "@/components/organisms/join-community-section"

export function HomeTemplate() {
  return (
    <>
      <TextRevealHero />
      <FeaturedSection />
      <OpportunitiesSection />
      <ImpactSection />
      <JoinCommunitySection />
    </>
  )
} 