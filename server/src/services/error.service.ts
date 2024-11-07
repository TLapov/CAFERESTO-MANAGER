import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export class AppError extends Error {
    status: number;
    code?: string
    
    constructor(statusCode: number, message: string, code?: string) {
        super(message)
        this.status = statusCode,
        this.code = code
    }

    static errorHandler: ErrorRequestHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status ? err.status : 500;
        res.status(status).send({
            success: false,
            statusCode: status,
            message: err.message 
        })
    }
}