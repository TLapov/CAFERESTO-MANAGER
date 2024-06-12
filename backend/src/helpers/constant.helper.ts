export const BASE_PATH: string = '/';

export const enum HttpStatusCode {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500
};

export const SUCCESS_CODES: number[] = [
    HttpStatusCode.SUCCESS,
    HttpStatusCode.CREATED,
    HttpStatusCode.NO_CONTENT
];