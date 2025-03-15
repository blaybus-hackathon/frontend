import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 상수 정의
export const CARE_TYPES = {
    workTypes: [
        { id: 'visit', label: '방문요양' },
        { id: 'resident', label: '입주요양' },
        { id: 'bath', label: '방문목욕' }
    ],
    careGrade: [
        { id: 'grade1', label: '1등급' },
        { id: 'grade2', label: '2등급' },
        { id: 'grade3', label: '3등급' }
    ],
    gender: [
        { id: 'male', label: '남자' },
        { id: 'female', label: '여자' }
    ],
    livingArrangement: [
        { id: 'alone', label: '독거' },
        { id: 'withSpouse', label: '배우자와 동거' }
    ],
    mealCare: [
        { id: 'self', label: '스스로 가능' },
        { id: 'cooking', label: '요리 필요' }
    ],
    mobilitySupport: [
        { id: 'self', label: '스스로 가능' },
        { id: 'wheelchair', label: '휠체어 이동' }
    ],
    dailyLife: [
        { id: 'housework', label: '청소와 빨래보조' },
        { id: 'bath', label: '목욕보조' }
    ]
};

const useCareTypeStore = create(
    persist(
        (set) => ({
            // 선택된 값들 저장
            selectedTypes: {
                workTypes: [],        // 다중 선택 가능
                careGrade: '',        // 단일 선택
                gender: '',           // 단일 선택
                livingArrangement: '', // 단일 선택
                mealCare: '',         // 단일 선택
                mobilitySupport: '',   // 단일 선택
                dailyLife: ''         // 단일 선택
            },

            // 다중 선택 가능한 항목 토글
            toggleWorkType: (type) =>
                set((state) => ({
                    selectedTypes: {
                        ...state.selectedTypes,
                        workTypes: state.selectedTypes.workTypes.includes(type)
                            ? state.selectedTypes.workTypes.filter(t => t !== type)
                            : [...state.selectedTypes.workTypes, type]
                    }
                })),

            // 단일 선택 항목 설정
            setSelection: (category, value) =>
                set((state) => ({
                    selectedTypes: {
                        ...state.selectedTypes,
                        [category]: value
                    }
                })),

            // 전체 초기화
            resetSelections: () =>
                set({
                    selectedTypes: {
                        workTypes: [],
                        careGrade: '',
                        gender: '',
                        livingArrangement: '',
                        mealCare: '',
                        mobilitySupport: '',
                        dailyLife: ''
                    }
                })
        }),
        {
            name: 'care-type-storage'
        }
    )
);

export default useCareTypeStore;