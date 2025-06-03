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

export default function EventosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1F2C] dark:text-white">
            Eventos
          </h1>
          <p className="text-[#C8C8C9] mt-2">
            Gestiona tus eventos y talleres
          </p>
        </div>
        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
          <Plus className="mr-2 h-4 w-4" />
          Crear Evento
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Buscar eventos..."
          className="max-w-sm"
        />
        <Button variant="outline">Filtrar</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Taller de Programación</TableCell>
              <TableCell>15 Mar 2024</TableCell>
              <TableCell>Online</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Activo
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
          Mostrando 1-10 de 20 eventos
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
    </div>
  );
} 