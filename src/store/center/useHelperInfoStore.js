import { create } from 'zustand';

export const useHelperInfoStore = create((set) => ({
  helperInfo: {
    id: 1,
    userEmail: 'emailAddress@gmail.com',
    name: 'tempName',
    phone: '010-0000-0000',
    addressDetail: '서울특별시 강남구',
    certificates: [],
    carOwnYn: true,
    eduYn: false,
    wage: null,
    wageState: null,
    introduce: '',
    careExperience: true,
  },

  setHelperInfo: (newState) =>
    set(() => ({
      helperInfo: newState,
    })),
}));
