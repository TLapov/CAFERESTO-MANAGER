import {db} from "../../config/db.config";

class Category {
    name = 'category';
    async up() {
        try {
            await db.query(
                `CREATE TABLE IF NOT EXISTS ${this.name} (
                 category_id INT PRIMARY KEY AUTO_INCREMENT,
                 category_name VARCHAR(50) NOT NULL,
                 active INT
                )`
            )
        }catch(error:unknown) { throw error }
    }
    async down() {
        await db.query(`DROP TABLE IF EXISTS ${this.name}`);
    }
}

export default new Category();