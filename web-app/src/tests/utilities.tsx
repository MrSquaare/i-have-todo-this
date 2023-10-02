import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { FC, PropsWithChildren } from "react";

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
        cacheTime: Infinity,
        retry: false,
      },
    },
  });
};

// eslint-disable-next-line react-refresh/only-export-components
const Providers: FC<PropsWithChildren> = ({ children }) => {
  const testQueryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui, { wrapper: Providers });
};
