import dotenv from 'dotenv';

dotenv.config();

const API: string = `/api/${process.env.VERSION}`;

const PORT: number = Number(process.env.PORT);
const HOST: string = process.env.HOST || 'localhost';

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
    DB_ACCESS,
    DB_DATABASE
}