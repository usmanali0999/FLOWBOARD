import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Workspace name must be at least 3 characters")
    .max(40, "Workspace name must be at most 40 characters"),
  description: z
    .string()
    .trim()
    .max(160, "Description must be at most 160 characters")
    .optional()
    .or(z.literal("")),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;