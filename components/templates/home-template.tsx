"use client"

import { TextRevealHero } from "@/components/organisms/text-reveal-hero"
import { FeaturedSection } from "@/components/organisms/featured-section"
import { OpportunitiesSection } from "@/components/organisms/opportunities-section"
import { ImpactSection } from "@/components/organisms/impact-section"
import { JoinCommunitySection } from "@/components/organisms/join-community-section"
import { useEffect } from "react"

export function HomeTemplate() {
  useEffect(() => {
    document.body.style.paddingTop = "80px"
    return () => {
      document.body.style.paddingTop = "0"
    }
  }, [])

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