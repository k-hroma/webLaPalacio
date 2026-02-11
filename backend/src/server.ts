// Importa la instancia de Express (la aplicación configurada) desde el archivo ./app.
// Este 'app' contiene todas las rutas, middlewares y configuraciones del servidor ya listas.
// Express no abre puertos solo, necesita a Node (http.Server) <-
import { app } from './app';

// Importa la función connectMongoDB desde la configuración de MongoDB.
// Esta función se encarga de establecer la conexión con la base de datos MongoDB.
import { connectMongoDB } from './config/mongoDB';

// Define el puerto del servidor: convierte la variable de entorno PORT a número,
// o usa 3000 como valor por defecto si PORT no está definida o es inválida.
const PORT = Number(process.env.PORT) || 3000;

/**
 * Inicializa el servidor HTTP y la conexión a la base de datos.
 * @throws Error si falla la conexión a BD o el servidor no puede iniciar
 */

// Declara la función asíncrona startServer que no retorna valor (void).
// La documentación JSDoc indica que lanza excepciones en caso de error.
const startServer = async (): Promise<void> => {
  
  // Valida que PORT sea un número válido y positivo.
  // Si es undefined, null, NaN o 0, lanza un error inmediatamente.
  if (!PORT || isNaN(PORT)) {
    throw new Error('❌ Invalid PORT environment variable');
  }

  // Intenta conectar con MongoDB de forma asíncrona.
  // Espera a que la conexión se establezca antes de continuar.
  const dbConnection = await connectMongoDB();
  
  // Verifica si la conexión a la base de datos fue exitosa.
  // Si success es false, lanza error con el mensaje específico del fallo.
  if (!dbConnection.success) {
    throw new Error(`❌ Database connection failed: ${dbConnection.message}`);
  }

  // Muestra en consola el mensaje de éxito de la conexión a MongoDB.
  console.log(`📦 ${dbConnection.message}`);

  // Retorna una nueva Promise para poder usar async/await con app.listen().
  // Esto permite capturar errores del servidor (ej: puerto ocupado) con reject.
  return new Promise((resolve, reject) => {
    
    // Inicia el servidor Express en el puerto definido.
    // El callback se ejecuta cuando el servidor está listo y escuchando.
    
    //app.listen devuelve un http.Server de Node.
    /*
    const http = require("http");
    const server = http.createServer(app);
    server.listen(PORT, callback);
    */
    const server = app.listen(PORT, () => {
      
      // Muestra mensaje de éxito para identificar inicio del servidor.
      console.log(`🚀 Server running on port ${PORT}`);
      
      // Muestra la URL de la API de libros para referencia rápida.
      console.log(`📚 API endpoint: http://localhost:${PORT}/books`);
      
      // Resuelve la Promise indicando que el servidor inició correctamente.
      resolve();
    });

    // Escucha eventos de error en la instancia del servidor.
    // Captura errores como: puerto ocupado (EADDRINUSE), permisos denegados (EACCES), etc.
    server.on('error', (error) => {
      // Rechaza la Promise con un Error formateado, incluyendo el mensaje original.
      reject(new Error(`❌ Server failed to start: ${error.message}`));
    });
  });
};

// Exporta la función startServer para que pueda ser utilizada en el punto de entrada (main/index).
export { startServer };