import { create } from 'zustand';
import { omit } from '@/utils/omit';
import { signUpHelper, uploadHelperImg } from '@/services/signUpService';
import { devtools } from 'zustand/middleware';

// 선택 해제 시 key 삭제
function removeLicenseField(licenseInfo, key) {
  const next = { ...licenseInfo };
  delete next[key];
  return next;
}

// 빈 값은 nul, 숫자는 Number로 변환
const normalizeLicenseInfo = (licenseInfo) =>
  Object.fromEntries(
    Object.entries(licenseInfo).map(([key, value]) => {
      return [
        key,
        {
          certName: value?.certName?.trim() ? value.certName : null,
          certNum: value?.certNum?.trim() ? value.certNum : null,
          certDateIssue:
            value?.certDateIssue !== undefined &&
            value.certDateIssue !== null &&
            String(value.certDateIssue).trim() !== ''
              ? Number(value.certDateIssue)
              : null,
          certSerialNum:
            value?.certSerialNum !== undefined &&
            value.certSerialNum !== null &&
            String(value.certSerialNum).trim() !== ''
              ? Number(value.certSerialNum)
              : null,
        },
      ];
    }),
  );

const createHelperDataSlice = (set) => ({
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
    helperInfo: {
      name: '',
      phone: '',
      gender: null,
      birthday: '',
      profilePic: false,
      addressDetail: '',
      carOwnYn: null,
      eduYn: null,
      imgFile: null,
    },
    licenseInfo: {},
    kakaoUser: null,
  },
  isFirstCheck: true,
  isEmailFirstCheck: true,

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

  setHelperInfo: (data) =>
    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        helperInfo: data,
      },
    })),

  setHelperInfoField: (field, value) =>
    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        helperInfo: { ...state.signUpForm.helperInfo, [field]: value },
      },
    })),

  setLicenseInfo: (data) =>
    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        licenseInfo: data,
      },
    })),

  setLicenseInfoField: (field, value) =>
    set((state) => {
      // value가 모두 비어있으면(선택 해제) 해당 필드 삭제
      const empty =
        (!value.certName || value.certName === '') &&
        (!value.certNum || value.certNum === '') &&
        (!value.certDateIssue || value.certDateIssue === null) &&
        (!value.certSerialNum || value.certSerialNum === null);
      return {
        signUpForm: {
          ...state.signUpForm,
          licenseInfo: empty
            ? removeLicenseField(state.signUpForm.licenseInfo, field)
            : { ...state.signUpForm.licenseInfo, [field]: value },
        },
      };
    }),

  setKakaoUser: (kakaoUser) =>
    set((state) => ({
      signUpForm: {
        ...state.signUpForm,
        kakaoUser,
        emailAuth: {
          ...state.signUpForm.emailAuth,
          email: kakaoUser?.email || '',
        },
        helperInfo: {
          ...state.signUpForm.helperInfo,
          name: kakaoUser?.nickName || '',
          profileImage: kakaoUser?.profileImage || '',
        },
      },
    })),

  setIsFirstCheck: (newBool) => set({ isFirstCheck: newBool }),
  setIsEmailFirstCheck: (newBool) => set({ isEmailFirstCheck: newBool }),

  reset: () =>
    set({
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
        helperInfo: {
          name: '',
          phone: '',
          gender: null,
          birthday: '',
          profilePic: null,
          addressDetail: '',
          carOwnYn: null,
          eduYn: null,
        },
        licenseInfo: {
          essentialCertNo: {
            certName: '',
            certNum: '',
            certDateIssue: null,
            certSerialNum: null,
          },
          careCertNo: {
            certName: '',
            certNum: '',
            certDateIssue: null,
            certSerialNum: null,
          },
          nurseCerNo: {
            certName: '',
            certNum: '',
            certDateIssue: null,
            certSerialNum: null,
          },
          postPartumCertNo: {
            certName: '',
            certNum: '',
            certDateIssue: null,
            certSerialNum: null,
          },
        },
        kakaoUser: null,
      },
    }),
});

const createHelperSubmissionSlice = (set, get) => ({
  isSubmitting: false,
  error: null,

  submitHelper: async () => {
    set({ isSubmitting: true, error: null });

    try {
      const { emailAuth, helperInfo, licenseInfo } = get().signUpForm;

      const cleanEmailAuth = omit(emailAuth, [
        'emailCode',
        'passwordConfirm',
        'passwordCheck',
        'mailSeq',
        'isVerified',
      ]);
      const cleanHelperInfo = omit(helperInfo, ['imgFile']);
      const cleanLicenseInfo = normalizeLicenseInfo(licenseInfo);

      const transformedHelperInfo = {
        ...cleanHelperInfo,
        gender: cleanHelperInfo.gender === true ? 1 : 0,
        profilePic: cleanHelperInfo.profilePic === true ? 1 : 0,
      };

      const payload = {
        roleType: 'MEMBER',
        ...cleanEmailAuth,
        ...transformedHelperInfo,
        ...cleanLicenseInfo,
      };

      // request signUp
      const helperRes = await signUpHelper(payload);

      // get helperSeq
      const helperSeq = helperRes.data?.helperSeq;
      if (!helperSeq) {
        throw new Error('Helper registration successful but helperSeq not found in response');
      }

      // if profilePic is true, upload img
      if (helperInfo.profilePic && helperInfo.imgFile) {
        const formData = new FormData();
        formData.append('helperSeq', helperSeq);
        formData.append('photoFile', helperInfo.imgFile);

        await uploadHelperImg(formData);
      }

      set({ isSubmitting: false });

      return helperRes;
    } catch (error) {
      set({
        isSubmitting: false,
        error: error?.response?.data?.message || '알 수 없는 오류가 발생했습니다.',
      });
      throw error;
    }
  },
});

export const useSignUpStore = create(
  devtools((set, get) => ({
    ...createHelperDataSlice(set),
    ...createHelperSubmissionSlice(set, get),
  })),
);

export default useSignUpStore;
