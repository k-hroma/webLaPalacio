import { app } from "./app";
import { ConnectResults } from "./types/connectionResults";
import dotenv from 'dotenv'
import { connectMongoDB } from "./config/mongoDB";
dotenv.config()

// defino variable PORT
const PORT = Number(process.env.PORT) || 3000

// defino función asyn para inicializar el servidor
const startServer = async (): Promise<ConnectResults> => {
  // verifico la existencia de la variable de entorno para establecer el puerto y si es un número válido
  if (!PORT || isNaN(PORT)) {
    const errMsg = "Invalid or missing PORT enviroment variable."
    console.error(errMsg)
    return {
      success: false,
      message: errMsg
    }
  }
  
  try {
    // Establezco conexion con base de datos
    const dbConnect = await connectMongoDB()
    if (!dbConnect.success) {
      const errMsg = dbConnect.message
      console.error(errMsg)
      throw new Error(errMsg)
    }
    // si la conexión es correcta envío un mensaje a la consola
    console.log(dbConnect.message)

    const msgConfirmation = `Server is running on port ${PORT}`;
    const apiUrlBooks = `http://localhost:${PORT}/books`;

    // el servidor express comienza a escuchar las conexiones entrantes en el puerto definido en la variable de entorno
    const listenPort = app.listen(PORT, () => {
      console.log(msgConfirmation);
            console.log(`Books API endpoint: ${apiUrlBooks}`);

    });

    // app.listen() siempre devuelve un servidor válido o lanza un error, asi que no es necesario verificarlo
    // si todo va bien retorno un objeto que respeta la interface de ConnectResult
    return {
      success: true,
      message: msgConfirmation
    }
    
  } catch (error: unknown) {
    // manejo de errores
    const errMsg = error instanceof Error ? error.message : "Unknown error"
    console.error(errMsg)
    return {
      success: false,
      message: errMsg
    }
  }
};

// exporto esta función para utilizarla en el controlador main.
export { startServer }