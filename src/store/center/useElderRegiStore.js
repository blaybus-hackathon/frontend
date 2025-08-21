import { create } from 'zustand';
import { omit } from '@/utils/omit';
import { submitElderData, uploadElderProfile } from '@/services/center/elderFormService';

const createElderDataSlice = (set) => ({
  registerElder: {
    basicInfo: {
      name: '',
      gender: null,
      birthDate: '',
      afSeq: null,
      asSeq: null,
      atSeq: null,
      weight: '',
      diseases: '',
      careLevel: null,
      addressLabel: '',
    },
    careInfo: {
      workType: null,
      timeList: [],
      timeNegotiation: false,
    },
    addInfo: {
      dementiaSymptom: null,
      inmateState: null,
      selectedDementiaSymptoms: [], // for ui, not for backend
    },
    serviceInfo: {
      serviceMeal: null,
      serviceToilet: null,
      serviceMobility: null,
      serviceDaily: null,
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

  setCareInfoField: (field, value) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        careInfo: {
          ...state.registerElder.careInfo,
          [field]: value,
        },
      },
    })),
  setAddInfoField: (field, value) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        addInfo: {
          ...state.registerElder.addInfo,
          [field]: value,
        },
      },
    })),
  setServiceInfoField: (fields) =>
    set((state) => ({
      registerElder: {
        ...state.registerElder,
        serviceInfo: {
          ...state.registerElder.serviceInfo,
          ...fields,
        },
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

  reset: () =>
    set({
      registerElder: {
        basicInfo: {
          name: '',
          gender: null,
          birthDate: '',
          afSeq: null,
          asSeq: null,
          atSeq: null,
          weight: '',
          diseases: '',
          careLevel: null,
          addressLabel: '',
        },
        careInfo: {
          workType: null,
          timeList: [],
          timeNegotiation: false,
        },
        addInfo: {
          dementiaSymptom: null,
          inmateState: null,
          selectedDementiaSymptoms: [],
        },
        serviceInfo: {
          serviceMeal: null,
          serviceToilet: null,
          serviceMobility: null,
          serviceDaily: null,
          selectedServiceMealList: [],
          selectedServiceToiletList: [],
          selectedServiceMobilityList: [],
          selectedServiceDailyList: [],
        },
        patientImage: null,
        patientSeq: null,
        profileOption: null,
      },
    }),

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
