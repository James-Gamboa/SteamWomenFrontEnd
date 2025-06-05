"use client";

import { CreateItemModal } from "./create-item-modal";

interface CreateEventModalProps {
  onEventCreated: () => void;
}

export function CreateEventModal({ onEventCreated }: CreateEventModalProps) {
  return (
    <CreateItemModal
      type="event"
      onItemCreated={onEventCreated}
    />
  );
} 