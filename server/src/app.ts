import express, { Application } from "express";
import { HOST, PORT } from "./config/environment.config";

class App {
    app: Application = express();

    start(): void {
        this.app.listen(3000, () => console.log(`Server listening on: http://${HOST}:${PORT}`))
    }
}

export default App;