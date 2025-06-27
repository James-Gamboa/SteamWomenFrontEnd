import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function ContactFormSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1200));
      toast.success("¡Mensaje enviado con éxito!");
    } catch (err) {
      toast.error("Hubo un error, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" isLoading={isLoading}>
        Enviar
      </Button>
    </form>
  );
}
