import { create } from 'zustand';
import { omit } from '@/utils/omit';
import { TIME_TO_INDEX } from '@/constants/times';
import { createRecruitPost } from '@/services/center';
import { useCareConstantsStore } from '@/store/useCareMappingStore';

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

// API 응답 키 ↔ patientData 키 매핑
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

// -------- 초기값 -------------
const createEmptyIdToName = () => ({
  workTypeList: [],
  careLevelList: [],
  dementiaSymptomList: [],
  inmateStateList: [],
  serviceMealList: [],
  serviceToiletList: [],
  serviceMobilityList: [],
  serviceDailyList: [],
});

const createEmptyPatient = () => ({
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

// ===== 유틸리티 함수 =====
const calculateCareVal = (ids = [], base) => ids.reduce((mask, id) => mask | (1 << (id - base)), 0);

const findPatientKey = (listKey) =>
  Object.keys(CARE_CHOICE_KEYMAP).find((key) => CARE_CHOICE_KEYMAP[key] === listKey);

// ===== 스토어 정의 =====
export const usePatientStore = create((set, get) => ({
  patientData: createEmptyPatient(),
  idToName: createEmptyIdToName(),
  isSubmitting: false,
  error: null,

  setField: (field, val) => set((s) => ({ patientData: { ...s.patientData, [field]: val } })),

  setFields: (fields) => set((s) => ({ patientData: { ...s.patientData, ...fields } })),

  getTimeIndex: (timeStr) => (timeStr == null ? -1 : (TIME_TO_INDEX.get(timeStr) ?? -1)),

  // ===== 시간 관련 액션 =====
  setTime: (ptDate, start, end) =>
    set((state) => {
      // 기존 배열에서 같은 ptDate가 있는지 확인
      const existingIndex = state.patientData.timeList.findIndex((item) => item.ptDate === ptDate);

      if (existingIndex !== -1) {
        // 기존 항목 업데이트
        const updatedTimeList = [...state.patientData.timeList];
        updatedTimeList[existingIndex] = { ptDate, ptStartTime: start, ptEndTime: end };
        return {
          patientData: {
            ...state.patientData,
            timeList: updatedTimeList,
          },
        };
      } else {
        // 새 항목 추가
        const newTimeList = [
          ...state.patientData.timeList,
          { ptDate, ptStartTime: start, ptEndTime: end },
        ];
        return {
          patientData: {
            ...state.patientData,
            timeList: newTimeList,
          },
        };
      }
    }),

  removeTime: (ptDate) =>
    set((state) => {
      // 배열에서 해당 ptDate를 가진 항목 제거
      const filteredTimeList = state.patientData.timeList.filter((item) => item.ptDate !== ptDate);

      return {
        patientData: {
          ...state.patientData,
          timeList: filteredTimeList,
        },
      };
    }),

  // 전송용 timeList 배열 생성
  getTimeListArray: () => {
    const timeList = get().patientData.timeList;
    return [...timeList]
      .sort((a, b) => a.ptDate - b.ptDate)
      .map((item) => ({
        ptDate: item.ptDate,
        ptStartTime: item.ptStartTime,
        ptEndTime: item.ptEndTime,
      }));
  },

  // ===== Care 데이터 처리 =====
  setCareData: (careChoice, getCareNameByIds) => {
    if (!getCareNameByIds || !careChoice) return;

    const nextPatient = { ...get().patientData };
    const nextIdToName = { ...get().idToName };

    Object.entries(CATEGORY_BASE).forEach(([listKey, base]) => {
      const data = careChoice[listKey];

      if (Array.isArray(data)) {
        // ID 배열을 careVal로 변환
        const careVal = calculateCareVal(data, base);
        const patientKey = findPatientKey(listKey);

        if (patientKey) {
          nextPatient[patientKey] = careVal;
          nextIdToName[listKey] = getCareNameByIds(listKey, data);
        }
      } else if (typeof data === 'number') {
        // 이미 careVal인 경우
        const patientKey = findPatientKey(listKey);

        if (patientKey) {
          nextPatient[patientKey] = data;

          // careVal에서 id 리스트를 추출하여 careName 조회
          const { careValToIndex, getList } = useCareConstantsStore.getState();
          const indices = careValToIndex(listKey, data);
          const list = getList(listKey);
          const ids = indices.map((idx) => list[idx]?.id).filter((id) => id != null);
          nextIdToName[listKey] = getCareNameByIds(listKey, ids);
        }
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

    const careVal = calculateCareVal(ids, base);
    const names = getCareNameByIds(postKey, ids);

    set((s) => ({
      patientData: { ...s.patientData, [postKey]: careVal },
      idToName: { ...s.idToName, [postKey]: names },
    }));
  },

  isNextEnabled: () => {
    const p = get().patientData;
    return !!(p.welfare && p.wage !== null && p.wageState && p.timeList.length > 0 && p.workType);
  },

  reset: () =>
    set({
      patientData: createEmptyPatient(),
      idToName: createEmptyIdToName(),
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
      weight: Number(patientData.weight),
      linkingYn: 'true',
      timeList: get().getTimeListArray(),
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
