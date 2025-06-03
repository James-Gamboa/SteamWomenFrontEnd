import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";

const handleLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();
  
  logout();
  localStorage.setItem("showLogoutToast", "1");
  router.push("/");
}; 