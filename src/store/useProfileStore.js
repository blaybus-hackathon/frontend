import { create } from "zustand";

// Zustand Store 생성
const useProfileStore = create((set) => ({
  profile: {
    introduction: "",
    careExperience: "",
    location: {},
    careTypes: {
      workTypes: [], //돌봄 유형
      careGrade: "", //요양등급
      gender: "",
      livingArrangement: "",
      mealCare: "",
      mobilitySupport: "",
      dailyLife: [],
    },
    payType: "",
    payAmount: "",
    selectedOptions: {}, // 자격증
    inputs: {},
  },
  profileEdit: {
    // profileEdit 초기 상태를 명시적으로 정의
    introduction: "",
    careExperience: "",
    location: {},
    careTypes: {
      workTypes: [], //돌봄 유형
      careGrade: "", //요양등급
      gender: "",
      livingArrangement: "",
      mealCare: "",
      mobilitySupport: "",
      dailyLife: [],
    },
    payType: "",
    payAmount: "",
    selectedOptions: {}, // 자격증
    inputs: {},
  },
  // 상태 업데이트 함수
  updateProfile: (newProfile) => set({ profile: { ...newProfile } }),

  resetProfile: () =>
    set({
      profile: {
        introduction: "",
        careExperience: "",
        location: {},
        careTypes: {
          workTypes: [], //돌봄 유형
          careGrade: "", //요양등급
          gender: "",
          livingArrangement: "",
          mealCare: "",
          mobilitySupport: "",
          dailyLife: [],
        },
        payType: "",
        payAmount: "",
        selectedOptions: {}, // 자격증
        inputs: {},
      },
      profileEdit: {
        // reset 시 profileEdit도 초기화
        introduction: "",
        careExperience: "",
        location: {},
        careTypes: {
          workTypes: [], //돌봄 유형
          careGrade: "", //요양등급
          gender: "",
          livingArrangement: "",
          mealCare: "",
          mobilitySupport: "",
          dailyLife: [],
        },
        payType: "",
        payAmount: "",
        selectedOptions: {}, // 자격증
        inputs: {},
      },
    }),


    

  updateCareTypeField: (key, value) =>
    set((state) => {
      console.log("updateCareTypeField state:", state); // 추가
      return {
        profileEdit: {
          ...state.profileEdit,
          careTypes: {
            ...state.profileEdit.careTypes,
            [key]: value,
          },
        },
      };
    }),

    updateProfileField: (field, value) =>
      set((state) => {
        console.log("updateProfileField state:", value); // 추가
        return {
        profileEdit: {
          ...state.profileEdit, // 기존 상태를 복사
          [field]: value, // 특정 필드 업데이트
        },
      };
    }),

  // careTypes의 workTypes 업데이트 액션 추가
  updateCareTypeField: (fieldName, value) =>
    set((state) => ({
      profileEdit: {
        ...state.profileEdit,
        careTypes: {
          ...state.profileEdit.careTypes,
          [fieldName]: value,
        },
      },
    })),

  // profileEdit 초기화 액션 추가
  initializeProfileEdit: (initialProfile) =>
    set({ profileEdit: { ...initialProfile } }),
}));

export default useProfileStore;
