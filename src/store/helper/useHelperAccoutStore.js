import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

const useHelperAccountStore = create(
  devtools((set) => ({
    helper: {
      id: 1,
      userEmail: 'emailAddress@gmail.com',
      name: 'tempName',
      phone: '010-0000-0000',
      addressDetail: '서울특별시 강남구',
      img: null,
      helperWorkLocation: [],
      helperWorkTime: [],
      careLevel: 0,
      inmateState: 0,
      workType: 0,
      careGender: 0,
      serviceMeal: 0,
      serviceMobility: 0,
      serviceDaily: 0,
      certificates: [
        {
          certName: '',
          certNum: '',
          certDateIssue: null,
          certSerialNum: null,
        },
      ],
      carOwnYn: true,
      eduYn: false,
      wage: null,
      wageState: null,
      introduce: '',
      careExperience: false,
      wageNegotiation: null,
    },

    workTypeNames: [],

    setPart: (newPart) => set((state) => ({ helper: { ...state.helper, ...newPart } })),
    setHelper: (newInfo) => set(() => ({ helper: newInfo })),

    addWorkTypeNames: (newNames) =>
      set((state) => ({ workTypeNames: [...state.workTypeNames, newNames] })),
    deleteWorkTypeName: (removingItem) =>
      set((state) => ({
        workTypeNames: state.workTypeNames.filter((item) => item !== removingItem),
      })),
    setWorkTypeNames: (newArr) => set({ workTypeNames: newArr }),

    addCertificate: (newItem) =>
      set((state) => ({
        helper: { ...state.helper, certificates: [...state.helper.certificates, newItem] },
      })),
    deleteCertificate: (deleted) =>
      set((state) => ({
        helper: {
          ...state.helper,
          certificates: state.helper.certificates.filter((x) => x.certName !== deleted),
        },
      })),
  })),
);

export default useHelperAccountStore;
