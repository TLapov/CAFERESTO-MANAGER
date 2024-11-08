import process from "node:process";
import express, { Application, ErrorRequestHandler } from "express";
import { API, HOST, PORT } from "./config/environment.config";
import { db } from "./config/db.config";
import { AppError } from "./services/error.service";
import { initialRoutes } from "./routes/index.routes";

class App {
    app: Application = express();
    
    constructor(){
      this.app.use(express.json());
      this.app.use(API, initialRoutes);
      this.app.use(AppError.errorHandler);
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