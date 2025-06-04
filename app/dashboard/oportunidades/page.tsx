"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { applicationService } from "@/lib/services/application-service";

interface Job {
  id: string;
  title: string;
  company: string;
  company_id: string;
}

export default function OportunidadesPage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [motivation, setMotivation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return null;

  if (user.role !== "company") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-[#1A1F2C] dark:text-white mb-4">Acceso denegado</h2>
        <p className="text-[#C8C8C9]">Esta sección solo está disponible para empresas.</p>
      </div>
    );
  }

  const handlePostular = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSubmitPostulacion = async () => {
    if (!selectedJob || !user) return;

    try {
      setIsSubmitting(true);
      await applicationService.createApplication(
        selectedJob.id,
        user.id,
        motivation
      );

      toast.success("¡Postulación enviada con éxito!", {
        style: {
          backgroundColor: "#F1F0FB",
          color: "#1A1F2C",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
      setIsModalOpen(false);
      setMotivation("");
    } catch (error) {
      toast.error("Error al enviar la postulación. Por favor, intenta de nuevo.", {
        style: {
          backgroundColor: "#FEE2E2",
          color: "#991B1B",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1F2C] dark:text-white">
            Mis Oportunidades
          </h1>
          <p className="text-[#C8C8C9] mt-2">
            Gestiona tus ofertas laborales
          </p>
        </div>
        <Button asChild className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
          <Link href="/dashboard/oportunidades/crear" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Crear Oportunidad
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              Oportunidades Publicadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Desarrollador Frontend</p>
                  <p className="text-sm text-[#C8C8C9]">
                    5 postulantes
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="text-[#8B5CF6]"
                  onClick={() => handlePostular({ 
                        id: "1",
                        title: "Desarrollador Frontend", 
                        company: "Tech Solutions Inc.",
                        company_id: "1"
                      })
                  }
                >
                  Ver Postulantes
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Diseñador UX/UI</p>
                  <p className="text-sm text-[#C8C8C9]">
                    3 postulantes
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="text-[#8B5CF6]"
                  onClick={() => handlePostular({ 
                        id: "2",
                        title: "Diseñador UX/UI", 
                        company: "Creative Studio",
                        company_id: "2"
                      })
                  }
                >
                  Ver Postulantes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Buscar oportunidades..."
          className="max-w-sm"
        />
        <Button variant="outline">Filtrar</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fecha Límite</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Desarrolladora Frontend</TableCell>
              <TableCell>Empleo</TableCell>
              <TableCell>30 Mar 2024</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Activa
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-[#C8C8C9]">
          Mostrando 1-10 de 15 oportunidades
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            Siguiente
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Postular a {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              En {selectedJob?.company}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="motivation">Carta de Motivación</Label>
              <Textarea
                id="motivation"
                placeholder="Explica por qué te interesa esta oportunidad y por qué serías un buen candidato..."
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
              onClick={handleSubmitPostulacion}
              disabled={!motivation.trim() || isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Postulación"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 