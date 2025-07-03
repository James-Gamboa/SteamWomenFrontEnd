import { useState, useEffect } from "react";
import { getStorageUsage } from "@/lib/utils/storage-utils";

export const useStorageMonitor = () => {
  const [storageInfo, setStorageInfo] = useState({
    used: 0,
    available: 0,
    percentage: 0,
  });
  const [isWarning, setIsWarning] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    const checkStorage = () => {
      const info = getStorageUsage();
      setStorageInfo(info);
      setIsWarning(info.percentage >= 75);
      setIsCritical(info.percentage >= 90);
    };

    checkStorage();

    const interval = setInterval(checkStorage, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    storageInfo,
    isWarning,
    isCritical,
    refreshStorage: () => {
      const info = getStorageUsage();
      setStorageInfo(info);
      setIsWarning(info.percentage >= 75);
      setIsCritical(info.percentage >= 90);
    },
  };
};
