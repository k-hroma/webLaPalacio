import { startServer } from "./server";
import dotenv from 'dotenv'
dotenv.config()

// Función principal que inicia el servidor y maneja errores críticos
const main = async () => { 
  try {
    await startServer();
  } catch (error: unknown) {
    console.error("Failed to start server:", error);
    // Salir con código 1 en caso de error al iniciar el servidor
    process.exit(1);
  }
};

main();

