import { create } from 'zustand';

const useUserStore = create((set) => ({
  email: '',
  name: '',
  phone: '',

  setEmail: (email) => set({ email }),
}));

export default useUserStore;
