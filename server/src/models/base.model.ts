import { db } from "../config/db.config";

export class BaseModel {
    table: string;
    primaryKey: string;

    async sqlFind() {
        const sql = `SELECT * FROM ${this.table}`;
        const [data] = await db.execute(sql);
        return data;
    }
}