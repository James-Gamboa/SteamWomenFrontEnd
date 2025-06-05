"use client";

import { CreateItemModal } from "@/components/organisms/dashboard/create-item-modal";
import { Card } from "@/components/ui/card";

export default function CreateOpportunityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Crear Oportunidad</h1>
        <p className="text-gray-500 mt-2">
          Completa el formulario para crear una nueva oportunidad
        </p>
      </div>

      <Card className="p-6">
        <CreateItemModal type="opportunity" onItemCreated={() => {}} />
      </Card>
    </div>
  );
} 