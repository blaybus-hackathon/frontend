import { create } from 'zustand';
import { omit } from '@/utils/omit';
import { submitElderData, uploadElderProfile } from '@/services/center/elderFormService';

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
      addressLabel: '',
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
    patientImage: null,
    patientSeq: null,
    profileOption: null, // default is icon
  },
  setBasicInfo: (data) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        basicInfo: data,
      },
    })),

  // for single field update
  setBasicInfoField: (field, value) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        basicInfo: {
          ...state.registerElder.basicInfo,
          [field]: value,
        },
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
  setProfileOption: (option) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        profileOption: option,
      },
    })),
  setPatientImage: (imageId) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        patientImage: imageId,
      },
    })),
  setPatientSeq: (seq) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        patientSeq: seq,
      },
    })),

  // for image save
  selectedImg: null,
  setSelectedImage: (file) => set({ selectedImg: file }),

  // state for image upload
  isUploading: false,
  uploadError: null,

  // function for image upload
  uploadProfileImage: async (file, patientSeq) => {
    set({ isUploading: true, uploadError: null });
    try {
      const formData = new FormData();
      formData.append('photoFile', file);
      formData.append('patientSeq', String(patientSeq));

      const response = await uploadElderProfile(formData);
      set({ isUploading: false });
      return response;
    } catch (error) {
      set({ isUploading: false, uploadError: error.message });
      throw error;
    }
  },
});

const createSubmissionSlice = (set, get) => ({
  isSubmitting: false,
  error: null,

  submitElder: async () => {
    const { registerElder } = get();
    set({ isSubmitting: true, error: null });

    try {
      const { basicInfo, careInfo, addInfo, serviceInfo } = registerElder;

      const cleanBasicInfo = omit(basicInfo, ['addressLabel']);
      const cleanAddInfo = omit(addInfo, ['selectedDementiaSymptoms']);
      const cleanServiceInfo = omit(serviceInfo, [
        'selectedServiceMealList',
        'selectedServiceToiletList',
        'selectedServiceMobilityList',
        'selectedServiceDailyList',
      ]);

      const payload = {
        ...cleanBasicInfo,
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
