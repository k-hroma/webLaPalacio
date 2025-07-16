import { startServer } from "./server";

const main = async () => { 
  try {
    await startServer();
  } catch (error:unknown) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};
main();
