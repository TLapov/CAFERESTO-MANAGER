import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { HttpStatusCode } from "../config/constants.config";

export class AppError extends Error {
    status: HttpStatusCode;
    code?: string
    
    constructor(statusCode: HttpStatusCode, message: string, code?: string) {
        super(message)
        this.status = statusCode,
        this.code = code
    }

    static errorHandler: ErrorRequestHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status ? err.status : HttpStatusCode.INTERNAL_SERVER_ERROR;
        res.status(status).send({
            success: false,
            statusCode: status,
            message: err.message 
        })
    }
}