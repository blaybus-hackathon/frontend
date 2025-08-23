import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useEffect } from 'react';
import {
  getMatchingRequestList,
  getMatchingCompleteList,
  getElderLogDetail,
} from '@/services/helperService';
import { formatElderLogDetail } from '@/utils/formatters/formatElderLogDetail';
import { useCareMappingHook, initializeCareMapping } from '@/store/useCareConstantsStore';
import { useAddressMapping } from '@/store/useAddressStore';
import {
  matchingRequestListMock,
  matchingCompleteListMock,
  detailMockList,
  detailMock,
  mockDelay,
} from '@/mock/requested';

// use mock data for development
const USE_MOCK = import.meta.env.DEV;

const queryOptions = (key, queryFn, staleTime = 1000 * 60 * 3) => ({
  queryKey: ['helper', key],
  queryFn,
  staleTime,
  gcTime: 1000 * 60 * 10,
  retry: (failureCount, error) => {
    if (error?.response?.status >= 500) return failureCount < 1;
    if (error?.code === 'NETWORK_ERROR') return failureCount < 2;
    return false;
  },
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  refetchOnWindowFocus: false,
  refetchOnMount: false,
});

/**
 *  매칭 요청 목록 조회
 */
export const useRequestPatients = () => {
  return useQuery({
    ...queryOptions('request', async () => {
      try {
        if (USE_MOCK) {
          await mockDelay(500);
          return matchingRequestListMock;
        } else {
          const response = await getMatchingRequestList();
          return response?.list || [];
        }
      } catch (error) {
        console.error('failed to get matching request list:', error);
        // keep app running with empty array
        return [];
      }
    }),
  });
};

/**
 * 완료된 매칭 목록 조회
 */
export const useCompletedPatients = ({ enabled = true }) => {
  return useQuery({
    ...queryOptions(
      'completed',
      async () => {
        try {
          if (USE_MOCK) {
            await mockDelay(400);
            return matchingCompleteListMock;
          } else {
            const response = await getMatchingCompleteList();
            return response?.list || [];
          }
        } catch (error) {
          console.error('failed to get matching complete list:', error);
          return [];
        }
      },
      1000 * 60 * 10,
    ),
    enabled,
  });
};

/**
 * 어르신 상세 정보 조회
 * @param {number} patientLogSeq - 어르신 로그 시퀀스
 * @returns {object} 포맷팅된 어르신 상세 정보
 */
export const useElderDetail = (patientLogSeq) => {
  const {
    getAddressNameById,
    isReady: addressReady,
    ensureAddressesLoaded: loadAddresses,
  } = useAddressMapping();
  const { getCareNameByIds, isReady: careReady, isUsingFallback } = useCareMappingHook();

  // initialize care mapping (only once)
  useEffect(() => {
    initializeCareMapping();
  }, []);

  // memoize data transformation function
  const transform = useCallback(
    (data) => formatElderLogDetail(data, getAddressNameById, getCareNameByIds),
    [getAddressNameById, getCareNameByIds],
  );

  const query = useQuery({
    ...queryOptions(
      ['detail', patientLogSeq],
      async () => {
        try {
          let response;

          if (USE_MOCK) {
            await mockDelay(600);
            response = detailMockList[patientLogSeq] || detailMock;
          } else {
            response = await getElderLogDetail(patientLogSeq);
          }

          // load only needed addresses (both mock and real data)
          if (response && loadAddresses) {
            const addresses = [
              {
                afSeq: response.afSeq,
                asSeq: response.asSeq,
                atSeq: response.atSeq,
              },
            ].filter((addr) => addr.afSeq || addr.asSeq || addr.atSeq);

            if (addresses.length > 0) {
              await loadAddresses(addresses);
            }
          }

          return response;
        } catch (error) {
          console.error('failed to get elder detail:', error);
          throw error;
        }
      },
      1000 * 60 * 5,
    ),

    // query is executed even if mapping is not ready (use fallback)
    enabled: !!patientLogSeq,

    select: transform,
  });

  // return qresult with mapping status
  return useMemo(
    () => ({
      ...query,
      mappingReady: addressReady && careReady,
      usingFallback: isUsingFallback,
    }),
    [query, addressReady, careReady, isUsingFallback],
  );
};

/**
 * manually refetch patient query lists
 */
export const useRefetchQueries = () => {
  const queryClient = useQueryClient();

  return useMemo(
    () => ({
      refetchRequest: () => queryClient.refetchQueries(['helper', 'request']),
      refetchCompleted: () => queryClient.refetchQueries(['helper', 'completed']),
      refetchAll: () => queryClient.refetchQueries(['helper']),
      // batch refetch (performance optimization)
      refetchBatch: async () => {
        const tasks = [
          queryClient.refetchQueries(['helper', 'request']),
          queryClient.refetchQueries(['helper', 'completed']),
        ];
        return Promise.allSettled(tasks);
      },
    }),
    [queryClient],
  );
};
