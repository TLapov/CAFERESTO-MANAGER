import { Response } from "express";
import { HttpStatusCode } from "../config/constants.config";

export class AppResponse {
    constructor(res: Response, statusCode: HttpStatusCode, message: string, data?: any) {
        return res.status(statusCode).send({
            success: statusCode < 400 ? true : false,
            statusCode: statusCode,
            message: message,
            data: data
        });
    }
}