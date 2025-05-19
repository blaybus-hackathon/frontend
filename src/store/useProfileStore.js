import { create } from "zustand";
import { persist } from "zustand/middleware";
import useHelperLocationStore from "@/store/suho/useHelperLocationStore";
import useScheduleStore from "@/store/suho/useScheduleStore"; // 스케줄 스토어 임포트
import usePayStore from "@/store/suho/usePayStore"; // 스케줄 스토어 임포트
// Zustand Store 생성
const useProfileStore = create(
  persist(
    (set, get) => ({
      profile: {
        chatSenderId: "",
        email: "",
        userAuth: "",
        introduction: "",
        careExperience: "",
        schedule: {},
        consult: false,
        location: {},
        careTypes: {
          workTypes: [],
          careGrade: "",
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
        selectedOptions: {},
        inputs: {},
        name: "",
        address: "",
        profileImage: "",
      },
      profileEdit: {
        introduction: "",
        careExperience: "",
        schedule: {},
        consult: false,
        location: {
          서울: {
            은평구: ["불광"],
          },
        },
        careTypes: {
          workTypes: [],
          careGrade: "",
          gender: "",
          livingArrangement: "",
          mealCare: "",
          mobilitySupport: "",
          dailyLife: [],
        },
        pay: {
          type: "hourly",
          amount: 1000,
        },
        selectedOptions: {},
        inputs: {},
        name: "",
        address: "",
        profileImage: "",
      },
      // 상태 업데이트 함수
      updateProfile: (newProfile) => set({ profile: { ...newProfile } }),

      //TODO : subscribe로 변경감지
      resetProfile: () =>
        set((state) => ({
          profile: {
            ...state.profile,
            introduction: "",
            careExperience: "",
            schedule: {},
            consult: false,
            location: {},
            careTypes: {
              workTypes: [],
              careGrade: "",
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
            selectedOptions: {},
            inputs: {},
            name: "",
            address: "",
            profileImage: "",
          },
          profileEdit: {
            introduction: "",
            careExperience: "",
            schedule: {},
            consult: false,
            location: {},
            careTypes: {
              workTypes: [],
              careGrade: "",
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
            selectedOptions: {},
            inputs: {},
            name: "",
            address: "",
            profileImage: "",
          },
        })),

      updateAuth: (authData) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...authData,
          },
        })),

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

      updateProfileField: (field, value) =>
        set((state) => {
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

      clearProfile: () => {
        sessionStorage.removeItem("profile-storage");
        set(() => ({
          profile: {
            chatSenderId: "",
            email: "",
            userAuth: "",
            introduction: "",
            careExperience: "",
            schedule: {},
            consult: false,
            location: {},
            careTypes: {
              workTypes: [],
              careGrade: "",
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
            selectedOptions: {},
            inputs: {},
            name: "",
            address: "",
            profileImage: "",
          },
        }));
      },

      // // careTypes의 workTypes 업데이트 액션 추가
      // updateCareTypeField: (fieldName, value) =>
      //   set((state) => ({
      //     profileEdit: {
      //       ...state.profileEdit,
      //       careTypes: {
      //         ...state.profileEdit.careTypes,
      //         [fieldName]: value,
      //       },
      //     },
      //   })),

      // profileEdit 초기화 액션 추가
      initializeProfileEdit: (initialProfile) =>
        set({ profileEdit: { ...initialProfile } }),

      // 🔥  변경을 감지해서 profileEdit 업데이트
      syncLocation: () => {
        const selectedDistricts =
          useHelperLocationStore.getState().selectedDistricts;
        const selectedSchedule = useScheduleStore.getState().schedule;
        const selectedConsult = useScheduleStore.getState().consult;
        const selectedPay = usePayStore.getState().pay;

        set((state) => ({
          profileEdit: {
            ...state.profileEdit,
            location: selectedDistricts,
            schedule: selectedSchedule,
            pay: selectedPay,
            consult: selectedConsult,
          },
        }));
      },
    }),
    {
      name: "profile-storage",
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
      partialize: (state) => ({ profile: state.profile }), // profile만 persist
    }
  )
);

export default useProfileStore;
