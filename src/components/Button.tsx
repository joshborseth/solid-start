import type { JSX } from "solid-js";

export const Button = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} class="bg-blue-900 disabled:bg-blue-900/25 rounded-lg px-4 py-2 hover:bg-blue-900/50 transition duration-150" />;
};
