import { create } from 'zustand';

const usePayStore = create((set, get) => ({
    selectedPay: null,
    payType: 'hourly',

    setPay: ({ amount, type }) => {

        console.log('PayStore setPay 호출:', { amount, type });  // 로그 추가
        console.log('이전 상태:', get());  // 이전 상태 확인



        set({
            selectedPay: amount,
            payType: type
        });
    },

    resetPay: () => {
        set({
            selectedPay: null,
            payType: 'hourly'
        });
    }
}));

export default usePayStore;