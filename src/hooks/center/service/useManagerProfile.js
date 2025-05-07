import { useQuery } from '@tanstack/react-query';
import { getManagerProfile } from '@/services/center/myPageService';

export const useManagerProfile = () => {
  return useQuery({
    queryKey: ['managerProfile'],
    queryFn: getManagerProfile,
    staleTime: 1000 * 60 * 60,
  });
};
