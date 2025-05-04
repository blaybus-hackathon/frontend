import { create } from 'zustand';

const initialState = {
  currentStep: 1,
  totalSteps: 5,
  isCompleted: false,
};

export const useElderRegiStepStore = create((set) => ({
  ...initialState,

  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),
  setCompleted: (completed) => set({ isCompleted: completed }),
  reset: () => set(initialState),
}));
