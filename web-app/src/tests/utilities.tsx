import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { queryClientConfig } from "../api/client";

const createTestQueryClient = () => {
  return new QueryClient({
    ...queryClientConfig,
    defaultOptions: {
      queries: {
        ...queryClientConfig.defaultOptions?.queries,
        cacheTime: Infinity,
        retry: false,
      },
      mutations: {
        ...queryClientConfig.defaultOptions?.mutations,
        retry: false,
        useErrorBoundary: true,
      },
    },
  });
};

export const renderWithProviders = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>,
  );

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>,
      ),
  };
};
