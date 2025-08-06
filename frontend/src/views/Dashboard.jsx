import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FormDashboard } from "../components/formDashboard/FormDashboard";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user, loggedOut, setLoggedOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    if (loggedOut) {
      setAlertShown(false);  // Reset alert flag on logout
      navigate("/");
      return;
    }

    if (!user && !alertShown) {
      toast.error("Debes iniciar sesión");
      setAlertShown(true);
      setTimeout(() => navigate("/"), 1500);
      return;
    }

    if (user && user.role !== "admin" && !alertShown) {
      toast.error("Usuario no autorizado");
      setAlertShown(true);
      setTimeout(() => navigate("/"), 1500);
      return;
    }

    if (user && user.role === "admin") {
      setLoading(false);
    }
  }, [user, loggedOut, alertShown, navigate]);

  useEffect(() => {
    if (loggedOut) {
      const timer = setTimeout(() => setLoggedOut(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [loggedOut, setLoggedOut]);

  if (loading) return <p>Cargando...</p>;

  return <FormDashboard />;
};

export { Dashboard };
