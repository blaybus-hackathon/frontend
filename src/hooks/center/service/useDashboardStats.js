import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/services/center/dashboardService';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
    staleTime: 3 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    retry: 2,
    select: (data) => {
      // use != to detect both undefined and null
      const toSafeNumber = (val) => (val != null ? Number(val) : 0);

      return {
        newMatches: toSafeNumber(data.newCnt),
        totalMatches: toSafeNumber(data.totalCnt),

        matching: {
          acceptanceRate:
            data.permitRate != null ? Number((data.permitRate * 100).toFixed(1)) : 0.0,
          rejectionRate: data.rejectRate != null ? Number((data.rejectRate * 100).toFixed(1)) : 0.0,
        },

        statusData: [
          {
            name: '대기',
            value: toSafeNumber(data.stateWaitCnt),
            color: '#c9c1de',
          },
          {
            name: '진행중',
            value: toSafeNumber(data.stateInProgressCnt),
            color: '#8976c0',
          },
          {
            name: '완료',
            value: toSafeNumber(data.stateFinCnt),
            color: '#522e9a',
          },
        ],
      };
    },
  });
};
