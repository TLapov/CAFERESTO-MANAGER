import App from "./src/app";
import db from "./src/config/db.config";
import { HOST, PORT } from "./src/config/dotenv.config";

(async () => {
    try {
        await db.getConnection();
        const server = new App();
        server.listen(PORT, HOST, () => {
            console.log(`Server is running on ${HOST}:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
})();
