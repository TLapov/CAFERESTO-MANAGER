import {db} from "../../src/config/db.config";

class Category {
    name = 'category';
    async up() {
        await db.query(
            `CREATE TABLE IF NOT EXISTS ${this.name} (
                category_id INT PRIMARY KEY AUTO_INCREMENT,
                category_name VARCHAR(50) NOT NULL,
                active INT
            )`
        )
        await db.end();
    }
    async down() {
        await db.query(`DROP TABLE IF EXISTS ${this.name}`);
        await db.end();
    }
}

export default new Category();