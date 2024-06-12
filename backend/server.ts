import App from "./src/app";
import { HOST, PORT } from "./src/config/dotenv.config";

const server = new App();

server.listen(PORT, HOST,  () => {
    console.log(`Server listen on http://${HOST}:${PORT}`);
});