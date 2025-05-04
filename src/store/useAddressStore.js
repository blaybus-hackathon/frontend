import { create } from 'zustand';
import { getFirstAddr, getSecondAddr, getThirdAddr } from '@/services/addressService';

const useAddressStore = create((set) => ({
  firstAddressList: [],
  secondAddressList: [],
  thirdAddressList: [],

  selectedAfSeq: null,
  selectedAsSeq: null,
  selectedAtSeq: null,

  fetchFirstAddressList: async () => {
    const data = await getFirstAddr();
    set({ firstAddressList: data });
  },

  fetchSecondAddressList: async (afSeq) => {
    const data = await getSecondAddr(afSeq);
    set({
      selectedAfSeq: afSeq,
      secondAddressList: data,
      thirdAddressList: [],
      selectedAsSeq: null,
      selectedAtSeq: null,
    });
  },

  fetchThirdAddressList: async (asSeq) => {
    const data = await getThirdAddr(asSeq);
    set({
      selectedAsSeq: asSeq,
      thirdAddressList: data,
      selectedAtSeq: null,
    });
  },

  setSelectedAfSeq: (afSeq) => set({ selectedAfSeq: afSeq }),
  setSelectedAsSeq: (asSeq) => set({ selectedAsSeq: asSeq }),
  setSelectedAtSeq: (atSeq) => set({ selectedAtSeq: atSeq }),
}));

export default useAddressStore;
