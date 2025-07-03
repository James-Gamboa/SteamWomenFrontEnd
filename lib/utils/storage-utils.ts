export const saveToLocalStorage = <T>(key: string, data: T): boolean => {
  try {
    const serializedData = JSON.stringify(data);

    try {
      localStorage.setItem(key, serializedData);
      return true;
    } catch (quotaError) {
      if (
        quotaError instanceof Error &&
        quotaError.name === "QuotaExceededError"
      ) {
        console.warn(
          "Storage quota exceeded, attempting cleanup and compression...",
        );

        const compressedData = compressData(serializedData);
        try {
          localStorage.setItem(key, compressedData);
          return true;
        } catch (compressionError) {
          console.warn("Compression failed, attempting cleanup...");

          cleanupOldData();
          try {
            localStorage.setItem(key, compressedData);
            return true;
          } catch (finalError) {
            console.error("All storage attempts failed:", finalError);
            return false;
          }
        }
      }
      throw quotaError;
    }
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
    return false;
  }
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    if (item.startsWith("COMPRESSED:")) {
      const decompressedData = decompressData(item);
      return JSON.parse(decompressedData);
    }

    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`);
    return null;
  }
};

export const removeFromLocalStorage = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage: ${error}`);
    return false;
  }
};

export const clearLocalStorage = (): boolean => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
    return false;
  }
};

const compressData = (data: string): string => {
  try {
    const compressed = data
      .replace(/\s+/g, " ")
      .replace(/"([^"]+)":/g, (match, key) => {
        const shortKeys: Record<string, string> = {
          id: "i",
          title: "t",
          description: "d",
          location: "l",
          date: "dt",
          time: "tm",
          category: "c",
          image: "img",
          slug: "s",
          organizer: "o",
          website: "w",
          fullDescription: "fd",
          requirements: "rq",
          benefits: "b",
          applicationProcess: "ap",
          type: "tp",
          createdAt: "ca",
          updatedAt: "ua",
        };
        return `"${shortKeys[key] || key}":`;
      });

    return `COMPRESSED:${compressed}`;
  } catch (error) {
    console.error("Compression failed:", error);
    return data;
  }
};

const decompressData = (compressedData: string): string => {
  try {
    const data = compressedData.replace("COMPRESSED:", "");

    const restored = data.replace(/"([^"]+)":/g, (match, key) => {
      const longKeys: Record<string, string> = {
        i: "id",
        t: "title",
        d: "description",
        l: "location",
        dt: "date",
        tm: "time",
        c: "category",
        img: "image",
        s: "slug",
        o: "organizer",
        w: "website",
        fd: "fullDescription",
        rq: "requirements",
        b: "benefits",
        ap: "applicationProcess",
        tp: "type",
        ca: "createdAt",
        ua: "updatedAt",
      };
      return `"${longKeys[key] || key}":`;
    });

    return restored;
  } catch (error) {
    console.error("Decompression failed:", error);
    return compressedData.replace("COMPRESSED:", "");
  }
};

const cleanupOldData = (): void => {
  try {
    const keys = Object.keys(localStorage);
    const now = Date.now();
    const maxAge = 30 * 24 * 60 * 60 * 1000;

    keys.forEach((key) => {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          const data = JSON.parse(item);
          if (data.createdAt) {
            const createdAt = new Date(data.createdAt).getTime();
            if (now - createdAt > maxAge) {
              localStorage.removeItem(key);
              console.log(`Cleaned up old data: ${key}`);
            }
          }
        }
      } catch (error) {}
    });
  } catch (error) {
    console.error("Cleanup failed:", error);
  }
};

export const getStorageUsage = (): {
  used: number;
  available: number;
  percentage: number;
} => {
  try {
    let used = 0;
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      const item = localStorage.getItem(key);
      if (item) {
        used += new Blob([item]).size;
      }
    });

    const estimatedAvailable = 5 * 1024 * 1024;
    const percentage = (used / estimatedAvailable) * 100;

    return {
      used,
      available: estimatedAvailable,
      percentage: Math.min(percentage, 100),
    };
  } catch (error) {
    console.error("Error calculating storage usage:", error);
    return { used: 0, available: 0, percentage: 0 };
  }
};

export const batchSaveToLocalStorage = <T>(
  items: Array<{ key: string; data: T }>,
): boolean => {
  try {
    const results = items.map(({ key, data }) => saveToLocalStorage(key, data));
    return results.every((result) => result);
  } catch (error) {
    console.error("Batch save failed:", error);
    return false;
  }
};

export const safeStorageSet = <T>(key: string, data: T): boolean => {
  const success = saveToLocalStorage(key, data);

  if (!success) {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
      console.warn(`Data saved to sessionStorage as fallback: ${key}`);
      return true;
    } catch (fallbackError) {
      console.error("Fallback storage also failed:", fallbackError);
      return false;
    }
  }

  return true;
};

export const safeStorageGet = <T>(key: string): T | null => {
  let data = getFromLocalStorage<T>(key);

  if (data === null) {
    try {
      const sessionData = sessionStorage.getItem(key);
      if (sessionData) {
        data = JSON.parse(sessionData);
        console.warn(`Data retrieved from sessionStorage: ${key}`);
      }
    } catch (error) {
      console.error("Fallback retrieval failed:", error);
    }
  }

  return data;
};

export const formatStorageSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getStorageStatus = (
  percentage: number,
): "normal" | "warning" | "critical" => {
  if (percentage >= 90) return "critical";
  if (percentage >= 75) return "warning";
  return "normal";
};

export const getStorageStatusMessage = (percentage: number): string => {
  const status = getStorageStatus(percentage);
  switch (status) {
    case "critical":
      return `¡Almacenamiento crítico! (${percentage.toFixed(1)}% usado)`;
    case "warning":
      return `Almacenamiento bajo (${percentage.toFixed(1)}% usado)`;
    default:
      return `Almacenamiento normal (${percentage.toFixed(1)}% usado)`;
  }
};

export const cleanupStorageByAge = (maxAgeInDays: number = 30): number => {
  try {
    const keys = Object.keys(localStorage);
    const now = Date.now();
    const maxAge = maxAgeInDays * 24 * 60 * 60 * 1000;
    let cleanedCount = 0;

    keys.forEach((key) => {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          const data = JSON.parse(item);
          if (data.createdAt) {
            const createdAt = new Date(data.createdAt).getTime();
            if (now - createdAt > maxAge) {
              localStorage.removeItem(key);
              cleanedCount++;
            }
          }
        }
      } catch (error) {}
    });

    return cleanedCount;
  } catch (error) {
    console.error("Manual cleanup failed:", error);
    return 0;
  }
};

export const cleanupStorageByType = (type: string): number => {
  try {
    const items = getFromLocalStorage<any[]>("items") || [];
    const filteredItems = items.filter((item) => item.type !== type);
    const removedCount = items.length - filteredItems.length;

    if (removedCount > 0) {
      safeStorageSet("items", filteredItems);
    }

    return removedCount;
  } catch (error) {
    console.error("Type-based cleanup failed:", error);
    return 0;
  }
};
