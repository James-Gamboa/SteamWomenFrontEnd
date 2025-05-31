import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function OpportunityFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
}: any) {
  const categories = [
    "Networking",
    "Taller",
    "Webinar",
    "Hackathon",
    "Conferencia",
    "Evento",
    "Beca",
    "Mentoría",
    "Investigación",
    "Concurso",
  ];
  const provinces = [
    "Virtual",
    "San José",
    "Alajuela",
    "Cartago",
    "Heredia",
    "Guanacaste",
    "Puntarenas",
    "Limón",
  ];
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Input
          placeholder="Buscar oportunidades..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C8C8C9",
            fontFamily: "DM Sans, sans-serif",
          }}
        />
      </div>
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger
          className="w-full md:w-48"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C8C8C9",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          <SelectValue placeholder="Todas las categorías" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
        <SelectTrigger
          className="w-full md:w-48"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C8C8C9",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          <SelectValue placeholder="Todas las ubicaciones" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las ubicaciones</SelectItem>
          {provinces.map((province) => (
            <SelectItem key={province} value={province}>
              {province}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
