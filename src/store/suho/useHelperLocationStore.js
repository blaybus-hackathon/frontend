import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useHelperLocationStore = create(
  devtools((set, get) => ({
    selectedDistricts: {},

    // 지역 설정
    setDistricts: (districts) => set({ selectedDistricts: districts }),

    // 특정 도시의 구/군 추가
    addDistrict: (city, district, subDistrict) =>
      set((state) => {
        if (
          city in state.selectedDistricts &&
          district in state.selectedDistricts[city] &&
          subDistrict in state.selectedDistricts[city][district]
        ) {
          return state;
        }
        return {
          selectedDistricts: {
            ...state.selectedDistricts,
            [city]: {
              ...state.selectedDistricts[city],
              [district]: [...(state.selectedDistricts[city]?.[district] || []), subDistrict],
            },
          },
        };
      }),

    // 특정 도시의 구/군 제거
    removeDistrict: (city, district, subDistrict) =>
      set((state) => {
        const updatedDistricts = {
          ...state.selectedDistricts,
          [city]: {
            ...state.selectedDistricts[city],
            [district]:
              state.selectedDistricts[city]?.[district]?.filter((d) => d !== subDistrict) || [],
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
          Object.values(districts).reduce(
            (subTotal, subDistricts) => subTotal + subDistricts.length,
            0,
          ),
        0,
      );
    },

    // 초기화
    resetDistricts: () => set({ selectedDistricts: {} }),

    // ✅ 선택된 지역 정보를 텍스트로 변환하는 selector 함수 (스타일 수정됨)
    //   getFormattedLocation: () => {
    //     const selectedDistricts = get().selectedDistricts;
    //     if (Object.keys(selectedDistricts).length === 0) {
    //       return [];
    //     }

    //     return Object.entries(selectedDistricts).flatMap(([city, districts]) => {
    //       // flatMap 사용
    //       return Object.entries(districts).map(([district, subDistricts]) => {
    //         const subDistrictNames = subDistricts.join(", ");
    //         return `${city} > ${district} (${subDistrictNames})`;
    //       });
    //     });
    //   },
  })),
);

export default useHelperLocationStore;
