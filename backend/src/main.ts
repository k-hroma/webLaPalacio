// Importa y configura dotenv para cargar variables de entorno desde el archivo .env.
import dotenv from "dotenv";
dotenv.config();

// Importa la función startServer desde el archivo de configuración del servidor.
import { startServer } from "./server";


// Función principal que inicia la aplicación.
// Es el único punto de control donde se decide si la aplicación continúa o termina.
const main = async (): Promise<void> => {
  try {
    // Intenta iniciar el servidor y la conexión a la base de datos.
    // Si cualquier paso falla, lanzará una excepción que será capturada abajo.
    await startServer();
    
    // Si llegamos aquí, todo inició correctamente.
    console.log('✅ Application started successfully');
    
  } catch (error: unknown) {
    // Captura cualquier error crítico del proceso de inicio.
    const message = error instanceof Error ? error.message : "Unknown error";
    
    // Muestra el error en consola de errores.
    console.error('❌ Fatal error during startup:', message);
    
    // Termina el proceso con código de error (1).
    // Esto permite que sistemas externos (Docker, systemd, PM2) detecten el fallo.
    process.exit(1);
  }
};

// Ejecuta la función principal.
main();