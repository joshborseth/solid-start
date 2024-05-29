// @refresh reload
import { MetaProvider, Title } from "@solidjs/meta";
import { A, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import "./index.css";
import { FatalError } from "./components/FatalError";
export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Josh's Solid App</Title>
          <Suspense>
            <main class="h-screen w-screen overflow-hidden flex flex-col gap-4 justify-center items-center bg-gray-950 text-white">
              <ErrorBoundary fallback={(err, reset) => <FatalError err={err} reset={reset} />}>
                {props.children}
                <div class="flex gap-2 absolute bottom-10">
                  <A href="/">Home</A>
                  <A href="/app">App</A>
                </div>
              </ErrorBoundary>
            </main>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
