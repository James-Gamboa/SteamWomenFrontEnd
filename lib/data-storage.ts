import { v4 as uuidv4 } from 'uuid';

export type ItemType = 'event' | 'opportunity';

export interface BaseItem {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  category: string;
  image: string;
  slug: string;
  organizer: string;
  website: string;
  fullDescription: string;
  requirements: string[];
  benefits: string[];
  applicationProcess: string;
  type: ItemType;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  itemId: string;
  itemType: ItemType;
  studentId: string;
  studentEmail: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

// TODO: Reemplazar con conexión a Django
// Endpoints:
// - GET /api/events/ - Listar eventos
// - POST /api/events/ - Crear evento
// - GET /api/opportunities/ - Listar oportunidades
// - POST /api/opportunities/ - Crear oportunidad
// - GET /api/events/{slug}/ - Detalle de evento
// - GET /api/opportunities/{slug}/ - Detalle de oportunidad
//
// Estructura de datos en Django:
// {
//   id: number,              // ID en la base de datos
//   title: string,           // título del evento/oportunidad
//   description: string,     // descripción breve
//   location: string,        // ciudad o provincia
//   date: string,            // fecha con formato YYYY-MM-DD
//   time: string,            // hora o rango horario
//   category: string,        // categoría o tipo
//   image: string,           // url de imagen representativa
//   slug: string,            // ruta única (generado automáticamente)
//   organizer: string,       // nombre de la empresa (relacionado con User)
//   website: string,         // opcional, sitio web
//   full_description: string, // descripción extendida
//   requirements: string[],   // array con requisitos
//   benefits: string[],      // array con beneficios (solo para oportunidades)
//   application_process: string, // instrucciones para postulación/registro
//   created_at: string,      // fecha de creación
//   updated_at: string,      // fecha de actualización
//   is_active: boolean,      // estado de publicación
//   company: number          // ID de la empresa creadora
// }

class DataStorage {
  private static instance: DataStorage;
  private items: BaseItem[] = [];
  private applications: Application[] = [];

  private constructor() {
    this.loadFromStorage();
  }

  public static getInstance(): DataStorage {
    if (!DataStorage.instance) {
      DataStorage.instance = new DataStorage();
    }
    return DataStorage.instance;
  }

  private loadFromStorage() {
    const storedItems = localStorage.getItem('items');
    const storedApplications = localStorage.getItem('applications');
    
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
    if (storedApplications) {
      this.applications = JSON.parse(storedApplications);
    }
  }

  private saveToStorage() {
    localStorage.setItem('items', JSON.stringify(this.items));
    localStorage.setItem('applications', JSON.stringify(this.applications));
  }

  public createItem(item: Omit<BaseItem, 'id' | 'createdAt' | 'updatedAt'>): BaseItem {
    const newItem: BaseItem = {
      ...item,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.items.push(newItem);
    this.saveToStorage();
    return newItem;
  }

  public updateItem(id: string, updates: Partial<BaseItem>): BaseItem | null {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return null;

    const updatedItem = {
      ...this.items[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.items[index] = updatedItem;
    this.saveToStorage();
    return updatedItem;
  }

  public deleteItem(id: string): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;

    this.items.splice(index, 1);
    this.applications = this.applications.filter(app => app.itemId !== id);
    this.saveToStorage();
    return true;
  }

  public getItem(id: string): BaseItem | null {
    return this.items.find(item => item.id === id) || null;
  }

  public getItems(type?: ItemType): BaseItem[] {
    if (type) {
      return this.items.filter(item => item.type === type);
    }
    return this.items;
  }

  public createApplication(itemId: string, itemType: ItemType, studentId: string, studentEmail: string): Application {
    const application: Application = {
      id: uuidv4(),
      itemId,
      itemType,
      studentId,
      studentEmail,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    this.applications.push(application);
    this.saveToStorage();
    return application;
  }

  public getApplicationsByItem(itemId: string): Application[] {
    return this.applications.filter(app => app.itemId === itemId);
  }

  public getApplicationsByStudent(studentId: string): Application[] {
    return this.applications.filter(app => app.studentId === studentId);
  }

  public updateApplicationStatus(applicationId: string, status: Application['status']): Application | null {
    const index = this.applications.findIndex(app => app.id === applicationId);
    if (index === -1) return null;

    const updatedApplication = {
      ...this.applications[index],
      status,
    };
    this.applications[index] = updatedApplication;
    this.saveToStorage();
    return updatedApplication;
  }
}

export const dataStorage = DataStorage.getInstance();

export function ensureAdminUser() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const adminUser = {
    id: Date.now(),
    name: "Admin",
    email: "jjguevarag@gmail.com",
    password: "admin",
    role: "admin",
    company: ""
  };
  const exists = users.some((u: any) => u.email === adminUser.email);
  if (!exists) {
    users.push(adminUser);
    localStorage.setItem("users", JSON.stringify(users));
  }
}

ensureAdminUser(); 