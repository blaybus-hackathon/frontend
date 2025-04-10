import { create } from 'zustand';
import { elderRegiService } from '@/services/elderRegiService';

const createElderDataSlice = (set) => ({
  registerElder: {
    basicInfo: {
      name: '',
      gender: 0,
      birthDate: '',
      weight: 0,
      disease: '',
      careLevel: 0,
    },
    careRequirements: {
      workType: 0,
      timeNegotiation: false,
      timeList: [],
    },
    additionalInfo: {
      dementiaSymptom: 0,
      inmateState: 0,
    },
    service: {
      serviceMeal: 0,
      serviceToilet: 0,
      serviceMobility: 0,
      serviceDaily: 0,
    },
  },
  setBasicInfo: (data) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        basicInfo: data,
      },
    })),
  setCareRequirements: (data) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        careRequirements: data,
      },
    })),
  setAdditionalInfo: (data) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        additionalInfo: data,
      },
    })),
  setService: (data) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        service: data,
      },
    })),
});

const createSubmissionSlice = (set, get) => ({
  isSubmitting: false,
  error: null,
  submitElderData: async () => {
    const state = get();
    set({ isSubmitting: true, error: null });

    try {
      const result = await elderRegiService.submitElderData(state.registerElder);
      set({ isSubmitting: false });
      return result;
    } catch (error) {
      set({ isSubmitting: false, error: error.message });
      throw error;
    }
  },
});

const useElderRegiStore = create((set, get) => ({
  ...createElderDataSlice(set),
  ...createSubmissionSlice(set, get),
}));

export default useElderRegiStore;
