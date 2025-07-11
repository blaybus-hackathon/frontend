import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { USER_ROLE } from '@/constants/authType';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // {chatSenderId, email, userAuth}
      login: (userInfo) => set({ user: userInfo }),
      logout: () => set({ user: null }),

      // 권한별 getter
      isCenter: () => get().user?.userAuth === USER_ROLE.MANAGER,
      isHelper: () => get().user?.userAuth === USER_ROLE.MEMBER,
      isLoggedIn: () => !!get().user,
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    },
  ),
);

export default useAuthStore;
