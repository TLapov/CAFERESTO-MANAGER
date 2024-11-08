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


// Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'FRaOM category' at line 1
//     at PromisePool.execute (C:\Users\Toni\Desktop\PROJECTS\CAFERESTO-MANAGER\server\node_modules\mysql2\promise.js:374:22)
//     at CategoryModel.<anonymous> (C:\Users\Toni\Desktop\PROJECTS\CAFERESTO-MANAGER\server\src\models\base.model.ts:11:33)
//     at Generator.next (<anonymous>)
//     at C:\Users\Toni\Desktop\PROJECTS\CAFERESTO-MANAGER\server\src\models\base.model.ts:8:71
//     at new Promise (<anonymous>)
//     at __awaiter (C:\Users\Toni\Desktop\PROJECTS\CAFERESTO-MANAGER\server\src\models\base.model.ts:4:12)
//     at CategoryModel.findAll (C:\Users\Toni\Desktop\PROJECTS\CAFERESTO-MANAGER\server\src\models\base.model.ts:16:16)
//     at CategoryService.<anonymous> (C:\Users\Toni\Desktop\PROJECTS\CAFERESTO-MANAGER\server\src\services\category.service.ts:6:48)
//     at Generator.next (<anonymous>)
//     at C:\Users\Toni\Desktop\PROJECTS\CAFERESTO-MANAGER\server\src\services\category.service.ts:8:71 {
//   code: 'ER_PARSE_ERROR',
//   errno: 1064,
//   sql: 'SELECT * FRaOM category',
//   sqlState: '42000',
//   sqlMessage: "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'FRaOM category' at line 1"