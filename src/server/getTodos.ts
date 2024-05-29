import { cache } from "@solidjs/router";
import { z } from "zod";

const todoSchema = z.array(
  z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean(),
  })
);

export const getTodos = cache(async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return todoSchema.parse(await response.json());
}, "todos");
