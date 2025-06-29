import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: false, // 로그인 여부
  chatSenderId: null, // 채팅 발신자 ID
  email: null,
  userAuth: null,
  loginType: null,

  updateAuth: (authData) =>
    set((state) => ({
      ...state,
      ...authData,
      isLoggedIn: true,
    })),

  logout: () =>
    set({
      isLoggedIn: false,
      chatSenderId: null,
      email: null,
      userAuth: null,
      loginType: null,
    }),
}));

export default useAuthStore;
