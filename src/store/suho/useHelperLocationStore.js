import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useHelperLocationStore = create(
    persist(
        (set, get) => ({
            selectedDistricts: {},   // { "서울": ["강남구", "서초구"], "경기": ["수원시"] }

            // 지역 설정
            setDistricts: (districts) =>
                set({ selectedDistricts: districts }),

            // 특정 도시의 구/군 추가
            addDistrict: (city, district) =>
                set((state) => ({
                    selectedDistricts: {
                        ...state.selectedDistricts,
                        [city]: [...(state.selectedDistricts[city] || []), district]
                    }
                })),

            // 특정 도시의 구/군 제거
            removeDistrict: (city, district) =>
                set((state) => ({
                    selectedDistricts: {
                        ...state.selectedDistricts,
                        [city]: state.selectedDistricts[city]?.filter(d => d !== district) || []
                    }
                })),

            getTotalSelectedCount: () => {
                const { selectedDistricts } = get();
                return Object.values(selectedDistricts)
                    .reduce((total, districts) => total + districts.length, 0);
            },


            // 초기화
            resetDistricts: () =>
                set({ selectedDistricts: {} })
        }),
        {
            name: 'helper-location-storage'
        }
    )
);

export default useHelperLocationStore;

