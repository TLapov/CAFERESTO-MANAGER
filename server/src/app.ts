import process from "node:process";
import http, { Server } from "node:http";
import express, { Application } from "express";
import { db } from "./config/db.config";
import { HOST, PORT, API } from "./config/environment.config";
import { appRoutes } from "./routes/index.routes";
import { AppError } from "./services/error.service";


class App {
    app: Application = express();
    server: Server;
    url: string = `http://${HOST}:${PORT}`;
    
    constructor(){
      this.app.use(express.json());
      this.app.use(API, appRoutes);
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

    public async close() {
        this.server.close(async() => {
          try{
            await db.end();
            console.log(`Server on ${this.url} close`);
          }catch(error: unknown) {
            console.error('Error occured during close server and database\n' + error);
          }
        })
    }

}

export default App;
