import { QueryClient } from 'react-query';

export const defaultOption = (client: QueryClient) => {
  client.setDefaultOptions({
    queries: {
      staleTime: 3000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 10 * 1000,
      refetchIntervalInBackground: true,
      retryDelay: 700,
      retry: 3,
      onError: (error) => {
        console.log(`[React-Query]`, 'onError', error);
      },
      onSettled: (res, error) => {
        console.log(`[React-Query]`, 'onSettled', res, error);
      },
    },
    mutations: {
      retryDelay: 500,
      retry: 3,
      onError: (error, variables, context) => {
        console.log(`[React-Query]`, 'onError', error, variables, context);
      },
      onSettled: (res, error, variables, context) => {
        console.log(`[React-Query]`, 'onSettled', res, error, variables, context);
      },
    },
  });
};
