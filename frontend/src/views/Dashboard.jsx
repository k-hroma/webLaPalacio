import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FormDashboard } from "../components/formDashboard/FormDashboard";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user, handleLogOut, loggedOut} = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  

  const handleClick = () => { 
    handleLogOut()
    if (loggedOut) { 
      return navigate("/");
    }
    toast.error("Cerrando sesión")
    return navigate("/")
  }

  useEffect(() => {
    
    if (!user) {
      toast.error("Debes iniciar sesión");
      setTimeout(() => navigate("/"), 1500);
      return;
    }

    if (user && user.role !== "admin") {
      toast.error("Usuario no autorizado");
      setTimeout(() => navigate("/"), 1500);
      return;
    }

    if (user && user.role === "admin") {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <>
      <div className="dash-wraper">
        <button type='button' onClick={handleClick} className="logout-button">Cerrar sesión</button>
        <FormDashboard />
        </div>
    </>
  ) 
};

export { Dashboard };
