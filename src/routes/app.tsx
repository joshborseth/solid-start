import { RouteDefinition, createAsync } from "@solidjs/router";
import { getTodos } from "~/server/getTodos";

export const route = {
  load: () => getTodos(),
} satisfies RouteDefinition;

export default function Page() {
  const data = createAsync(() => getTodos());
  return (
    <>
      <h1>App</h1>
      <div class="h-80 w-1/3 overflow-y-scroll break-words">{JSON.stringify(data())}</div>
    </>
  );
}
