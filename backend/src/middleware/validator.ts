import { NextFunction, Request, Response } from "node_modules/@types/express";
import { ZodSchema } from "node_modules/zod/v3/types.cjs";

export const validator = (schema: ZodSchema) => {
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: (err as Error).message
            })
        }
    }
}