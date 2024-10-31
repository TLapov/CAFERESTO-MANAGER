import { db, initDb } from "../config/db.config";
import { DB_DATABASE } from "../config/environment.config";
import { GREEN, RED } from "../utils/cli.util";

(async() => {
    try {
        await initDb.execute(`CREATE DATABASE IF NOT EXISTS ${DB_DATABASE}`);
        await db.execute(`CREATE TABLE IF NOT EXISTS migration (
            id VARCHAR(40) PRIMARY KEY UNIQUE,
            description VARCHAR(100) NOT NULL,
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
        );
        console.log(GREEN, 'Migration done!!!');
    }catch(error: unknown) {
        console.log(error)
        console.error(RED, `Migration fail\n${error}\n`);
    }finally{
        await initDb.end();
        await db.end();
    }
})();
