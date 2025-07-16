import { connect, ConnectionStates } from 'mongoose'
import { ConnectResults } from '../types/connectionResults'
import dotenv from 'dotenv'

dotenv.config()

// 1. Defino variable de conexión
const MONGO_URIDB = process.env.MONGO_URIDB || ""
// 2. Defino un estado de conexión
let connectMDB: { isConnected: boolean } = { isConnected: false }

// 3. Defino una función asyncrónica de conexión

const connectMongoDB = async (): Promise<ConnectResults> => {
  // verificar que exista la variable de conexión
  if (!MONGO_URIDB) {
    const errMsg = "MongoDB URI is missing or empty"
    console.error(errMsg);
    return {
      success: false,
      message: errMsg
    }
  }

  // verifico si ya hay una conexión establecida
  if (connectMDB.isConnected) {
    const msg = "Using existing MongoDB connection"
    console.info(msg)
    return {
      success: true,
      message: msg
    }
  }

  try {
    // establezco conexión si no la hay
    const resultConnection = await connect(MONGO_URIDB, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    })
    // verifico que no hayan errores en la conexión
    if (!resultConnection) {
      throw new Error("Unexpected error while connecting MongoDB")
    }
    // verifico si mongoose está actualmente conectado a MongoDB
    // el resultado de esa comparación es un booleano
    const isConnected = resultConnection.connection.readyState === ConnectionStates.connected
    if (!isConnected) {
      throw new Error("Connection established but not ready")
    }
    // si no hubieron errores de conexión entonces modifico la propiedad de la variable connectMDB a true
    connectMDB.isConnected = true
    // agrego "escuchas" en los eventos de estado de conexion (disconnected y reconnected) de mongoose y actualizo la propiedad de la variable connectMDB
    resultConnection.connection.on('disconnected', () => {
      connectMDB.isConnected = false;
      console.warn("MongoDB connection lost")
    })
    
    resultConnection.connection.on('reconnected', () => {
      connectMDB.isConnected = true;
      console.info("MongoDB connection reestablished.")
    })
    // finalmente envío un mensaje de conexión exitosa y retorno un objeto que respeta la interface de ConnectResult
    const msg = "MongoDB connected successfully."
    console.log(`${msg} Host: ${resultConnection.connection.host}`)
    return {
      success: true,
      message: msg
    };
    
  } catch (error: unknown) {
    // manejo de errores y retorno de un objeto que respeta la interface de ConnectResult
    const errMsg = error instanceof Error ? error.message : "Fatal error: connection MongoDB failed"
    console.error(errMsg)
    return {
      success: false,
      message: errMsg
    }
  }
};

export { connectMongoDB }