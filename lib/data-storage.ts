import { v4 as uuidv4 } from "uuid";

export type ItemType = "event" | "opportunity";

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
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

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
    const storedItems = localStorage.getItem("items");
    const storedApplications = localStorage.getItem("applications");

    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
    if (storedApplications) {
      this.applications = JSON.parse(storedApplications);
    }
  }

  private saveToStorage() {
    localStorage.setItem("items", JSON.stringify(this.items));
    localStorage.setItem("applications", JSON.stringify(this.applications));
  }

  public createItem(
    item: Omit<BaseItem, "id" | "createdAt" | "updatedAt">,
  ): BaseItem {
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
    const index = this.items.findIndex((item) => item.id === id);
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
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return false;

    this.items.splice(index, 1);
    this.applications = this.applications.filter((app) => app.itemId !== id);
    this.saveToStorage();
    return true;
  }

  public getItem(id: string): BaseItem | null {
    return this.items.find((item) => item.id === id) || null;
  }

  public getItems(): BaseItem[] {
    return this.items;
  }

  public createApplication(
    application: Omit<Application, "id" | "createdAt">,
  ): Application {
    const newApplication: Application = {
      ...application,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    this.applications.push(newApplication);
    this.saveToStorage();
    return newApplication;
  }

  public updateApplication(
    id: string,
    updates: Partial<Application>,
  ): Application | null {
    const index = this.applications.findIndex((app) => app.id === id);
    if (index === -1) return null;

    const updatedApplication = {
      ...this.applications[index],
      ...updates,
    };
    this.applications[index] = updatedApplication;
    this.saveToStorage();
    return updatedApplication;
  }

  public deleteApplication(id: string): boolean {
    const index = this.applications.findIndex((app) => app.id === id);
    if (index === -1) return false;

    this.applications.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  public getApplicationsByItem(itemId: string): Application[] {
    return this.applications.filter((app) => app.itemId === itemId);
  }

  public getApplication(id: string): Application | null {
    return this.applications.find((app) => app.id === id) || null;
  }

  public getAllApplications(): Application[] {
    return this.applications;
  }
}

let instance: DataStorage | null = null;
if (typeof window !== "undefined") {
  instance = DataStorage.getInstance();
}

export function createItem(
  item: Omit<BaseItem, "id" | "createdAt" | "updatedAt">,
): BaseItem | null {
  if (!instance) return null;
  return instance.createItem(item);
}

export function updateItem(
  id: string,
  updates: Partial<BaseItem>,
): BaseItem | null {
  if (!instance) return null;
  return instance.updateItem(id, updates);
}

export function deleteItem(id: string): boolean {
  if (!instance) return false;
  return instance.deleteItem(id);
}

export function getItem(id: string): BaseItem | null {
  if (!instance) return null;
  return instance.getItem(id);
}

export function getItems(): BaseItem[] {
  if (!instance) return [];
  return instance.getItems();
}

export function createApplication(
  application: Omit<Application, "id" | "createdAt">,
): Application | null {
  if (!instance) return null;
  return instance.createApplication(application);
}

export function updateApplication(
  id: string,
  updates: Partial<Application>,
): Application | null {
  if (!instance) return null;
  return instance.updateApplication(id, updates);
}

export function deleteApplication(id: string): boolean {
  if (!instance) return false;
  return instance.deleteApplication(id);
}

export function getApplicationsByItem(itemId: string): Application[] {
  if (!instance) return [];
  return instance.getApplicationsByItem(itemId);
}

export function getApplication(id: string): Application | null {
  if (!instance) return null;
  return instance.getApplication(id);
}

export function getAllApplications(): Application[] {
  if (!instance) return [];
  return instance.getAllApplications();
}

export function getLocalOpportunities() {
  if (typeof window === "undefined") return [];
  try {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    return items.filter((item: any) => item.type === "opportunity");
  } catch {
    return [];
  }
}

export function getLocalOpportunityBySlug(slug: string) {
  if (typeof window === "undefined") return null;
  try {
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    return (
      items.find(
        (item: any) => item.type === "opportunity" && item.slug === slug,
      ) || null
    );
  } catch {
    return null;
  }
}
