import dotenv from "dotenv";
import os from "os";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";

const server = app.listen(PORT, () => {
  const startTime = new Date().toLocaleString();
  const host = os.hostname();
  console.log(`
  ============================================
  🚀 Server is running!                        
  ============================================
  🌐 URL: http://localhost:${PORT}              
  📅 Started at: ${startTime}                   
  🖥️  Host: ${host}                            
  🌍 Environment: ${ENV}                       
  ============================================
  `);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

const gracefulShutdown = () => {
  console.log("Shutting down gracefully...");
  server.close(() => {
    console.log("Closed out remaining connections.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forcing shutdown...");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
