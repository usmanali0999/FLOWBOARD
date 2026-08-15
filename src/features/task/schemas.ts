import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Task title must be at least 2 characters")
    .max(100, "Task title must be at most 100 characters"),
  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters")
    .optional()
    .or(z.literal("")),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  columnId: z.string().min(1, "Column is required"),
  boardId: z.string().min(1, "Board is required"),
});

export const reorderTaskSchema = z.object({
  taskId: z.string(),
  sourceColumnId: z.string(),
  destinationColumnId: z.string(),
  newOrder: z.number(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type ReorderTaskInput = z.infer<typeof reorderTaskSchema>;