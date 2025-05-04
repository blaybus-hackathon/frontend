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
    patientData: {
      name: '김땡땡',
      gender: '여성',
      age: '72',
      workType: '병원 동행',
      address: '경기도 수원시 인계동',
      grade: '3등급',
      birth: '1919년 3월 1일',
      weight: 56,
      disease: '치매 초기, 중풍',
      dementia: ['집 밖을 배회', '가족을 알아보지 못함', '어린아이 같은 행동'],
      with: '다른가족과 동거 (돌봄 중 집에 있음)',
      meal: '스스로 식사 가능',
      toilet: ['스스로 가능'],
      mobile: ['거동 불가'],
      daily: ['목욕 보조', '병원 동행'],
    },
    recruitReq: {
      day: ['토요일', '일요일'],
      wageType: '시급',
      wage: '13000',
      payNego: false,
      welfare: [],
    },

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

    setRecruit: (recruit) => set((state) => ({ recruitReq: { ...state.recruitReq, ...recruit } })),
  }),
);
export default patientStore;
