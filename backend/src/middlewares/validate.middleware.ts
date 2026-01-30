import type {Request, Response, NextFunction} from "express";
import type {ZodSchema} from "zod";

export const validateSchema = (schema: ZodSchema) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            status: 400,
            message: "Validation error",
            errors: result.error.issues.map((error) => ({
                field: error.path.join("."),
                message: error.message,
            })),
        });
    }

    req.body = result.data;
    next();
};
