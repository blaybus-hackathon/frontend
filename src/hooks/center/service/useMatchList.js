import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  getMatchingWaitingList,
  getMatchingInProgressList,
  getMatchingCompletedList,
  changeMatchingStatus,
} from '@/services/center/matchingService';
import { MATCH_STATE } from '@/constants/matching';

/**
 *  create common query option
 */
const createQueryOptions = (key, queryFn, staleTime = 1000 * 60 * 3) => ({
  queryKey: ['patients', key],
  queryFn,
  staleTime,
  retry: 2,
  refetchOnWindowFocus: false,
});

/**
 *  매칭 대기 리스트 조회
 */
export const useWaitingPatients = () => {
  const queryClient = useQueryClient();

  return useQuery({
    ...createQueryOptions('waiting', getMatchingWaitingList),

    // prefetch in-progress tab if waiting data exists
    onSuccess: (data) => {
      if (data?.length > 0) {
        setTimeout(() => {
          queryClient.prefetchQuery({
            ...createQueryOptions('in-progress', getMatchingInProgressList),
          });
        }, 100);
      }
    },
  });
};

/**
 * 매칭 진행중 리스트 조회
 */
export const useInProgressPatients = () =>
  useQuery(createQueryOptions('in-progress', getMatchingInProgressList, 1000 * 60 * 2));

/**
 * 매칭 완료 리스트 조회
 */
export const useCompletedPatients = () =>
  useQuery(createQueryOptions('completed', getMatchingCompletedList, 1000 * 60 * 10));

/**
 * Custom mutation hook for updating match status
 * - handles both local UI state and query cache update (optimistic update)
 */
export const useMatchStatusMutation = (options = {}) => {
  const queryClient = useQueryClient();
  const { optimisticUpdate = false, onLocalUpdate } = options;

  return useMutation({
    mutationFn: ({ patientLogSeq, helperSeq, matchState }) =>
      changeMatchingStatus(patientLogSeq, helperSeq, matchState),

    // Optimistically update UI before server response
    onMutate: async ({ patientLogSeq, helperSeq, matchState }) => {
      // cancel all ongoing queries to prevent conflict
      await queryClient.cancelQueries({ queryKey: ['patients'] });

      // local uI update
      if (onLocalUpdate) {
        onLocalUpdate({ patientLogSeq, helperSeq, matchState });
      }

      // apply optimistic update only if enabled and MATCH_REQUEST
      if (optimisticUpdate && matchState === MATCH_STATE.MATCH_REQUEST) {
        const previousWaiting = queryClient.getQueryData(['patients', 'waiting']);

        queryClient.setQueryData(['patients', 'waiting'], (oldData) => {
          if (!oldData) return oldData;

          return oldData.map((patient) => {
            if (patient.patientLogSeq === patientLogSeq) {
              return {
                ...patient,
                requestedHelpers: [...(patient.requestedHelpers || []), helperSeq],
              };
            }
            return patient;
          });
        });

        // return context for roll back if error occurs
        return { previousWaiting };
      }
    },

    // Rollback if error occurs
    onError: (err, _variables, context) => {
      console.error('매칭 상태 변경 실패: ', err);

      // rollback to previous state if optimistic update failed
      if (context?.previousWaiting) {
        queryClient.setQueryData(['patients', 'waiting'], context.previousWaiting);
      }

      throw err;
    },

    // if mutation success, invalidate relevant queries
    onSuccess: (data, { matchState }) => {
      switch (matchState) {
        case MATCH_STATE.MATCH_REQUEST:
          // refetch when user moves to other tab
          queryClient.invalidateQueries({
            queryKey: ['patients', 'waiting'],
            refetchType: 'none',
          });

          // 'in-progress' refreshed in background
          queryClient.invalidateQueries({
            queryKey: ['patients', 'in-progress'],
            refetchType: 'background',
          });
          break;

        case MATCH_STATE.MATCH_FIN:
          // invalidate in-progress and complted tabs immediately
          queryClient.invalidateQueries({
            queryKey: ['patients', 'in-progress'],
            refetchType: 'active',
          });
          queryClient.invalidateQueries({
            queryKey: ['patients', 'completed'],
            refetchType: 'active',
          });
          break;

        default:
          // refresh in in-progress only
          queryClient.invalidateQueries({
            queryKey: ['patients', 'in-progress'],
            refetchType: 'active',
          });
      }
    },
  });
};

/**
 * matually refetch patient query lists
 */
export const useRefetchQueries = () => {
  const queryClient = useQueryClient();

  return {
    refetchWaiting: () => queryClient.refetchQueries(['patients', 'waiting']),
    refetchInProgress: () => queryClient.refetchQueries(['patients', 'in-progress']),
    refetchCompleted: () => queryClient.refetchQueries(['patients', 'completed']),
    refetchAll: () => queryClient.refetchQueries(['patients']),
  };
};
