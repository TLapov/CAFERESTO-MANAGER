import process from "node:process";
import express, { Application } from "express";
import { API, HOST, PORT } from "./config/environment.config";
import { db } from "./config/db.config";
import { AppError } from "./services/error.service";
import { initialRoutes } from "./routes/index.routes";
import http, { Server } from "node:http";

class App {
    app: Application = express();
    server: Server;
    url: string = `http://${HOST}:${PORT}`;
    
    constructor(){
      this.app.use(express.json());
      this.app.use(API, initialRoutes);
      this.app.use(AppError.errorHandler);
      this.server = http.createServer(this.app);
    }

    public async start(): Promise<void> {
        try {
            await db.getConnection();
            this.server.listen(PORT, HOST, () => {
              console.log(`Server listening on: ${this.url}`);
            });
          }catch (error: unknown) {
              console.error(`Database error: ${error}`);
              process.exit(1);            
          }
    }

    public async close(): Promise<void> {
      try {
        await db.end();
        this.server.close(() => {
          console.log(`Server on ${this.url} close`);
          process.exit(0);
        }); 
      } catch (error) {
        console.error(error);
        process.exit(1)
      }
    }

}

export default App;