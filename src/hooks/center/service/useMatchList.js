import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  getMatchingWaitingList,
  getMatchingInProgressList,
  getMatchingCompletedList,
  changeMatchingStatus,
} from '@/services/center';
import { MATCH_STATE } from '@/constants/matching';

const QUERY_KEY = {
  ROOT: ['patients'],
  WAITING: ['patients', 'waiting'],
  IN_PROGRESS: ['patients', 'in-progress'],
  COMPLETED: ['patients', 'completed'],
};

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
    ...createQueryOptions(QUERY_KEY.WAITING, getMatchingWaitingList),

    // prefetch in-progress tab if waiting data exists
    onSuccess: (data) => {
      if (Array.isArray(data) && data.length > 0) {
        queryClient.prefetchQuery(
          createQueryOptions(QUERY_KEY.IN_PROGRESS, getMatchingInProgressList),
        );
      }
    },
  });
};

/**
 * 매칭 진행중 리스트 조회
 */
export const useInProgressPatients = () =>
  useQuery(createQueryOptions(QUERY_KEY.IN_PROGRESS, getMatchingInProgressList, 1000 * 60 * 2));

/**
 * 매칭 완료 리스트 조회
 */
export const useCompletedPatients = () =>
  useQuery(createQueryOptions(QUERY_KEY.COMPLETED, getMatchingCompletedList, 1000 * 60 * 10));

/**
 * Custom mutation hook for updating match status
 * - handles both local UI state and query cache update (optimistic update)
 */
export const useMatchStatusMutation = (options = {}) => {
  const queryClient = useQueryClient();
  const { optimisticUpdate = true, onLocalUpdate } = options;

  return useMutation({
    mutationFn: ({ patientLogSeq, helperSeq, matchState }) =>
      changeMatchingStatus(patientLogSeq, helperSeq, matchState),

    // Optimistically update UI before server response
    onMutate: async (vars) => {
      const { patientLogSeq, helperSeq, matchState } = vars;

      // cancel all ongoing queries to prevent conflict
      await queryClient.cancelQueries({ queryKey: QUERY_KEY.ROOT });

      // local uI update
      if (onLocalUpdate) onLocalUpdate(vars);

      // apply optimistic update only if enabled and MATCH_REQUEST
      if (optimisticUpdate && matchState === MATCH_STATE.MATCH_REQUEST) {
        const prevWaiting = queryClient.getQueryData(QUERY_KEY.WAITING);

        queryClient.setQueryData(QUERY_KEY.WAITING, (oldData) => {
          if (!Array.isArray(oldData)) return oldData;

          return oldData.map((patient) => {
            if (patient.patientLogSeq === patientLogSeq) return patient;
            const before = Array.isArray(patient.requestedHelpers) ? patient.requestedHelpers : [];
            if (before.includes(helperSeq)) return patient;

            return {
              ...patient,
              requestedHelpers: [...before, helperSeq],
            };
          });
        });

        // return context for roll back if error occurs
        return { prevWaiting };
      }

      return {};
    },

    // Rollback if error occurs
    onError: (_err, _vars, context) => {
      // rollback to previous state if optimistic update failed
      if (context?.prevWaiting) queryClient.setQueryData(QUERY_KEY.WAITING, context.prevWaiting);
    },

    // if mutation is settled, invalidate relevant queries
    onSettled: (_data, _error, { matchState }) => {
      switch (matchState) {
        case MATCH_STATE.MATCH_REQUEST: {
          // refetch when user moves to other tab
          queryClient.invalidateQueries({
            queryKey: QUERY_KEY.WAITING,
            refetchType: 'active',
          });
          queryClient.invalidateQueries({
            queryKey: QUERY_KEY.IN_PROGRESS,
            refetchType: 'inactive',
          });
          break;
        }

        case MATCH_STATE.MATCH_CANCEL:
          // 'in-progress' refreshed in background
          queryClient.invalidateQueries({
            queryKey: QUERY_KEY.IN_PROGRESS,
            refetchType: 'background',
          });
          break;

        case MATCH_STATE.MATCH_FIN:
          // invalidate in-progress and complted tabs immediately
          queryClient.invalidateQueries({
            queryKey: QUERY_KEY.IN_PROGRESS,
            refetchType: 'active',
          });
          queryClient.invalidateQueries({
            queryKey: QUERY_KEY.COMPLETED,
            refetchType: 'active',
          });
          break;

        default:
          // refresh in in-progress only
          queryClient.invalidateQueries({
            queryKey: QUERY_KEY.IN_PROGRESS,
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
    refetchWaiting: () => queryClient.refetchQueries({ queryKey: QUERY_KEY.WAITING }),
    refetchInProgress: () => queryClient.refetchQueries({ queryKey: QUERY_KEY.IN_PROGRESS }),
    refetchCompleted: () => queryClient.refetchQueries({ queryKey: QUERY_KEY.COMPLETED }),
    refetchAll: () => queryClient.refetchQueries({ queryKey: QUERY_KEY.ROOT }),
  };
};
