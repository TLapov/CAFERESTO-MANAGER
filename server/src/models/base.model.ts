import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../config/db.config";

export class BaseModel {
    table: string;
    primaryKey: string;

    async findAll<T>(): Promise<T> {
        const sql = `SELECT * FROM ${this.table}`;
        const [data] = await db.execute<RowDataPacket[]>(sql);
        return data as T;
    }

    async create<T extends Record<string, any>>(data: T): Promise<ResultSetHeader> {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(', ');
        const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`;
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async update<T extends Record<string, any>>(id: number, data: T): Promise<ResultSetHeader> {
        delete data[this.primaryKey];
        const columns = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const values = Object.values(data);
        const sql = `UPDATE ${this.table} SET ${columns} WHERE ${this.primaryKey} = ?`;
        const [result] = await db.execute(sql, [...values, id]);
        return result as ResultSetHeader;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = `DELETE FROM ${this.table} WHERE ${this.primaryKey} = ?`;
        const [result] = await db.execute<ResultSetHeader>(sql, [id]);
        return result;
    }
}