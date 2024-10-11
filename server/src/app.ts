import process from "node:process";
import express, { Application } from "express";
import { HOST, PORT } from "./config/environment.config";
import db from "./config/db.config";

class App {
    app: Application = express();

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