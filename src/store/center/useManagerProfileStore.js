import { create } from 'zustand';

export const useManagerProfileStore = create((set) => ({
  isEditMode: false,
  formData: null,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  setFormData: (data) => set({ formData: data }),
  resetFormData: () => set({ isEditMode: false, formData: null }),
}));
