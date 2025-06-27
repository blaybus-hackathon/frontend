import { create } from 'zustand';
import { centerRegister } from '@/services/center/centerRegiService';

const createCenterDataSlice = (set) => ({
  registerCenter: {
    basicInfo: {
      name: '',
      tel: '',
      carYn: '',
      postcode: '',
      basicAddress: '',
      extraAddress: '',
      detailAddress: '',
    },
    addInfo: {
      grade: '',
      openDate: '',
      introduce: '',
    },
  },

  setBasicInfo: (data) =>
    set((state) => ({
      registerCenter: {
        ...state.registerCenter,
        basicInfo: data,
      },
    })),

  setBasicInfoField: (field, value) =>
    set((state) => ({
      registerCenter: {
        ...state.registerCenter,
        basicInfo: { ...state.registerCenter.basicInfo, [field]: value },
      },
    })),

  setAddInfo: (data) =>
    set((state) => ({
      registerCenter: {
        ...state.registerCenter,
        addInfo: data,
      },
    })),

  setAddInfoField: (field, value) =>
    set((state) => ({
      registerCenter: {
        ...state.registerCenter,
        addInfo: { ...state.registerCenter.addInfo, [field]: value },
      },
    })),

  reset: () =>
    set({
      registerCenter: {
        basicInfo: {
          name: '',
          tel: '',
          carYn: '',
          postcode: '',
          basicAddress: '',
          extraAddress: '',
          detailAddress: '',
        },
        addInfo: {
          grade: '',
          openDate: '',
          introduce: '',
        },
      },
    }),
});

const createCenterSubmissionSlice = (set, get) => ({
  isSubmitting: false,
  error: null,

  submitCenter: async () => {
    set({ isSubmitting: true, error: null });

    try {
      const { basicInfo, addInfo } = get().registerCenter;

      const fullAddress = `${basicInfo.basicAddress} ${basicInfo.detailAddress}`;

      const payload = {
        name: basicInfo.name,
        tel: basicInfo.tel,
        carYn: basicInfo.carYn === '예' ? true : false,
        address: fullAddress,
        ...addInfo,
      };

      const result = await centerRegister({ data: payload });
      set({ isSubmitting: false });
      return result;
    } catch (error) {
      const customError = {
        code: error?.response?.data?.code || 'UNKNOWN_ERROR',
        message: error?.response?.data?.message || '알 수 없는 오류가 발생했습니다.',
        status: error?.response?.status || 500,
      };
      set({ isSubmitting: false, error: customError.message });
      throw customError;
    }
  },
});

export const useCenterRegiStore = create((set, get) => ({
  ...createCenterDataSlice(set),
  ...createCenterSubmissionSlice(set, get),
}));

export default useCenterRegiStore;
