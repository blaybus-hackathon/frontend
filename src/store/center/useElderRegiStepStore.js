import { create } from 'zustand';
import { ELDER_REGISTRATION_STEPS } from '@/constants/registrationSteps';

const initialState = {
  currentIndex: 0,
  totalSteps: ELDER_REGISTRATION_STEPS.length,
  isCompleted: false,
};

export const useElderRegiStepStore = create((set) => ({
  ...initialState,

  setStep: (index) => set({ currentIndex: index }),
  nextStep: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.totalSteps - 1),
    })),
  prevStep: () =>
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0),
    })),
  setCompleted: (completed) => set({ isCompleted: completed }),
  reset: () => set(initialState),
}));
