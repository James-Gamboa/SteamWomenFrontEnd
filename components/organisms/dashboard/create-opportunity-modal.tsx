"use client";

import { CreateItemModal } from "./create-item-modal";

interface CreateOpportunityModalProps {
  onOpportunityCreated: () => void;
}

export function CreateOpportunityModal({ onOpportunityCreated }: CreateOpportunityModalProps) {
  return (
    <CreateItemModal
      type="opportunity"
      onItemCreated={onOpportunityCreated}
    />
  );
} 