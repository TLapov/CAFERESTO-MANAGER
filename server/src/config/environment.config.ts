import dotenv from 'dotenv';

dotenv.config();

const API: string = `/api/${process.env.VERSION}`;

const PORT: number = Number(process.env.PORT);
const HOST: string = process.env.HOST || 'localhost';
const NODE_ENV: string = process.env.NODE_ENV as string;

const DB_ACCESS = {
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}
const DB_DATABASE = process.env.DB_DATABASE;

export {
    API,
    PORT, 
    HOST,
    NODE_ENV,
    DB_ACCESS,
    DB_DATABASE
}