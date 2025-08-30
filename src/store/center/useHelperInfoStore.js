import { create } from 'zustand';

export const useHelperInfoStore = create((set) => ({
  helperInfo: {
    id: null,
    userEmail: '',
    name: '',
    phone: '',
    addressDetail: '',
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
    certificates: [],
    carOwnYn: true,
    eduYn: false,
    wage: 13000,
    wageState: 1,
    introduce: '',
    careExperience: false,
    wageNegotiation: false,
  },

  setHelperInfo: (newState) =>
    set(() => ({
      helperInfo: newState,
    })),
}));
