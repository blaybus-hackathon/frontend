import { useQuery } from '@tanstack/react-query';
import { getElderForm } from '@/services/center/elderFormService';

export function useElderFormData() {
  return useQuery({
    queryKey: ['elderFormData'],
    queryFn: getElderForm,
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
