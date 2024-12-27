import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 50000,
      retryDelay: 500,
      retry: false,
    },
  },
});

export default queryClient;
