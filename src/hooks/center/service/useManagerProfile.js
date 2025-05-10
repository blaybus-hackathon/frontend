import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getManagerProfile, updateManagerProfile } from '@/services/center/myPageService';

export const useManagerProfile = () => {
  const queryClient = useQueryClient(); // manage query cache

  // get manager profile from server
  const managerProfile = useQuery({
    queryKey: ['managerProfile'],
    queryFn: getManagerProfile,
    staleTime: 1000 * 60 * 60,
  });

  // update manager profile on server
  const saveMutation = useMutation({
    mutationFn: updateManagerProfile,
    // if success, invalidate cached data and refetch
    onSuccess: () => queryClient.invalidateQueries(['managerProfile']),
  });

  return {
    ...managerProfile,
    saveManagerProfile: saveMutation, // return mutate function and status
  };
};
