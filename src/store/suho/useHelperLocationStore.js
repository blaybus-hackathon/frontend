import { create } from 'zustand';

const useHelperLocationStore = create((set, get) => ({
    selectedDistricts: {},   
    // 예: { "서울": { "강남구": ["삼성", "대치", "역삼"] }, "경기": { "수원시": ["팔달구"] } }

    // 지역 설정
    setDistricts: (districts) => set({ selectedDistricts: districts }),

    // 특정 도시의 구/군 추가
    addDistrict: (city, district, subDistrict) =>
        set((state) => ({
            selectedDistricts: {
                ...state.selectedDistricts,
                [city]: {
                    ...state.selectedDistricts[city],
                    [district]: [
                        ...(state.selectedDistricts[city]?.[district] || []),
                        subDistrict
                    ],
                },
            },
        })),

    // 특정 도시의 구/군 제거
    removeDistrict: (city, district, subDistrict) =>
        set((state) => {
            const updatedDistricts = {
                ...state.selectedDistricts,
                [city]: {
                    ...state.selectedDistricts[city],
                    [district]: state.selectedDistricts[city]?.[district]?.filter(d => d !== subDistrict) || []
                },
            };

            // 만약 특정 구/군이 빈 배열이 되면 제거
            if (updatedDistricts[city][district].length === 0) {
                delete updatedDistricts[city][district];
            }

            // 만약 특정 도시가 완전히 빈 객체가 되면 제거
            if (Object.keys(updatedDistricts[city]).length === 0) {
                delete updatedDistricts[city];
            }

            return { selectedDistricts: updatedDistricts };
        }),

    getTotalSelectedCount: () => {
        const { selectedDistricts } = get();
        return Object.values(selectedDistricts).reduce(
            (total, districts) =>
                total +
                Object.values(districts).reduce((subTotal, subDistricts) => subTotal + subDistricts.length, 0),
            0
        );
    },

    // 초기화
    resetDistricts: () => set({ selectedDistricts: {} }),
}));

export default useHelperLocationStore;