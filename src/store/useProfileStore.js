import { create } from "zustand";
import useHelperLocationStore from "@/store/suho/useHelperLocationStore";
import useScheduleStore from "@/store/suho/useScheduleStore"; // 스케줄 스토어 임포트
import usePayStore from "@/store/suho/usePayStore"; // 스케줄 스토어 임포트
// Zustand Store 생성
const useProfileStore = create((set) => ({
  profile: {
    introduction: "",
    careExperience: "",
    schedule: {},
    consult: false,
    location: {}, // 초기값으로 빈 객체 설정
    careTypes: {
      workTypes: [], //돌봄 유형
      careGrade: "", //요양등급
      gender: "",
      livingArrangement: "",
      mealCare: "",
      mobilitySupport: "",
      dailyLife: [],
    },
    pay: {
      type: "",
      amount: 0,
    },
    selectedOptions: {}, // 자격증
    inputs: {},
    name: "",
    address: "",
    profileImage: "",
  },
  profileEdit: {
    // profileEdit 초기 상태를 명시적으로 정의
    introduction: "",
    careExperience: "",
    schedule: {},
    consult: false,
    location: {}, // 초기값으로 빈 객체 설정
    careTypes: {
      workTypes: [], //돌봄 유형
      careGrade: "", //요양등급
      gender: "",
      livingArrangement: "",
      mealCare: "",
      mobilitySupport: "",
      dailyLife: [],
    },
    pay: {
      type: "",
      amount: 0,
    },
    selectedOptions: {}, // 자격증
    inputs: {},
    name: "",
    address: "",
    profileImage: "",
  },
  // 상태 업데이트 함수
  updateProfile: (newProfile) => set({ profile: { ...newProfile } }),

  //TODO : subscribe로 변경감지
  resetProfile: () =>
    set({
      profile: {
        introduction: "",
        careExperience: "",
        schedule: {},
        consult: false,
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
        pay: {
          type: "",
          amount: 0,
        },
        selectedOptions: {}, // 자격증
        inputs: {},
        name: "",
        address: "",
        profileImage: "",
      },
      profileEdit: {
        // reset 시 profileEdit도 초기화
        introduction: "",
        careExperience: "",
        schedule: {},
        consult: false,
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
        pay: {
          type: "",
          amount: 0,
        },
        selectedOptions: {}, // 자격증
        inputs: {},
        name: "",
        address: "",
        profileImage: "",
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
      console.log(value);
      const updatedProfileEdit = { ...state.profileEdit, [field]: value };
      if (field === "profileImage") {
        sessionStorage.setItem("profileImageUrl", value);
      }
      return { profileEdit: updatedProfileEdit };
    }),

  clearProfileImage: () =>
    set((state) => ({
      profileEdit: {
        ...state.profileEdit,
        profileImage: "",
      },
    })),

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

  // 🔥 location 변경을 감지해서 profileEdit 업데이트
  syncLocation: () => {
    const selectedDistricts =
      useHelperLocationStore.getState().selectedDistricts;
    const selectedSchedule = useScheduleStore.getState().schedule;
    const selectedConsult = useScheduleStore.getState().consult;
    const selectedPay = usePayStore.getState().pay;
    // console.log("응애 ", selectedConsult);
    set((state) => ({
      profileEdit: {
        ...state.profileEdit,
        location: selectedDistricts, // 🟢 location 동기화
        schedule: selectedSchedule,
        pay: selectedPay,
        consult: selectedConsult,
      },
    }));
  },
}));

export default useProfileStore;
