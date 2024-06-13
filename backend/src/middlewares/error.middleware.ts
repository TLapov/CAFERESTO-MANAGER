import { Response, Request, ErrorRequestHandler, NextFunction } from "express";
import { HttpStatusCode } from "../helpers/constant.helper";
import { AppError } from "../utils/error.util";
import { AppResponse } from "../utils/response.util";

const errorMiddleware: ErrorRequestHandler  = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode ? err.statusCode : HttpStatusCode.INTERNAL_SERVER_ERROR;

    AppResponse.createApiResponse(res, statusCode, err.message);

}

export default errorMiddleware;
