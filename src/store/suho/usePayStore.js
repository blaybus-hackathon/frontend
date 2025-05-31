import { create } from 'zustand';

const usePayStore = create((set, get) => ({
  pay: {
    type: 'hourly', // 기본값
    amount: 10000,     // 기본값
  },

  setPay: ({ amount, type }) => {
    console.log('PayStore setPay 호출:', { amount, type });
    console.log('이전 상태:', get().pay);

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