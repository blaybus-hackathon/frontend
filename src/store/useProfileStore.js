import { create } from "zustand";
import useHelperLocationStore from "@/store/suho/useHelperLocationStore";
import useScheduleStore from "@/store/suho/useScheduleStore"; // 스케줄 스토어 임포트
// Zustand Store 생성
const useProfileStore = create((set) => ({
  profile: {
    introduction: "",
    careExperience: "",
    schedule: {},
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
    payType: "",
    payAmount: "",
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
    payType: "",
    payAmount: "",
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
        name: "",
        address: "",
        profileImage: "",
      },
      profileEdit: {
        // reset 시 profileEdit도 초기화
        introduction: "",
        careExperience: "",
        schedule: {},
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
    console.log("응애 ", selectedSchedule);
    set((state) => ({
      profileEdit: {
        ...state.profileEdit,
        location: selectedDistricts, // 🟢 location 동기화
        schedule: selectedSchedule,
      },
    }));
  },

  subscribeToLocationStore: () => {
    useHelperLocationStore.subscribe(
      (state) => state.selectedDistricts,
      (newSelectedDistricts) => {
        get().syncLocation(); // ✅ get()을 사용하여 store의 함수에 접근
      }
    );
  },
}));

// 컴포넌트가 마운트될 때 구독 시작 (권장되는 방식)
const { subscribeToLocationStore } = useProfileStore.getState();
subscribeToLocationStore();

export default useProfileStore;

// import { create } from "zustand";

// // 🔹 초기 상태 정의 (중복 제거)
// const defaultProfileState = {
//   introduction: "",
//   careExperience: "",
//   location: {},
//   careTypes: {
//     workTypes: [],
//     careGrade: "",
//     gender: "",
//     livingArrangement: "",
//     mealCare: "",
//     mobilitySupport: "",
//     dailyLife: [],
//   },
//   payType: "",
//   payAmount: "",
//   selectedOptions: {}, // 자격증
//   inputs: {},
// };

// // 🔹 Zustand Store 생성
// const useProfileStore = create((set) => ({
//   profile: { ...defaultProfileState },
//   profileEdit: { ...defaultProfileState },

//   // 🔹 상태 업데이트 함수
//   updateProfile: (newProfile) => set({ profile: { ...newProfile } }),

//   // 🔹 profileEdit 상태 수정
//   updateProfileField: (field, value) =>
//     set((state) => ({
//       profileEdit: {
//         ...state.profileEdit,
//         [field]: value,
//       },
//     })),

//   // 🔹 careTypes 필드 수정
//   updateCareTypeField: (field, value) =>
//     set((state) => ({
//       profileEdit: {
//         ...state.profileEdit,
//         careTypes: {
//           ...state.profileEdit.careTypes,
//           [field]: value,
//         },
//       },
//     })),

//   // 🔹 profileEdit 초기화
//   initializeProfileEdit: (initialProfile) =>
//     set({ profileEdit: { ...initialProfile } }),

//   // 🔹 전체 초기화 (profile & profileEdit)
//   resetProfile: () => set({ profile: { ...defaultProfileState }, profileEdit: { ...defaultProfileState } }),
// }));

// export default useProfileStore;
