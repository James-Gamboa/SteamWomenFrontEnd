"use client"

import { OpportunityDetailTemplate } from "@/components/templates/opportunity-detail-template"
import { use } from "react"

interface OpportunityDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function OpportunityDetailPage({ params }: OpportunityDetailPageProps) {
  const resolvedParams = use(params)
  return <OpportunityDetailTemplate slug={resolvedParams.slug} />
}
