import process from "node:process";
import express, { Application, ErrorRequestHandler } from "express";
import { API, HOST, PORT } from "./config/environment.config";
import { db } from "./config/db.config";
import { initalController } from "./controllers/inital.controller";
import { CustomError } from "./services/error.service";

class App {
    app: Application = express();
    
    constructor(){
      this.app.use(express.json());
      this.app.use(API, initalController);
      this.app.use(CustomError.errorHandler);
    }

    public async start(): Promise<void> {
        try {
            await db.getConnection();
            this.app.listen(PORT, HOST, () => {
              console.log(`Server listening on: http://${HOST}:${PORT}`);
            })  
          }catch (error: unknown) {
              console.error(`Database error: ${error}`);
              process.exit(1);            
          }
    }
}

export default App;