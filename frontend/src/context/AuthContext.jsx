// Importar los hooks de React
import { createContext, useContext, useState, useEffect } from "react";
//createContext: para crear un nuevo contexto.
//useContext: para consumir el contexto.
//useState: para guardar el estado (token, user).
//useEffect: para ejecutar lógica al montar el componente (por ejemplo, verificar expiración del token).
import { jwtDecode } from "jwt-decode";
//Importa la función jwtDecode, que permite decodificar un token JWT y obtener su contenido (usuario, rol, expiración, etc.)

const AuthContext = createContext();
//Crea un nuevo contexto llamado AuthContext ----> Este objeto será el que compartirá valores a toda la aplicación.

//const AuthProvider: define un componente proveedor que envolverá tu app y compartirá los valores del contexto.
//children representa todo lo que esté dentro de <AuthProvider>...</AuthProvider>.
// Todo lo que esté dentro de este componente ({children}) podrá acceder a esos valores con useAuth().

const AuthProvider = ({ children }) => {
  //Creo una variable de estado llamada token.
  //La inicializo desde localStorage, por si el usuario ya tenía una sesión activa guardada.
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  
  const getToken = () => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? jwtDecode(storedToken) : null;
  }
  
  //Creo una variable de estado llamada user 
  //La inicializo desde localStorage, pero decodificando el token para extraer datos del usuario (como email, id, role, etc.).
  const [user, setUser] = useState(getToken);
  
  const [loggedOut, setLoggedOut] = useState(false);

  //Defino una función para guardar un nuevo token (por ejemplo, al hacer login).
  const handleToken = (token) => {
    if (token !== undefined) {
      localStorage.setItem("token", token); //// lo guarda en localStorage
      setToken(token); //---------------------// lo guarda en el estado
      setUser(jwtDecode(token)); //-----------// lo decodifica y guarda el usuario
      setLoggedOut(false)
    }
  };

  // Esta función cierra sesión: borra todo y resetea el estado
  const handleLogOut = () => {
    setLoggedOut(true); // ✅ marcamos que fue un logout voluntario
    localStorage.removeItem("token");  // borra el token del navegador
    setToken(null);                    // limpia el estado local
    setUser(null);                     // borra el usuario
  };
  
  // Este useEffect se ejecuta una vez al montar el componente (por el []).
  // Verifica si el token está vencido (decoded.exp está en segundos, por eso se multiplica por 1000).
  
  // Si ya expiró, ejecuta handleLogout() automáticamente.
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        handleLogOut();
      }
    }
  }, []);
  // Retorna el proveedor del contexto (<AuthContext.Provider>), con los valores que va a compartir:
  
  return (
    <AuthContext.Provider value={{ user, token, setUser, handleToken, handleLogOut, setLoggedOut, loggedOut }}>
      {children}
    </AuthContext.Provider>
  );
};

//Esto define un custom hook (useAuth) para acceder fácilmente al contexto en cualquier parte de la app.
const useAuth = () => useContext(AuthContext);

// Exporta todo para usarlo en otros archivos:
// AuthProvider: para envolver la app.
// useAuth: para acceder al contexto en cualquier componente.
export { useAuth, AuthProvider };
