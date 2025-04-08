"use client";
import {
  QueryClientProvider,
  QueryClient as TanstackQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as Duration from "effect/Duration";
import * as Layer from "effect/Layer";
import * as Logger from "effect/Logger";
import * as ManagedRuntime from "effect/ManagedRuntime";
import React from "react";
import { ApiClient } from "../layers/api-client";
import { NetworkMonitor } from "../layers/common/network-monitor";
import { QueryClient } from "../layers/common/query-client";
import { type LiveManagedRuntime } from "../layers/live-layer";
import { RuntimeProvider } from "../layers/runtime/runtime-provider";
import { ColorSchemeProvider } from "./ColorSchemeProvider";

type InnerProvidersProps = {
  children: React.ReactNode;
};

const InnerProviders: React.FC<InnerProvidersProps> = ({ children }) => {
  const queryClient = React.useMemo(
    () =>
      new TanstackQueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            retryDelay: 0,
            staleTime: Duration.toMillis("5 minutes"),
          },
          mutations: {
            retry: false,
            retryDelay: 0,
          },
        },
      }),
    [],
  );

  const runtime: LiveManagedRuntime = React.useMemo(
    () =>
      ManagedRuntime.make(
        Layer.mergeAll(
          NetworkMonitor.Default,
          ApiClient.Default,
          QueryClient.make(queryClient),
        ).pipe(Layer.provide(Logger.pretty)) as Layer.Layer<
          ApiClient | NetworkMonitor | QueryClient,
          never,
          never
        >,
      ),
    [queryClient],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <RuntimeProvider runtime={runtime}>{children}</RuntimeProvider>
    </QueryClientProvider>
  );
};

type RootProvidersProps = {
  colorScheme: "light" | "dark";
  children: React.ReactNode;
};

export const RootProviders: React.FC<RootProvidersProps> = ({
  children,
  colorScheme,
}) => {
  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      {/*<Toaster />*/}
      <InnerProviders>{children}</InnerProviders>
    </ColorSchemeProvider>
  );
};
