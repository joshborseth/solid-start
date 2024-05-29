import { JSX } from "solid-js";

export const Button = (props: JSX.HTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} class="bg-blue-900 rounded-lg px-4 py-2 hover:bg-blue-900/50 transition duration-300" />;
};
