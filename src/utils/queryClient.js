import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const clearAllQueries = () => {
  queryClient.clear();
};
