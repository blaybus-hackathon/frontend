import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

const patientStore = create(
  //   persist((set) => ({
  //     patientData: { name: '', gender: '', age: '', workType: '', address: '', grade: '' },
  //     setPatientName: (name) => set((state) => ({ patientData: { ...state.patientData, name } })),
  //     setPatientGender: (gender) =>
  //       set((state) => ({ patientData: { ...state.patientData, gender } })),
  //     setPatientAge: (age) => set((state) => ({ patientData: { ...state.patientData, age } })),
  //     setPatientWorkType: (workType) =>
  //       set((state) => ({ patientData: { ...state.patientData, workType } })),
  //     setPatientAddress: (address) =>
  //       set((state) => ({ patientData: { ...state.patientData, address } })),
  //     setPatientGrade: (grade) => set((state) => ({ patientData: { ...state.patientData, grade } })),
  //     setPatient: (info) => set((state) => ({ ...state.patientData, ...info })),
  //   })),

  (set) => ({
    patientData: { name: '', gender: '', age: '', workType: '', address: '', grade: '' },
    setPatientName: (name) => set((state) => ({ patientData: { ...state.patientData, name } })),
    setPatientGender: (gender) =>
      set((state) => ({ patientData: { ...state.patientData, gender } })),
    setPatientAge: (age) => set((state) => ({ patientData: { ...state.patientData, age } })),
    setPatientWorkType: (workType) =>
      set((state) => ({ patientData: { ...state.patientData, workType } })),
    setPatientAddress: (address) =>
      set((state) => ({ patientData: { ...state.patientData, address } })),
    setPatientGrade: (grade) => set((state) => ({ patientData: { ...state.patientData, grade } })),
    setPatient: (info) => set((state) => ({ patientData: { ...state.patientData, ...info } })),
  }),
);
export default patientStore;
