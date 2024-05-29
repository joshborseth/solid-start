import { createAsync, type RouteDefinition } from "@solidjs/router";
import { Show } from "solid-js";
import { Chat } from "~/components/Chat";
import { getRealtimeData } from "~/server/getRealtimeData";

export const route = {
  load: () => getRealtimeData(),
} satisfies RouteDefinition;

export default function Page() {
  const data = createAsync(() => getRealtimeData());
  return (
    <div class="h-full w-full flex justify-center items-center flex-col gap-10">
      <h1>App</h1>
      <section class="max-w-5xl w-full">
        <Show when={data()} keyed>
          {(data) => <Chat endpoint={data.endpoint} authorizer={data.authorizer} topic={data.topic} />}
        </Show>
      </section>
    </div>
  );
}
