import mysql, { PoolOptions } from 'mysql2/promise';
import { DB_DATABASE, DB_ACCESS } from './environment.config';

const access: PoolOptions = {
    ...DB_ACCESS,
    database: DB_DATABASE
}

export const db = mysql.createPool(access);
export const initDb = mysql.createPool({...DB_ACCESS, database: undefined});