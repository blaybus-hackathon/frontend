import { create } from 'zustand';

const usePayStore = create((set, get) => ({
  consult: false,

  setConsult: (value) => set({ consult: value }),

  pay: {
    type: 'hourly', // 기본값
    amount: 10000, // 기본값
  },

  setPay: ({ amount, type }) => {
    set({
      pay: {
        type,
        amount,
      },
    });
  },

  resetPay: () => {
    set({
      pay: {
        type: 'hourly',
        amount: '',
      },
    });
  },
}));

export default usePayStore;
