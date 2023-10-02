import { QueryClient, QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig: QueryClientConfig = {};

export const queryClient = new QueryClient(queryClientConfig);
