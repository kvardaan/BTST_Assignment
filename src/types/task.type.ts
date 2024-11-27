import { z } from "zod"

export const taskSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be 5 or more characters long" })
    .max(128, { message: "Title must be 128 or less characters long" }),
  description: z.string().optional(),
  status: z.boolean({ required_error: "Status is required" }).default(false),
})

export type taskType = z.infer<typeof taskSchema>
