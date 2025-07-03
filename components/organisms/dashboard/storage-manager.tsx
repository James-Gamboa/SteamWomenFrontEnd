import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, HardDrive, AlertTriangle } from "lucide-react";
import {
  getStorageUsage,
  clearLocalStorage,
  safeStorageGet,
  safeStorageSet,
  formatStorageSize,
  getStorageStatus,
  getStorageStatusMessage,
  cleanupStorageByAge,
  cleanupStorageByType,
} from "@/lib/utils/storage-utils";
import { toast } from "sonner";

interface StorageInfo {
  used: number;
  available: number;
  percentage: number;
}

export const StorageManager = () => {
  const [storageInfo, setStorageInfo] = useState<StorageInfo>({
    used: 0,
    available: 0,
    percentage: 0,
  });
  const [isCleaning, setIsCleaning] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const loadStorageInfo = () => {
    const info = getStorageUsage();
    setStorageInfo(info);

    const items = safeStorageGet<any[]>("items") || [];
    setItemCount(items.length);
  };

  useEffect(() => {
    loadStorageInfo();
  }, []);

  const handleCleanup = async () => {
    setIsCleaning(true);
    try {
      const removedCount = cleanupStorageByAge(30);

      if (removedCount > 0) {
        toast.success(`${removedCount} elementos antiguos eliminados`, {
          style: {
            backgroundColor: "#F1F0FB",
            color: "#1A1F2C",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "14px",
            lineHeight: "18px",
            fontWeight: "500",
          },
        });
      } else {
        toast.info("No hay elementos antiguos para eliminar", {
          style: {
            backgroundColor: "#F1F0FB",
            color: "#1A1F2C",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "14px",
            lineHeight: "18px",
            fontWeight: "500",
          },
        });
      }

      loadStorageInfo();
    } catch (error) {
      console.error("Error during cleanup:", error);
      toast.error("Error durante la limpieza", {
        style: {
          backgroundColor: "#FEF2F2",
          color: "#DC2626",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
    } finally {
      setIsCleaning(false);
    }
  };

  const handleClearAll = async () => {
    if (
      !confirm(
        "¿Estás seguro de que quieres eliminar todos los datos? Esta acción no se puede deshacer.",
      )
    ) {
      return;
    }

    setIsCleaning(true);
    try {
      clearLocalStorage();
      toast.success("Todos los datos han sido eliminados", {
        style: {
          backgroundColor: "#F1F0FB",
          color: "#1A1F2C",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
      loadStorageInfo();
    } catch (error) {
      console.error("Error clearing storage:", error);
      toast.error("Error al eliminar los datos", {
        style: {
          backgroundColor: "#FEF2F2",
          color: "#DC2626",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: "500",
        },
      });
    } finally {
      setIsCleaning(false);
    }
  };

  const getCurrentStorageStatus = () => {
    return getStorageStatus(storageInfo.percentage);
  };

  const statusConfig = {
    critical: {
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: AlertTriangle,
      message: "Espacio de almacenamiento crítico",
    },
    warning: {
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: AlertTriangle,
      message: "Espacio de almacenamiento bajo",
    },
    normal: {
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: HardDrive,
      message: "Espacio de almacenamiento normal",
    },
  };

  const status = getCurrentStorageStatus();
  const config = statusConfig[status];

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <config.icon className={`w-5 h-5 ${config.color}`} />
          Gestión de Almacenamiento
        </CardTitle>
        <CardDescription>
          Monitorea y gestiona el espacio de almacenamiento local
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`p-3 rounded-lg border ${config.bgColor} ${config.borderColor}`}
        >
          <p className={`text-sm font-medium ${config.color}`}>
            {config.message}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uso de almacenamiento</span>
            <span className="font-medium">
              {storageInfo.percentage.toFixed(1)}%
            </span>
          </div>
          <Progress value={storageInfo.percentage} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatStorageSize(storageInfo.used)} usado</span>
            <span>{formatStorageSize(storageInfo.available)} disponible</span>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>
            Elementos almacenados:{" "}
            <span className="font-medium">{itemCount}</span>
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCleanup}
            disabled={isCleaning}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            {isCleaning ? "Limpiando..." : "Limpiar Antiguos"}
          </Button>
          <Button
            onClick={handleClearAll}
            disabled={isCleaning}
            variant="destructive"
            size="sm"
            className="flex-1"
          >
            {isCleaning ? "Eliminando..." : "Eliminar Todo"}
          </Button>
        </div>

        {storageInfo.percentage >= 75 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              El almacenamiento está casi lleno. Considera limpiar datos
              antiguos o eliminar elementos innecesarios.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
