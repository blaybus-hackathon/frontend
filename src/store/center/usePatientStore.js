import { create } from 'zustand';
import { omit } from '@/utils/omit';
import { TIMES } from '@/constants/times';
import { createRecruitPost } from '@/services/center';

// -------- 상수 -------------
const CATEGORY_BASE = {
  workTypeList: 2,
  careLevelList: 21,
  dementiaSymptomList: 29,
  inmateStateList: 38,
  serviceMealList: 45,
  serviceToiletList: 50,
  serviceMobilityList: 55,
  serviceDailyList: 60,
};

// 상세조회(careChoice.*List) ↔ 등록키 매핑
const CARE_CHOICE_KEYMAP = {
  workType: 'workTypeList',
  careLevel: 'careLevelList',
  dementiaSymptom: 'dementiaSymptomList',
  inmateState: 'inmateStateList',
  serviceMeal: 'serviceMealList',
  serviceToilet: 'serviceToiletList',
  serviceMobility: 'serviceMobilityList',
  serviceDaily: 'serviceDailyList',
};

const emptyIdToName = () => ({
  workTypeList: [],
  careLevelList: [],
  dementiaSymptomList: [],
  inmateStateList: [],
  serviceMealList: [],
  serviceToiletList: [],
  serviceMobilityList: [],
  serviceDailyList: [],
});

const emptyPatient = () => ({
  patientSeq: null,
  name: '',
  afSeq: null,
  asSeq: null,
  atSeq: null,
  gender: null,
  birthDate: '',
  weight: null,
  diseases: '',
  careLevel: null,
  imgAddress: '',
  workType: null,
  address: '',
  timeList: [],
  timeNegotiation: false,
  wage: null,
  wageState: 1,
  wageNegotiation: false,
  welfare: null,
  dementiaSymptom: null,
  inmateState: null,
  serviceMeal: null,
  serviceToilet: null,
  serviceMobility: null,
  serviceDaily: null,
  requestContents: '',
});

// -------- utils -------------
const getCareVal = (ids = [], base) => ids.reduce((mask, id) => mask | (1 << (id - base)), 0);

// -------- store -------------
export const usePatientStore = create((set, get) => ({
  patientData: emptyPatient(),
  idToName: emptyIdToName(),
  isSubmitting: false,
  error: null,

  setField: (field, val) => set((s) => ({ patientData: { ...s.patientData, [field]: val } })),

  setFields: (fields) => set((s) => ({ patientData: { ...s.patientData, ...fields } })),

  // 동일한 날짜면 교체, 없으면 추가
  setTime: (ptDate, ptStartTime, ptEndTime) =>
    set((s) => {
      if (!TIMES.includes(ptStartTime) || !TIMES.includes(ptEndTime)) return {};
      const list = s.patientData.timeList.slice();
      const i = list.findIndex((time) => time.ptDate === ptDate);
      const next = { ptDate, ptStartTime, ptEndTime };
      if (i >= 0) list[i] = next;
      else list.push(next);
      return { patientData: { ...s.patientData, timeList: list } };
    }),

  removeTime: (ptDate) =>
    set((s) => ({
      patientData: {
        ...s.patientData,
        timeList: s.patientData.timeList.filter((time) => time.ptDate !== ptDate),
      },
    })),

  getTimeByIndex: (index) => TIMES[index] || null,
  getTimeIndex: (time) => TIMES.indexOf(time),
  getITime: () => TIMES,

  // 카테고리 일괄/단일 세팅
  setCareData: (careChoice, getCareNameByIds) => {
    if (!getCareNameByIds || !careChoice) return;

    const nextPatient = { ...get().patientData };
    const nextIdToName = { ...get().idToName };

    Object.entries(CATEGORY_BASE).forEach(([postKey, base]) => {
      const listKey = CARE_CHOICE_KEYMAP[postKey];
      const ids = careChoice[listKey];

      if (Array.isArray(ids)) {
        nextPatient[postKey] = getCareVal(ids, base);
        nextIdToName[postKey] = getCareNameByIds(postKey, ids);
      }
    });

    set({
      patientData: nextPatient,
      idToName: nextIdToName,
    });
  },

  setCareCategory: (postKey, ids, getCareNameByIds) => {
    if (!getCareNameByIds) return;
    const base = CATEGORY_BASE[postKey];
    if (base === null) return;

    const careVal = getCareVal(ids, base);
    const names = getCareNameByIds(postKey, ids);

    set((s) => ({
      patientData: { ...s.patientData, [postKey]: careVal },
      idToName: { ...s.idToName, [postKey]: names },
    }));
  },

  // 다음 버튼 활성화
  isNextEnabled: () => {
    const p = get().patientData;
    return !!(p.welfare && p.wage && p.wageState && p.timeList.length > 0 && p.workType);
  },

  reset: () =>
    set({
      patientData: emptyPatient(),
      idToName: emptyIdToName(),
      isSubmitting: false,
      error: null,
    }),

  submitRecruitPost: async () => {
    const { patientData, isSubmitting } = get();
    if (isSubmitting) return;

    set({ isSubmitting: true, error: null });

    const clearData = omit(patientData, ['address', 'imgAddress']);

    const payload = {
      ...clearData,
      patientSeq: Number(patientData.patientSeq),
      weight: Number(patientData.weight),
      linkingYn: 'true',
    };

    try {
      const res = await createRecruitPost(payload);
      set({ isSubmitting: false });
      return res;
    } catch (error) {
      set({ isSubmitting: false, error: error.message });
      throw error;
    }
  },
}));
