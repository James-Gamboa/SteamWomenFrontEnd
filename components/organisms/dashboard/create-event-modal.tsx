"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, X, ChevronRight, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface CreateEventModalProps {
  onEventCreated: () => void;
}

export function CreateEventModal({ onEventCreated }: CreateEventModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const toastShown = useRef(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    category: "",
    organizer: "",
    website: "",
    fullDescription: "",
    requirements: [""],
    benefits: [""],
    applicationProcess: "",
    image: "",
  });

  useEffect(() => {
    if (!open) {
      toastShown.current = false;
    }
  }, [open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La imagen debe ser menor a 5MB", {
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

      if (!file.type.startsWith("image/")) {
        toast.error("El archivo debe ser una imagen", {
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

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (index: number, value: string, field: "requirements" | "benefits") => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: "requirements" | "benefits") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (index: number, field: "requirements" | "benefits") => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const newEvent = {
        id: Date.now(),
        ...formData,
        slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
        image: formData.image || "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: formData.date,
      };

      const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");
      const updatedEvents = [...existingEvents, newEvent];
      localStorage.setItem("events", JSON.stringify(updatedEvents));

      toast.success("Evento creado exitosamente", {
        style: {
          backgroundColor: "#F1F0FB",
          color: "#1A1F2C",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });

      setOpen(false);
      setCurrentStep(1);
      setImagePreview(null);
      onEventCreated();
    } catch (error) {
      toast.error("Error al crear el evento", {
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
      setLoading(false);
      setTimeout(() => {
        toastShown.current = false;
      }, 1000);
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título del Evento</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Ej: Workshop de Diseño UX"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                placeholder="Ej: Taller, Conferencia, Webinar"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción Corta</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Breve descripción del evento"
                className="h-24"
              />
            </div>
            <div className="space-y-2">
              <Label>Imagen del Evento</Label>
              <div className="flex flex-col items-center justify-center w-full">
                <label
                  htmlFor="image-upload"
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
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG o WEBP (MAX. 5MB)</p>
                      </>
                    )}
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={nextStep}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                Siguiente
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: San José, Virtual"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">📅 Fecha</Label>
                <Input
                  id="date"
                  name="date"
                  type="text"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  placeholder="dd-mm-aaaa (ej: 08-11-2000)"
                  className="h-12"
                />
                <span className="text-xs text-gray-500">Ejemplo: 08-11-2000</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Horario</Label>
                <Input
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: 09:00 - 17:00"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizer">Empresa</Label>
                <Input
                  id="organizer"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: Tech Women CR"
                  className="h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Sitio Web</Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                required
                placeholder="https://ejemplo.com/evento"
                className="h-12"
              />
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
              >
                Anterior
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                Siguiente
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullDescription">Descripción Completa</Label>
              <Textarea
                id="fullDescription"
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                required
                placeholder="Descripción detallada del evento"
                className="h-32"
              />
            </div>
            <div className="space-y-2">
              <Label>Requisitos</Label>
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={req}
                    onChange={(e) => handleArrayInputChange(index, e.target.value, "requirements")}
                    placeholder="Ej: Conocimientos básicos de programación"
                    required
                    className="h-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem(index, "requirements")}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem("requirements")}
                className="w-full mt-2"
              >
                Agregar Requisito
              </Button>
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
              >
                Anterior
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
              >
                Siguiente
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Beneficios</Label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={benefit}
                    onChange={(e) => handleArrayInputChange(index, e.target.value, "benefits")}
                    placeholder="Ej: Certificado de participación"
                    required
                    className="h-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem(index, "benefits")}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem("benefits")}
                className="w-full mt-2"
              >
                Agregar Beneficio
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="applicationProcess">Proceso de Aplicación</Label>
              <Textarea
                id="applicationProcess"
                name="applicationProcess"
                value={formData.applicationProcess}
                onChange={handleInputChange}
                required
                placeholder="Describe el proceso de aplicación"
                className="h-32"
              />
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
              >
                Anterior
              </Button>
              <Button
                type="submit"
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                disabled={loading}
              >
                {loading ? "Creando..." : "Crear Evento"}
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Crear Evento
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#8B5CF6]">Crear Nuevo Evento</DialogTitle>
          <div className="flex items-center justify-center space-x-2 mt-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-2 w-2 rounded-full ${
                  currentStep === step ? "bg-[#8B5CF6]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-6">
          {renderStep()}
        </form>
      </DialogContent>
    </Dialog>
  );
} 