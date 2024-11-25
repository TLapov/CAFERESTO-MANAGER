import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { HttpStatusCode } from "../config/constants.config";
import { AppResponse } from "./response.service";

export class AppError extends Error {
    status: HttpStatusCode;
    code?: string
    
    constructor(statusCode: HttpStatusCode, message: string, code?: string) {
        super(message)
        this.status = statusCode,
        this.code = code
    }

    static errorHandler: ErrorRequestHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
        console.log(err)
        AppResponse.errorResponse(res, err);
    }
}
