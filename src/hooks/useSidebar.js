import { create } from 'zustand';

// sync to local storage
const getInitialState = () => {
  const saved = localStorage.getItem('sidebar-collapsed');
  return saved !== null ? JSON.parse(saved) : false;
};

export const useSidebarStore = create((set) => ({
  isCollapsed: getInitialState(),
  setCollapsed: (v) => set({ isCollapsed: v }),
  toggle: () =>
    set((state) => {
      const next = !state.isCollapsed;
      localStorage.setItem('sidebar-collapsed', JSON.stringify(next));
      return { isCollapsed: next };
    }),
}));

// sync to local storage
useSidebarStore.subscribe(
  (state) => state.isCollapsed,
  (val) => localStorage.setItem('sidebar-collapsed', JSON.stringify(val)),
);
