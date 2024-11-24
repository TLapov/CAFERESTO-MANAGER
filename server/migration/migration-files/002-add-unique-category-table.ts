import {db} from "../../src/config/db.config";

class CategoryName {
    name = 'category';
    constrain = 'unique_category_name';
    column = 'category_name';

    async up() {
        await db.query(
            `ALTER TABLE ${this.name}
             ADD CONSTRAINT ${this.constrain} UNIQUE (${this.column});
            `
        )
    }
    
    async down() {
        await db.query(`
            ALTER TABLE ${this.name}
            DROP INDEX ${this.constrain}`
        );
    }
}

export default new CategoryName();