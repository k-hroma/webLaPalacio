import { connect, ConnectionStates } from 'mongoose';
import { ConnectResults } from '../types/connectionResults';

const MONGO_URI = process.env.MONGO_URI;

// Estado global para patrón Singleton (evita reconexiones en serverless)
let isConnected = false;

/**
 * Establece conexión con MongoDB.
 * Reutiliza conexiones activas en entornos serverless.
 */
const connectMongoDB = async (): Promise<ConnectResults> => {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI environment variable is required');
  }

  if (isConnected) {
    console.info('📦 Using existing MongoDB connection');
    return { success: true, message: 'Using existing connection' };
  }

  try {
    const conn = await connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });

    if (conn.connection.readyState !== ConnectionStates.connected) {
      throw new Error('MongoDB connection not ready');
    }

    isConnected = true;

    // Event listeners para monitoreo
    conn.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('⚠️ MongoDB disconnected');
    });

    conn.connection.on('reconnected', () => {
      isConnected = true;
      console.info('✅ MongoDB reconnected');
    });

    return { success: true, message: 'MongoDB connected successfully' };

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown connection error';
    
    throw new Error(`MongoDB connection failed: ${message}`);
  
  }
};

export { connectMongoDB };