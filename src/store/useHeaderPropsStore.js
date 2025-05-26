import { create } from 'zustand';

export const useHeaderPropsStore = create((set) => ({
  headerProps: null,
  setHeaderProps: (props) => set({ headerProps: props }),
  clearHeaderProps: () => set({ headerProps: null }),
}));
