"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface EventRegistration {
  userId: string;
  userName: string;
  eventSlug: string;
  eventTitle: string;
  organizer: string;
  fechaRegistro: string;
  provincia?: string;
  categoria?: string;
}

export default function EventosInscritosPage() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);

  useEffect(() => {
    if (user && user.role === "student") {
      const all = JSON.parse(localStorage.getItem("student_event_registrations") || "[]");
      setRegistrations(all.filter((reg: EventRegistration) => reg.userId === user.id));
    }
  }, [user]);

  if (!user || user.role !== "student") return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1F2C] dark:text-white">
          Eventos Inscritos
        </h1>
        <p className="text-[#C8C8C9] mt-2">
          Consulta los eventos a los que te has registrado
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mis Eventos Registrados</CardTitle>
          </CardHeader>
          <CardContent>
            {registrations.length === 0 ? (
              <div className="text-center text-[#C8C8C9] py-8">
                Aún no te has registrado a ningún evento.
              </div>
            ) : (
              <div className="space-y-4">
                {registrations.map((reg) => (
                  <div key={reg.eventSlug} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{reg.eventTitle}</p>
                      <p className="text-sm text-[#C8C8C9]">{reg.organizer}</p>
                      <div className="flex gap-2 mt-1">
                        {reg.provincia && <span className="text-xs bg-[#F1F0FB] text-[#8B5CF6] px-2 py-0.5 rounded">{reg.provincia}</span>}
                        {reg.categoria && <span className="text-xs bg-[#F1F0FB] text-[#F97316] px-2 py-0.5 rounded">{reg.categoria}</span>}
                      </div>
                      <p className="text-xs text-[#8E9196]">{new Date(reg.fechaRegistro).toLocaleDateString()}</p>
                    </div>
                    <Badge variant="secondary">Registrado</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 