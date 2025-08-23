import { useQueryClient, useMutation } from '@tanstack/react-query';
import { changeMatchingStatus } from '@/services/helperService';
import { MATCH_STATE } from '@/constants/matching';

/**
 * common onMutate handler
 */
const createOnMutateHandler = (queryClient, matchState, options) => {
  return async ({ patientLogSeq, helperSeq }) => {
    await queryClient.cancelQueries({ queryKey: ['helper'] });

    if (options.onLocalUpdate) {
      options.onLocalUpdate({ patientLogSeq, helperSeq, matchState });
    }

    // delete from request list when PERMIT_TUNE or REJECT (optimistic)
    if (
      options.optimisticUpdate &&
      (matchState === MATCH_STATE.PERMIT_TUNE || matchState === MATCH_STATE.REJECT)
    ) {
      const prevRequestData = queryClient.getQueryData(['helper', 'request']);
      const prevCompletedData = queryClient.getQueryData(['helper', 'completed']);

      // delete from request list
      queryClient.setQueryData(['helper', 'request'], (oldData) => {
        if (!oldData) return oldData;
        return oldData.filter((patient) => patient.patientLogSeq !== patientLogSeq);
      });

      // add to completed list only for PERMIT_TUNE
      if (matchState === MATCH_STATE.PERMIT_TUNE) {
        const targetPatient = prevRequestData?.find(
          (patient) => patient.patientLogSeq === patientLogSeq,
        );
        if (targetPatient) {
          queryClient.setQueryData(['helper', 'completed'], (oldData) => {
            if (!oldData) return [{ ...targetPatient, status: 'PERMIT_TUNE' }];
            return [{ ...targetPatient, status: 'PERMIT_TUNE' }, ...oldData];
          });
        }
      }

      return { prevRequestData, prevCompletedData };
    }
  };
};

/**
 * common onError handler
 */
const createOnErrorHandler = (queryClient, matchState) => {
  return (err, _variables, context) => {
    console.error(`매칭 상태 변경 실패 (${matchState}):`, err);

    // rollback request list
    if (context?.prevRequestData) {
      queryClient.setQueryData(['helper', 'request'], context.prevRequestData);
    }
    if (context?.prevCompletedData) {
      queryClient.setQueryData(['helper', 'completed'], context.prevCompletedData);
    }
  };
};

/**
 * common onSuccess handler
 */
const createOnSuccessHandler = (queryClient, matchState) => {
  return () => {
    // invalidate related queries based on match state
    const refreshTasks = [];

    switch (matchState) {
      case MATCH_STATE.PERMIT_TUNE:
        refreshTasks.push(
          queryClient.invalidateQueries({
            queryKey: ['helper', 'request'],
            refetchType: 'active',
          }),
          queryClient.invalidateQueries({
            queryKey: ['helper', 'completed'],
            refetchType: 'active',
          }),
        );
        break;
      case MATCH_STATE.REJECT:
        refreshTasks.push(
          queryClient.invalidateQueries({
            queryKey: ['helper', 'request'],
            refetchType: 'active',
          }),
        );
        break;
      default:
        refreshTasks.push(
          queryClient.invalidateQueries({
            queryKey: ['helper', 'request'],
            refetchType: 'active',
          }),
        );
    }

    // invalidate in parallel
    Promise.all(refreshTasks).catch(console.error);
  };
};

/**
 * permit tune mutation hook
 */
export const usePermitTuneMutation = (options = {}) => {
  const queryClient = useQueryClient();
  const matchState = MATCH_STATE.PERMIT_TUNE;

  return useMutation({
    mutationFn: ({ patientLogSeq, helperSeq }) =>
      changeMatchingStatus(patientLogSeq, helperSeq, matchState),
    onMutate: createOnMutateHandler(queryClient, matchState, options),
    onError: createOnErrorHandler(queryClient, matchState),
    onSuccess: createOnSuccessHandler(queryClient, matchState),
  });
};

/**
 * 거절 요청 전용 뮤테이션 훅
 */
export const useRejectMutation = (options = {}) => {
  const queryClient = useQueryClient();
  const matchState = MATCH_STATE.REJECT;

  return useMutation({
    mutationFn: ({ patientLogSeq, helperSeq }) =>
      changeMatchingStatus(patientLogSeq, helperSeq, matchState),
    onMutate: createOnMutateHandler(queryClient, matchState, options),
    onError: createOnErrorHandler(queryClient, matchState),
    onSuccess: createOnSuccessHandler(queryClient, matchState),
  });
};

/**
 * Custom mutation hook for updating match status
 * - handles both local UI state and query cache update (optimistic update)
 * @deprecated Use usePermitTuneMutation or useRejectMutation for specific actions
 */
export const useMatchStatusMutation = (options = {}) => {
  const queryClient = useQueryClient();
  const { optimisticUpdate = false, onLocalUpdate } = options;

  return useMutation({
    mutationFn: ({ patientLogSeq, helperSeq, matchState }) =>
      changeMatchingStatus(patientLogSeq, helperSeq, matchState),

    // update UI before server response (optimistic update)
    onMutate: async ({ patientLogSeq, helperSeq, matchState }) => {
      await queryClient.cancelQueries({ queryKey: ['helper'] });

      if (onLocalUpdate) {
        onLocalUpdate({ patientLogSeq, helperSeq, matchState });
      }

      if (optimisticUpdate && matchState === MATCH_STATE.MATCH_REQUEST) {
        const prevData = queryClient.getQueryData(['helper', 'request']);

        queryClient.setQueryData(['helper', 'request'], (oldData) => {
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

        return { prevData };
      }

      // delete from request list when PERMIT_TUNE or REJECT success (optimistic)
      if (
        optimisticUpdate &&
        (matchState === MATCH_STATE.PERMIT_TUNE || matchState === MATCH_STATE.REJECT)
      ) {
        const prevRequestData = queryClient.getQueryData(['helper', 'request']);
        const prevCompletedData = queryClient.getQueryData(['helper', 'completed']);

        // delete from request list
        queryClient.setQueryData(['helper', 'request'], (oldData) => {
          if (!oldData) return oldData;
          return oldData.filter((patient) => patient.patientLogSeq !== patientLogSeq);
        });

        // add to completed list
        if (matchState === MATCH_STATE.PERMIT_TUNE) {
          const targetPatient = prevRequestData?.find(
            (patient) => patient.patientLogSeq === patientLogSeq,
          );
          if (targetPatient) {
            queryClient.setQueryData(['helper', 'completed'], (oldData) => {
              if (!oldData) return [{ ...targetPatient, status: 'PERMIT_TUNE' }];
              return [{ ...targetPatient, status: 'PERMIT_TUNE' }, ...oldData];
            });
          }
        }

        return { prevRequestData, prevCompletedData };
      }
    },

    onError: (err, _variables, context) => {
      console.error('매칭 상태 변경 실패: ', err);
      if (context?.prevData) {
        queryClient.setQueryData(['helper', 'request'], context.prevData);
      }
      // rollback request list
      if (context?.prevRequestData) {
        queryClient.setQueryData(['helper', 'request'], context.prevRequestData);
      }
      if (context?.prevCompletedData) {
        queryClient.setQueryData(['helper', 'completed'], context.prevCompletedData);
      }
    },

    onSuccess: (data, { matchState }) => {
      // invalidate related queries (batch)
      const refreshTasks = [];

      switch (matchState) {
        case MATCH_STATE.MATCH_REQUEST:
          refreshTasks.push(
            queryClient.invalidateQueries({
              queryKey: ['helper', 'request'],
              refetchType: 'none',
            }),
          );
          break;
        case MATCH_STATE.PERMIT_TUNE:
          refreshTasks.push(
            queryClient.invalidateQueries({
              queryKey: ['helper', 'request'],
              refetchType: 'active',
            }),
            queryClient.invalidateQueries({
              queryKey: ['helper', 'completed'],
              refetchType: 'active',
            }),
          );
          break;
        case MATCH_STATE.REJECT:
          refreshTasks.push(
            queryClient.invalidateQueries({
              queryKey: ['helper', 'request'],
              refetchType: 'active',
            }),
          );
          break;
        case MATCH_STATE.MATCH_FIN:
          refreshTasks.push(
            queryClient.invalidateQueries({
              queryKey: ['helper', 'request'],
              refetchType: 'active',
            }),
            queryClient.invalidateQueries({
              queryKey: ['helper', 'completed'],
              refetchType: 'active',
            }),
          );
          break;
        default:
          refreshTasks.push(
            queryClient.invalidateQueries({
              queryKey: ['helper', 'request'],
              refetchType: 'active',
            }),
          );
      }

      // invalidate in parallel
      Promise.all(refreshTasks).catch(console.error);
    },
  });
};
