import { create } from 'zustand';
import { submitElderData } from '@/services/center/elderFormService';

// function for clean selectedList
function omit(obj, keys) {
  const newObj = { ...obj };
  keys.forEach((key) => {
    delete newObj[key];
  });
  return newObj;
}

const createElderDataSlice = (set) => ({
  registerElder: {
    basicInfo: {
      name: '',
      gender: 0,
      birthDate: '',
      afSeq: 0,
      asSeq: 0,
      atSeq: 0,
      weight: '',
      diseases: '',
      careLevel: 0,
    },
    careInfo: {
      workType: 0,
      timeList: [],
      timeNegotiation: false,
    },
    addInfo: {
      dementiaSymptom: 0,
      inmateState: 0,
      selectedDementiaSymptoms: [], // for ui, not for backend
    },
    serviceInfo: {
      serviceMeal: 0,
      serviceToilet: 0,
      serviceMobility: 0,
      serviceDaily: 0,
      selectedServiceMealList: [],
      selectedServiceToiletList: [],
      selectedServiceMobilityList: [],
      selectedServiceDailyList: [],
    },
    profileImage: null,
  },
  setBasicInfo: (data) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        basicInfo: data,
      },
    })),
  setCareInfo: (data) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        careInfo: data,
      },
    })),
  setAddInfo: (data) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        addInfo: data,
      },
    })),
  setServiceInfo: (data) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        serviceInfo: data,
      },
    })),
  setProfileImage: (imageId) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        profileImage: imageId,
      },
    })),
});

const createSubmissionSlice = (set, get) => ({
  isSubmitting: false,
  error: null,

  submitElder: async () => {
    const { registerElder } = get();
    set({ isSubmitting: true, error: null });

    try {
      const { basicInfo, careInfo, addInfo, serviceInfo } = registerElder;

      const cleanAddInfo = omit(addInfo, ['selectedDementiaSymptoms']);
      const cleanServiceInfo = omit(serviceInfo, [
        'selectedServiceMealList',
        'selectedServiceToiletList',
        'selectedServiceMobilityList',
        'selectedServiceDailyList',
      ]);

      const payload = {
        ...basicInfo,
        ...careInfo,
        ...cleanAddInfo,
        ...cleanServiceInfo,
      };

      const result = await submitElderData(payload);
      set({ isSubmitting: false });
      return result;
    } catch (error) {
      set({ isSubmitting: false, error: error.message });
      throw error;
    }
  },
});

// elder registration store
export const useElderRegiStore = create((set, get) => ({
  ...createElderDataSlice(set),
  ...createSubmissionSlice(set, get),
}));
