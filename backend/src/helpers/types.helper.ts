import express from "express";

export type ExpressApp = express.Application;

export interface IValidateValues {
    [key: string]: {
        required?: [boolean, string],
        minLength?: [number, string],
        maxLength?: [number, string]
    }
}