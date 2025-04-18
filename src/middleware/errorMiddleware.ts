import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({error: error.message})
}