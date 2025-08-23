import { create } from 'zustand';
import { omit } from '@/utils/omit';
import { signUpCenter, uploadManagerImg } from '@/services/signUpService';

const createCenterDataSlice = (set) => ({
  signUpForm: {
    emailAuth: {
      email: '',
      emailCode: '',
      password: '',
      passwordConfirm: '',
      passwordCheck: false,
      mailSeq: null,
      isVerified: false,
    },
    personalInfo: {
      centerSeq: null,
      centerName: '',
      name: '',
      position: '',
      profileOption: null,
      photoFile: null,
      imgChangeYn: false,
    },
    kakaoInfo: null,

    managerImage: null,
    managerSeq: null,
    profileOption: null, // default is icon
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

  setProfileOption: (option) =>
    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        profileOption: option,
      },
    })),

  setManagerImage: (imageId) =>
    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        managerImage: imageId,
      },
    })),

  setManagerSeq: (seq) =>
    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        managerSeq: seq,
      },
    })),

  //  for image save
  selectedImg: null,
  setSelectedImg: (file) => set({ selectedImg: file }),

  // state for image upload
  isUploading: false,
  uploadError: null,

  // function for image upload
  uploadProfileImage: async (file, managerSeq) => {
    set({ isUploading: true, uploadError: null });
    try {
      const formData = new FormData();
      formData.append('photoFile', file);
      formData.append('managerSeq', String(managerSeq));

      const res = await uploadManagerImg(formData);
      set({ isUploading: false });
      return res;
    } catch (error) {
      set({ isUploading: false, uploadError: error });
      throw error;
    }
  },

  reset: () =>
    set({
      signUpForm: {
        emailAuth: {
          email: '',
          emailCode: '',
          password: '',
          passwordConfirm: '',
          passwordCheck: false,
          mailSeq: null,
          isVerified: false,
        },
        personalInfo: {
          centerSeq: null,
          centerName: '',
          name: '',
          position: '',
          profileOption: '1',
          photoFile: null,
          imgChangeYn: false,
        },
        kakaoUser: null,
      },
      managerImage: null,
      managerSeq: null,
      profileOption: null,
    }),
});

const createManagerSubmissionSlice = (set, get) => ({
  isSubmitting: false,
  error: null,

  submitManager: async () => {
    const { signUpForm } = get();
    set({ isSubmitting: true, error: null });

    try {
      const { emailAuth, personalInfo } = signUpForm;

      const cleanEmailAuth = omit(emailAuth, [
        'emailCode',
        'passwordConfirm',
        'passwordCheck',
        'mailSeq',
        'isVerified',
      ]);

      const cleanPersonalInfo = omit(personalInfo, [
        'centerName',
        'profileOption',
        'photoFile',
        'imgChangeYn',
      ]);

      const payload = {
        ...cleanEmailAuth,
        ...cleanPersonalInfo,
      };

      // call manager sign up api
      const signUpRes = await signUpCenter(payload);

      // if sign up is successful and there is a profile image, upload the image
      if (signUpRes.code === 200 && personalInfo.photoFile && personalInfo.profileOption === '1') {
        const managerSeq = signUpRes.data.managerSeq;
        set({ managerSeq: managerSeq });

        try {
          // upload profile image
          await get().uploadProfileImage(personalInfo.photoFile, managerSeq);
        } catch (imageError) {
          console.error('profile image upload failed:', imageError);
          // even if image upload fails, sign up is successful so continue
        }
      }

      set({ isSubmitting: false });
      return signUpRes;
    } catch (error) {
      set({ isSubmitting: false, error });
      throw error;
    }
  },
});

export const useSignUpStore = create((set, get) => ({
  ...createCenterDataSlice(set),
  ...createManagerSubmissionSlice(set, get),
}));

export default useSignUpStore;
