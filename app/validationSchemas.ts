import { z } from "zod";

export const issuesSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
});

export const patchIssuesSchema = z.object({
    title: z.string().min(1).max(255).optional(),
    description: z.string().min(1).optional(),
    assignedToUserId: z
        .string()
        .min(1, "User must be assigned")
        .max(255)
        .optional()
        .nullable(),
});
