import { ResultSetHeader } from "mysql2";
import db from "../config/db.config";

export class BaseModel {
    tableName: string;
    primaryKey: string;

    async get<T>(): Promise<T[]> {
        const sql = `SELECT * FROM ${this.tableName}`;
        const [result] = await db.execute(sql);
        return result as T[];
    }

    async create<T extends Record<string, any>>(data: T) {
        const keys = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(', ');
        const sql = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`;
        const [result] =  await db.execute(sql, values);
        return result as ResultSetHeader;
    }

    async update<T extends Record<string, any>>(id: number, data: T) {
        const keys = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const values = Object.values(data);
        const sql = `UPDATE ${this.tableName} SET ${keys} WHERE id = ?`;
        const [result] = await db.execute(sql, [...values, id]);
        return result as ResultSetHeader;
    }

    async sqlDelete(id: number): Promise<ResultSetHeader> {
        const sql = `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?`;
        const [result] = await db.execute(sql, [id]);
        return result as ResultSetHeader;
    }
}

