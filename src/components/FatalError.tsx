import { Button } from "./Button";

export const FatalError = ({ err, reset }: { err: any; reset: () => void }) => {
  return (
    <>
      <h1>Something went horribly wrong!!</h1>
      <p>Sorry about that.</p>
      <p class="text-red-400">{err.toString()}</p>
      <Button onClick={reset}>Reset</Button>
    </>
  );
};
