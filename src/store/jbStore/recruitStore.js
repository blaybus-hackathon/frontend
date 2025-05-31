import { create } from 'zustand';

const recruitStore = create((set) => ({
  recruitInfo: {
    patientSeq: 7,
    imgAddress: null,
    name: '20250324',
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
    diseases: '당뇨',
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
    linkingYn: false,
    wageNegotiation: true,
    wageState: 2,
    wage: 15000,
    requestContents: '30분 정도 일찍 가도 괜찮습니다.',
    careChoice: {
      workTypeList: [3],
      careLevelList: [22],
      dementiaSymptomList: [30],
      inmateStateList: [39],
      genderList: [68],
      serviceMealList: [45, 46],
      serviceToiletList: [50, 52],
      serviceMobilityList: [55, 56],
      serviceDailyList: [60, 62],
      welfareList: [10, 12],
    },
  },

  setRecruit: (recruit) => set((state) => ({ recruitInfo: { ...state.recruitInfo, ...recruit } })),
}));

export default recruitStore;
