import { Response } from "express";
import { SUCCESS_CODES } from "../helpers/constant.helper";

export class AppResponse {
    static createApiResponse(res: Response, statusCode: number, message: string, data?: any) {
        let success: boolean = SUCCESS_CODES.includes(statusCode);
        return res.status(statusCode).send(
            data ? {
                success: success,
                statusCode: statusCode,
                message: message,
                data: data
            } : {
                success: success,
                statusCode: statusCode,
                message: message,
            }
        )
    }
}