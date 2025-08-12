import { create } from 'zustand';

const useHelperMatchingStore = create((set) => ({
  selectedLogSeq: null,
  setSelectedLogSeq: (seq) => set({ selectedLogSeq: seq }),
}));

export default useHelperMatchingStore;
