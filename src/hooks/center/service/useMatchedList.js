import { useQuery } from '@tanstack/react-query';
import { getElderMatchedList } from '@/services/center/elderMatchedService';

export const useMatchedList = () => {
  return useQuery({
    queryKey: ['matchedList'],
    queryFn: getElderMatchedList,
    staleTime: 1000 * 60 * 60,
    select: (response) => response.data.matchedPatientInfoList,
  });
};
