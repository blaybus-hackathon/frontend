import { useQuery } from '@tanstack/react-query';
import { getCenterList } from '@/services/signUpService';

export const useCenterList = ({ pageNo = 0, pageSize = 10, searchName }) => {
  return useQuery({
    queryKey: ['centerList', pageNo, pageSize, searchName],
    queryFn: () => getCenterList({ pageNo, pageSize, searchName }),
    staleTime: 1000 * 60 * 3, // cache 3 minutes
    select: (response) => response.list,
  });
};
