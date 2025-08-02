import { create } from 'zustand';

const patientStore = create((set) => ({
  patientData: {
    patientSeq: 7,
    imgAddress: null,
    name: '20250325',
    genderStr: '여성',
    age: 66,
    careLevelStr: '1등급',
    address: '인천광역시 중구 중앙동1가',
    inmateStateStr: '배우자와 동거, 돌봄 시간 중 집에 있음',

    afSeq: 28,
    asSeq: 28110,
    atSeq: 28110101,
    birthDate: '19581106',
    weight: 69.0,
    diseases: '고혈압',
    timeNegotiation: true,
    timeList: [
      {
        ptDate: 1,
        ptStartTime: '12:30',
        ptEndTime: '17:30',
      },
      {
        ptDate: 2,
        ptStartTime: '12:30',
        ptEndTime: '17:30',
      },
      {
        ptDate: 3,
        ptStartTime: '12:30',
        ptEndTime: '17:30',
      },
    ],
    careChoice: {
      workTypeList: [3],
      careLevelList: [22],
      dementiaSymptomList: [30],
      inmateStateList: [41],
      genderList: [68],
      serviceMealList: [45, 46],
      serviceToiletList: [50, 52],
      serviceMobilityList: [55, 56],
      serviceDailyList: [60, 62],
    },
  },

  setPatientName: (name) => set((state) => ({ patientData: { ...state.patientData, name } })),
  setPatientGender: (gender) => set((state) => ({ patientData: { ...state.patientData, gender } })),
  setPatientAge: (age) => set((state) => ({ patientData: { ...state.patientData, age } })),
  setPatientWorkType: (workType) =>
    set((state) => ({ patientData: { ...state.patientData, workType } })),
  setPatientAddress: (address) =>
    set((state) => ({ patientData: { ...state.patientData, address } })),
  setPatientGrade: (grade) => set((state) => ({ patientData: { ...state.patientData, grade } })),
  setPatient: (info) => set((state) => ({ patientData: { ...state.patientData, ...info } })),
}));
export default patientStore;
