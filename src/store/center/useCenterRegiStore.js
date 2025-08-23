import { create } from 'zustand';
import { centerRegister } from '@/services/center/centerRegiService';
import { handleApiError } from '@/utils/handleApiError';

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
      const errorResult = handleApiError(
        error,
        {
          4004: '이미 같은 주소의 센터가 등록되어있습니다.',
          403: '센터 등록에 필요한 정보가 누락되었습니다.',
          400: '입력하신 정보를 다시 확인해주세요.',
          401: '로그인이 필요합니다.',
        },
        '센터 등록 중 오류가 발생했습니다.',
        false,
        false,
      );

      set({ isSubmitting: false, error: errorResult });

      throw errorResult;
    }
  },
});

export const useCenterRegiStore = create((set, get) => ({
  ...createCenterDataSlice(set),
  ...createCenterSubmissionSlice(set, get),
}));

export default useCenterRegiStore;
