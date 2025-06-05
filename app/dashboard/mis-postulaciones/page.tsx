"use client";

import { ApplicationsList } from "@/components/organisms/dashboard/applications-list";
import { useAuth } from "@/lib/context/auth-context";
import { redirect } from "next/navigation";

export default function MyApplicationsPage() {
  const { user } = useAuth();

  if (!user || user.role !== "student") {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mis Postulaciones</h1>
        <p className="mt-2 text-gray-600">
          Revisa el estado de tus postulaciones a eventos y oportunidades
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Eventos</h2>
          <ApplicationsList type="event" studentId={user.id} />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Oportunidades</h2>
          <ApplicationsList type="opportunity" studentId={user.id} />
        </section>
      </div>
    </div>
  );
} 