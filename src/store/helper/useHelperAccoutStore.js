import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// const useHelperAccountStore = create(
//   persist((set) => ({
//     helper: {
//       id: 1,
//       userEmail: 'emailAddress@gmail.com',
//       name: 'tempName',
//       phone: '010-0000-0000',
//       addressDetail: '서울특별시 강남구',
//       certificates: [],
//       carOwnYn: true,
//       eduYn: false,
//       wage: null,
//       wageState: null,
//     },

//     setPart: (newPart) => set((state) => ({ helper: { ...state.helper, ...newPart } })),
//     setHelper: (newInfo) => set(() => ({ helper: newInfo })),
//   })),
// );

const useHelperAccountStore = create((set) => ({
  helper: {
    id: 1,
    userEmail: 'emailAddress@gmail.com',
    name: 'tempName',
    phone: '010-0000-0000',
    addressDetail: '서울특별시 강남구',
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
  },

  setPart: (newPart) => set((state) => ({ helper: { ...state.helper, ...newPart } })),
  setHelper: (newInfo) => set(() => ({ helper: newInfo })),
}));

export default useHelperAccountStore;
