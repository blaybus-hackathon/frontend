import { create } from 'zustand';

/** 선택된 값들이 페이지를 벗어나도 유지되도록 함 */
const useSelectionStore = create((set) => ({
  selectedValues: {},

  /**
   * single selection
   * @param {string} groupName - unique name of button group
   * @param {string} value - selected button value
   */
  setSelectedValue: (groupName, value) =>
    set((state) => ({
      selectedValues: { ...state.selectedValues, [groupName]: value },
    })),

  /**
   * multi-seletion
   * @param {string} groupName - unique name of button group
   * @param {string} value - the value to be selected || removed
   */
  toggleSelectedValue: (groupName, value) =>
    set((state) => {
      const currentValues = state.selectedValues[groupName] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value) // remove if already selected
        : [...currentValues, value]; // add if not selected

      return { selectedValues: { ...state.selectedValues, [groupName]: newValues } };
    }),

  /**
   * clear all selected values for a specific group
   * @param {string} groupName - name of the group to clear
   */
  clearSelection: (groupName) =>
    set((state) => ({
      selectedValues: { ...state.selectedValues, [groupName]: [] },
    })),
}));

export default useSelectionStore;
