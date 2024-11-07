import { Response } from "express";

export class AppResponse {
    constructor(res: Response, statusCode: number, message: string, data?: any) {
        return res.status(statusCode).send({
            success: statusCode < 400 ? true : false,
            statusCode: statusCode,
            message: message,
            data: data
        });
    }
}