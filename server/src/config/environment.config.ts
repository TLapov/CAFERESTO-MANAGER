import dotenv from 'dotenv';

dotenv.config();

const CURR_DIR = process.cwd();

const BASE_PATH: string = '/';
const API: string = `/api/${process.env.VERSION}`;

const PORT: number = Number(process.env.PORT);
const HOST: string = process.env.HOST || 'localhost';

const DB_PORT = Number(process.env.DB_PORT);
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

export {
    CURR_DIR,
    BASE_PATH,
    API,
    PORT, 
    HOST,
    DB_PORT,
    DB_HOST,
    DB_PASSWORD,
    DB_USER,
    DB_DATABASE
}