import { app } from "./app";
import { ConnectResults } from "./types/connectionResults";
import { connectMongoDB } from "./config/mongoDB";

// Defino la variable PORT a partir de la variable de entorno o uso el puerto 3000 por defecto
const PORT = Number(process.env.PORT) || 3000

// Función asíncrona para inicializar el servidor y la conexión a la base de datos
const startServer = async (): Promise<ConnectResults> => {
  // Verifico que PORT sea un número válido
  if (!PORT || isNaN(PORT)) {
    const errMsg = "Invalid or missing PORT environment variable."
    console.error(errMsg)
    return {
      success: false,
      message: errMsg
    }
  }
  try {
    // Intento establecer la conexión con la base de datos MongoDB
    const dbConnect = await connectMongoDB()
    if (!dbConnect.success) {
      const errMsg = dbConnect.message
      console.error(errMsg)
      throw new Error(errMsg)
    }
    // Conexión exitosa, imprimo mensaje en consola
    console.log(dbConnect.message)

    const msgConfirmation = `Server is running on port ${PORT}`;
    const apiUrlBooks = `http://localhost:${PORT}/books`;

    // Inicio el servidor Express y escucho en el puerto definido
    app.listen(PORT, () => {
      console.log(msgConfirmation);
      console.log(`Books API endpoint: ${apiUrlBooks}`);
    });

    // Retorno objeto indicando éxito en la conexión y arranque del servidor
    return {
      success: true,
      message: msgConfirmation
    }
    
  } catch (error: unknown) {
    // Capturo y manejo errores, mostrando mensaje en consola y retornando fallo
    const errMsg = error instanceof Error ? error.message : "Unknown error"
    console.error(errMsg)
    return {
      success: false,
      message: errMsg
    }
  }
};

// Exporto la función para utilizarla en el punto de entrada (main)
export { startServer }
