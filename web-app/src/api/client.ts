import { QueryClient, QueryClientConfig } from "react-query";

export const queryClientConfig: QueryClientConfig = {};

export const queryClient = new QueryClient(queryClientConfig);
