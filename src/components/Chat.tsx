import { For, Show, createEffect, createSignal, onCleanup } from "solid-js";
import { mqtt } from "aws-iot-device-sdk-v2";
import { createConnection } from "~/utils/createConnection";
import { Button } from "./Button";

export function Chat(props: { topic: string; endpoint: string; authorizer: string }) {
  const [messages, setMessages] = createSignal<string[]>([]);
  const [connection, setConnection] = createSignal<mqtt.MqttClientConnection | null>(null);

  createEffect(() => {
    const connection = createConnection(props.endpoint, props.authorizer);

    connection.on("connect", async () => {
      try {
        await connection.subscribe(props.topic, mqtt.QoS.AtLeastOnce);
        setConnection(connection);
      } catch (e) {}
    });
    connection.on("message", (_fullTopic, payload) => {
      const message = new TextDecoder("utf8").decode(new Uint8Array(payload));
      setMessages((prev) => [...prev, message]);
    });
    connection.on("error", console.error);

    connection.connect();

    onCleanup(() => {
      connection.disconnect();
      setConnection(null);
    });
  });

  return (
    <div class="w-full flex flex-col gap-4 p-4">
      <div class="h-80 border-2 p-4 overflow-y-auto">
        <Show when={Boolean(messages().length && connection())}>
          <For each={messages()}>{(msg) => <div>{msg}</div>}</For>
        </Show>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const input = (e.target as HTMLFormElement).message;
          connection()!.publish(props.topic, input.value, mqtt.QoS.AtLeastOnce);
          input.value = "";
        }}
        class="flex flex-col gap-4"
      >
        <input
          required
          autofocus
          type="text"
          name="message"
          class="text-black py-2 px-2 w-full outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500"
          placeholder={connection() ? "Type your message here" : "Connecting..."}
        />
        <Button disabled={connection() === null}>Send</Button>
      </form>
    </div>
  );
}
