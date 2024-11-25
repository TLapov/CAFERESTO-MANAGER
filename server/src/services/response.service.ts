import { Response } from "express";
import { HttpStatusCode } from "../config/constants.config";
import { AppError } from "./error.service";
import { NODE_ENV } from "../config/environment.config";

export class AppResponse {
    
    static notImplemented(res: Response) {
        const statusCode:HttpStatusCode = HttpStatusCode.NOT_IMPLEMENTED;
        res.status(statusCode).send({
            success: false,
            statusCode: statusCode,
            message: 'This API is not implemented yet!'
        });
    }

    static errorResponse(res: Response, error: AppError) {
        const isDevMode:boolean = NODE_ENV === 'development';
        const statusCode:HttpStatusCode = error.status ? error.status : HttpStatusCode.INTERNAL_SERVER_ERROR;
        res.status(statusCode).send({
            success: false,
            statusCode: statusCode,
            message: error.message,
            ...(isDevMode && { code: error.code, stack: error.stack, })
        });
    }

    static successResponse<T>(res: Response, statusCode: HttpStatusCode, message: string, data?: T | T[]) {
        res.status(statusCode).send({
            success: true,
            statusCode: statusCode,
            message: message,
            data: data
        });
    }
}