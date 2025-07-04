import { useQuery } from '@tanstack/react-query';
import {
  getMatchingWaitingList,
  getMatchingInProgressList,
  getMatchingCompletedList,
} from '@/services/center/matchingService';
import { transformData } from '@/utils/format';

export const useWaitingPatients = () =>
  useQuery({
    queryKey: ['patientMatch', 'waiting'],
    queryFn: getMatchingWaitingList,
    select: (data) => data.map(transformData),
    staleTime: 1000 * 60 * 60,
  });

export const useInProgressPatients = () =>
  useQuery({
    queryKey: ['patientMatch', 'inProgress'],
    queryFn: getMatchingInProgressList,
    select: (data) => data.map(transformData),
    staleTime: 1000 * 60 * 60,
  });

export const useCompletedPatients = () =>
  useQuery({
    queryKey: ['patientMatch', 'completed'],
    queryFn: getMatchingCompletedList,
    select: (data) => ({
      matched: data.matched.map(transformData),
      rejected: data.rejected.map(transformData),
    }),
    staleTime: 1000 * 60 * 60,
  });
