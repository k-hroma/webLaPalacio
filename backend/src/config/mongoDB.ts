import { connect, ConnectionStates } from 'mongoose'
import { ConnectResults } from '../types/connectionResults'
import dotenv from 'dotenv'

dotenv.config()

// URI de conexión a MongoDB desde las variables de entorno
const MONGO_URIDB = process.env.MONGO_URIDB || ""

// Estado de conexión global
let connectMDB: { isConnected: boolean } = { isConnected: false }

// Función asíncrona para conectar a MongoDB
const connectMongoDB = async (): Promise<ConnectResults> => {
  // Verifico la existencia de la URI de conexión
  if (!MONGO_URIDB) {
    const errMsg = "MongoDB URI is missing or empty"
    console.error(errMsg);
    return {
      success: false,
      message: errMsg
    }
  }

  // Retorno si ya existe una conexión activa
  if (connectMDB.isConnected) {
    const msg = "Using existing MongoDB connection"
    console.info(msg)
    return {
      success: true,
      message: msg
    }
  }

  try {
    // Intento establecer una nueva conexión
    const resultConnection = await connect(MONGO_URIDB, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    })

    // Verifico que se haya establecido la conexión
    if (!resultConnection) {
      throw new Error("Unexpected error while connecting to MongoDB")
    }

    // Compruebo que Mongoose esté conectado
    const isConnected = resultConnection.connection.readyState === ConnectionStates.connected
    if (!isConnected) {
      throw new Error("Connection established but not ready")
    }

    // Marco la conexión como activa
    connectMDB.isConnected = true

    // Configuro listeners para cambios en el estado de conexión
    resultConnection.connection.on('disconnected', () => {
      connectMDB.isConnected = false;
      console.warn("MongoDB connection lost")
    })

    resultConnection.connection.on('reconnected', () => {
      connectMDB.isConnected = true;
      console.info("MongoDB connection reestablished")
    })

    // Retorno éxito
    const msg = "MongoDB connected successfully."
    return {
      success: true,
      message: msg
    }

  } catch (error: unknown) {
    // Manejo de errores
    const errMsg = error instanceof Error ? error.message : "Fatal error: MongoDB connection failed"
    console.error(errMsg)
    return {
      success: false,
      message: errMsg
    }
  }
}

export { connectMongoDB }
