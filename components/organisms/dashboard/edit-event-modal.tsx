"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  category: string;
  organizer: string;
  website: string;
  slug: string;
  image: string;
  fullDescription: string;
  requirements: string[];
  benefits: string[];
  applicationProcess: string;
}

interface EditEventModalProps {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventUpdated: () => void;
}

const categories = [
  "Networking",
  "Taller",
  "Webinar",
  "Conferencia",
  "Hackathon",
  "Otro"
];

const provinces = [
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón"
];

export function EditEventModal({ event, open, onOpenChange, onEventUpdated }: EditEventModalProps) {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string>(event.image);
  const [formData, setFormData] = useState<Event>(event);
  const toastShown = useRef(false);

  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;

  useEffect(() => {
    if (!open) {
      setCurrentStep(1);
      setImagePreview(event.image);
      setFormData(event);
      toastShown.current = false;
    }
  }, [open, event]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (name: string, value: string) => {
    const items = value.split('\n').filter(item => item.trim());
    setFormData(prev => ({ ...prev, [name]: items }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9-]/g, "");
    if (value.length === 2 || value.length === 5) value += "-";
    setFormData(prev => ({ ...prev, date: value }));
  };

  const handleDateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!dateRegex.test(value)) {
      toast.error("La fecha debe tener el formato dd-mm-aaaa");
    }
  };

  const handleSubmit = async () => {
    if (toastShown.current) return;
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(formData.date)) {
      toast.error("La fecha debe tener el formato dd-mm-aaaa", {
        style: {
          backgroundColor: "#FEE2E2",
          color: "#991B1B",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
      return;
    }
    toastShown.current = true;
    setLoading(true);
    try {
      const events = JSON.parse(localStorage.getItem("events") || "[]");
      const updatedEvents = events.map((e: Event) => 
        e.id === event.id ? { ...formData, date: formData.date } : e
      );
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      
      toast.success("Evento actualizado exitosamente", {
        style: {
          backgroundColor: "#F1F0FB",
          color: "#1A1F2C",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
      
      onEventUpdated();
      onOpenChange(false);
    } catch (error) {
      toast.error("Error al actualizar el evento", {
        style: {
          backgroundColor: "#FEF2F2",
          color: "#EF4444",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        toastShown.current = false;
      }, 1000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1A1F2C]">
            Editar Evento
          </DialogTitle>
        </DialogHeader>

        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título del evento</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ingresa el título del evento"
              />
            </div>

            <div>
              <Label htmlFor="category">Categoría</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Descripción corta</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Ingresa una descripción corta del evento"
              />
            </div>

            <div>
              <Label>Imagen del Evento</Label>
              <div className="flex flex-col items-center justify-center w-full">
                <label
                  htmlFor="image-upload-edit"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-24 w-24 object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG o WEBP (MAX. 5MB)</p>
                      </>
                    )}
                  </div>
                  <input
                    id="image-upload-edit"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setCurrentStep(2)}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Ubicación</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => handleSelectChange("location", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una provincia" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">📅 Fecha</Label>
              <Input
                id="date"
                name="date"
                type="text"
                value={formData.date}
                onChange={handleDateChange}
                onBlur={handleDateBlur}
                required
                placeholder="dd-mm-aaaa"
                className="h-12"
              />
            </div>

            <div>
              <Label htmlFor="time">Hora</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="organizer">Empresa</Label>
              <Input
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleInputChange}
                placeholder="Ingresa el nombre del Empresa"
              />
            </div>

            <div>
              <Label htmlFor="website">Sitio web</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Ingresa la URL del sitio web"
              />
            </div>

            <div className="flex justify-between">
              <Button
                onClick={() => setCurrentStep(1)}
                variant="outline"
              >
                Anterior
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullDescription">Descripción completa</Label>
              <Textarea
                id="fullDescription"
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                placeholder="Ingresa la descripción completa del evento"
              />
            </div>

            <div>
              <Label htmlFor="requirements">Requisitos (uno por línea)</Label>
              <Textarea
                id="requirements"
                value={formData.requirements.join('\n')}
                onChange={(e) => handleArrayInputChange("requirements", e.target.value)}
                placeholder="Ingresa los requisitos del evento"
              />
            </div>

            <div>
              <Label htmlFor="benefits">Beneficios (uno por línea)</Label>
              <Textarea
                id="benefits"
                value={formData.benefits.join('\n')}
                onChange={(e) => handleArrayInputChange("benefits", e.target.value)}
                placeholder="Ingresa los beneficios del evento"
              />
            </div>

            <div>
              <Label htmlFor="applicationProcess">Proceso de aplicación</Label>
              <Textarea
                id="applicationProcess"
                name="applicationProcess"
                value={formData.applicationProcess}
                onChange={handleInputChange}
                placeholder="Ingresa el proceso de aplicación"
              />
            </div>

            <div className="flex justify-between">
              <Button
                onClick={() => setCurrentStep(2)}
                variant="outline"
              >
                Anterior
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                disabled={loading}
              >
                {loading ? "Actualizando..." : "Actualizar evento"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 