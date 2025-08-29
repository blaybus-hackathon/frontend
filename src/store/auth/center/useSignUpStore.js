import { create } from 'zustand';
import { signUpCenter } from '@/services/signUpService';

const createCenterDataSlice = (set) => ({
  signUpForm: {
    emailAuth: {
      email: '',
      emailCode: '',
      password: '',
      passwordConfirm: '',
      passwordCheck: false,
      mailSeq: undefined,
      isVerified: false,
    },
    personalInfo: {
      centerSeq: null,
      centerName: '',
      name: '',
      position: '',
    },
  },

  setEmailAuth: (data) =>
    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        emailAuth: data,
      },
    })),

  setEmailAuthField: (field, value) =>
    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        emailAuth: { ...state.signUpForm.emailAuth, [field]: value },
      },
    })),

  setPersonalInfo: (data) =>
    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        personalInfo: data,
      },
    })),

  setPersonalInfoField: (field, value) =>
    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        personalInfo: { ...state.signUpForm.personalInfo, [field]: value },
      },
    })),

  setKakaoUser: (kakaoUser) =>
    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        kakaoUser,
        emailAuth: {
          ...state.signUpForm.emailAuth,
          email: kakaoUser?.email || '',
        },
        personalInfo: {
          ...state.signUpForm.personalInfo,
          name: kakaoUser?.nickName || '',
          profileImage: kakaoUser?.profileImage || '',
        },
      },
    })),

  reset: () =>
    set({
      signUpForm: {
        emailAuth: {
          email: '',
          emailCode: '',
          password: '',
          passwordConfirm: '',
          mailSeq: null,
          isVerified: false,
        },
        personalInfo: {
          centerSeq: null,
          centerName: '',
          name: '',
          position: '',
        },
      },
    }),
});

const createCenterSubmissionSlice = (set, get) => ({
  isSubmitting: false,
  error: null,

  submitManager: async () => {
    set({ isSubmitting: true, error: null });

    try {
      const { emailAuth, personalInfo } = get().signUpForm;

      const payload = {
        centerSeq: personalInfo.centerSeq,
        name: personalInfo.name,
        position: personalInfo.position,
        email: emailAuth.email,
        password: emailAuth.password,
      };

      const result = await signUpCenter(payload);
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

export const useSignUpStore = create((set, get) => ({
  ...createCenterDataSlice(set),
  ...createCenterSubmissionSlice(set, get),
}));

export default useSignUpStore;
