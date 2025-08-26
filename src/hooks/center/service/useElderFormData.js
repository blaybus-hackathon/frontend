import { useQuery } from '@tanstack/react-query';
import { getFormConstants } from '@/services/center';

export function useElderFormData() {
  return useQuery({
    queryKey: ['elderFormData'],
    queryFn: getFormConstants,
    staleTime: 1000 * 60 * 60, // 1시간
    select: (data) => ({
      workTypeList: data.workTypeList ?? [],
      welfareList: data.welfareList ?? [],
      careLevelList: data.careLevelList ?? [],
      dementiaSymptomList: data.dementiaSymptomList ?? [],
      inmateStateList: data.inmateStateList ?? [],
      serviceMealList: data.serviceMealList ?? [],
      serviceToiletList: data.serviceToiletList ?? [],
      serviceMobilityList: data.serviceMobilityList ?? [],
      serviceDailyList: data.serviceDailyList ?? [],
      genderList: data.gender ?? [],
    }),
  });
}
