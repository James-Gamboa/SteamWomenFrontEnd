"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, X, ChevronRight } from "lucide-react";
import { toast } from "sonner";

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

type EventModalProps = {
  mode: "create" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (eventData: Event) => void;
  initialData?: Partial<Event>;
  loading?: boolean;
};

// TODO: Reemplazar con conexión a Django

export function EventModal({ mode, open, onOpenChange, onSubmit, initialData, loading = false }: EventModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const toastShown = useRef(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const [formData, setFormData] = useState<Event>({
    id: initialData?.id || Date.now(),
    title: initialData?.title || "",
    description: initialData?.description || "",
    location: initialData?.location || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    category: initialData?.category || "",
    organizer: initialData?.organizer || "",
    website: initialData?.website || "",
    slug: initialData?.slug || "",
    image: initialData?.image || "",
    fullDescription: initialData?.fullDescription || "",
    requirements: initialData?.requirements || [""],
    benefits: initialData?.benefits || [""],
    applicationProcess: initialData?.applicationProcess || "",
  });

  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;

  useEffect(() => {
    if (!open) {
      setCurrentStep(1);
      setImagePreview(initialData?.image || null);
      setFormData({
        id: initialData?.id || Date.now(),
        title: initialData?.title || "",
        description: initialData?.description || "",
        location: initialData?.location || "",
        date: initialData?.date || "",
        time: initialData?.time || "",
        category: initialData?.category || "",
        organizer: initialData?.organizer || "",
        website: initialData?.website || "",
        slug: initialData?.slug || "",
        image: initialData?.image || "",
        fullDescription: initialData?.fullDescription || "",
        requirements: initialData?.requirements || [""],
        benefits: initialData?.benefits || [""],
        applicationProcess: initialData?.applicationProcess || "",
      });
      toastShown.current = false;
    }
  }, [open, initialData]);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    const uniqueSlug = `${formData.title.toLowerCase().replace(/\s+/g, "-")}-${formData.id}`;
    onSubmit({ ...formData, slug: uniqueSlug });
    setTimeout(() => {
      toastShown.current = false;
    }, 1000);
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

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
                  htmlFor="image-upload-unified"
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
                    id="image-upload-unified"
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
                  onChange={handleDateChange}
                  onBlur={handleDateBlur}
                  required
                  placeholder="dd-mm-aaaa"
                  className="h-12"
                />
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
                {mode === "edit" ? (loading ? "Guardando..." : "Guardar cambios") : (loading ? "Publicando..." : "Publicar evento")}
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#8B5CF6]">
            {mode === "edit" ? "Editar Evento" : "Crear Nuevo Evento"}
          </DialogTitle>
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