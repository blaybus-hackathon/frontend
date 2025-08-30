import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// const useHelperAccountStore = create(
//   persist((set) => ({
//     helper: {
//       id: 1,
//       userEmail: 'emailAddress@gmail.com',
//       name: 'tempName',
//       phone: '010-0000-0000',
//       addressDetail: '서울특별시 강남구',
//       certificates: [],
//       carOwnYn: true,
//       eduYn: false,
//       wage: null,
//       wageState: null,
//     },

//     setPart: (newPart) => set((state) => ({ helper: { ...state.helper, ...newPart } })),
//     setHelper: (newInfo) => set(() => ({ helper: newInfo })),
//   })),
// );

const useHelperAccountStore = create((set) => ({
  helper: {
    id: 1,
    userEmail: 'emailAddress@gmail.com',
    name: 'tempName',
    phone: '010-0000-0000',
    addressDetail: '서울특별시 강남구',
    img: null,
    helperWorkLocation: [],
    helperWorkTime: [],
    careLevel: 1,
    inmateState: 0,
    workType: 0,
    careGender: 0,
    serviceMeal: 0,
    serviceMobility: 0,
    serviceDaily: 0,
    certificates: [
      {
        certName: '',
        certNum: '',
        certDateIssue: null,
        certSerialNum: null,
      },
    ],
    carOwnYn: true,
    eduYn: false,
    wage: null,
    wageState: null,
    introduce: '',
    careExperience: false,
    wageNegotiation: null,
  },

  setPart: (newPart) => set((state) => ({ helper: { ...state.helper, ...newPart } })),
  setHelper: (newInfo) => set(() => ({ helper: newInfo })),
}));

export default useHelperAccountStore;

// "id": 2,
//     "userEmail": "helper@gmail.com",
//     "name": "김요양",
//     "phone": "010-1234-5678",
//     "addressDetail": "서울특별시 강남구",
//     "img": null,
//     "helperWorkLocation": [
//         {
//             "afSeq": 11,
//             "asSeq": 11215,
//             "atSeq": 11215107
//         },
//         {
//             "afSeq": 11,
//             "asSeq": 11170,
//             "atSeq": 11170129
//         }
//     ],
//     "helperWorkTime": [
//         {
//             "id": 1,
//             "date": 3,
//             "startTime": "09:00",
//             "endTime": "18:00",
//             "negotiation": false,
//             "workTerm": "3개월 이상"
//         }
//     ],
//     "careLevel": 1,
//     "inmateState": 0,
//     "workType": 0,
//     "careGender": 0,
//     "serviceMeal": 0,
//     "serviceMobility": 0,
//     "serviceDaily": 0,
//     "certificates": [
//         {
//             "certName": "요양사자격증",
//             "certNum": "2",
//             "certDateIssue": null,
//             "certSerialNum": null
//         }
//     ],
//     "carOwnYn": true,
//     "eduYn": false,
//     "wage": 13000,
//     "wageState": 1,
//     "introduce": "hello",
//     "careExperience": true,
//     "wageNegotiation": null
