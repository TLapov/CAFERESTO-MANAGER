import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export class CustomError extends Error {
    status: number;
    code?: string
    
    constructor(statusCode: number, message: string, code?: string) {
        super(message)
        this.status = statusCode,
        this.code = code
    }

    static errorHandler: ErrorRequestHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status).send({
            success: false,
            statusCode: status,
            message: err.message 
        })
    }
}