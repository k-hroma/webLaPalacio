import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loggedOut } = useAuth();

  // Si no hay usuario y no es logout → redirigir al home con toast
  if (!user && !loggedOut) {
    toast.error("Debes iniciar sesión para acceder");
    return <Navigate to="/" replace />;
  }

  // Si el usuario existe pero no tiene el rol necesario → redirigir al home con toast
  if (user && requiredRole && user.role !== requiredRole) {
    toast.error("Usuario no autorizado");
    return <Navigate to="/" replace />;
  }

  return children; // ✅ Renderiza el componente si pasa las validaciones
};

export { PrivateRoute };
