import { z } from "zod";
import { PointEstimate, Status, TaskTag } from "../types/graphql";

export const UserSchema = z.object({
  id: z.string().min(1, "User is required"),
});

export const taskFormSchema = z.object({
  name: z.string().min(1, "Title is required"),
  assigneeId: z.string().min(1, "User is required"),
  dueDate: z.string().datetime({ message: "Invalid date" }),
  pointEstimate: z.nativeEnum(PointEstimate),
  status: z.nativeEnum(Status),
  tags: z.array(z.nativeEnum(TaskTag)).min(1, "Select at least one tag"),
});
