import { create } from 'zustand';
import { omit } from '@/utils/omit';
import { TIME_TO_INDEX } from '@/constants/times';
import { getRecruitDetail, updateRecruitPost } from '@/services/center';
import { useCareConstantsStore } from '@/store/useCareMappingStore';
import { useAddressStore } from '@/store/useAddressStore';
import { handleApiError } from '@/utils/handleApiError';

// ----- 상수 -------------
const CATEGORY_BASE = {
  workTypeList: 2,
  welfareList: 10,
  careLevelList: 21,
  dementiaSymptomList: 29,
  inmateStateList: 38,
  serviceMealList: 45,
  serviceToiletList: 50,
  serviceMobilityList: 55,
  serviceDailyList: 60,
  genderList: 67,
};

// API 응답 키 ↔ recruitData 키 매핑
const CARE_CHOICE_KEYMAP = {
  workType: 'workTypeList',
  welfare: 'welfareList',
  careLevel: 'careLevelList',
  dementiaSymptom: 'dementiaSymptomList',
  inmateState: 'inmateStateList',
  serviceMeal: 'serviceMealList',
  serviceToilet: 'serviceToiletList',
  serviceMobility: 'serviceMobilityList',
  serviceDaily: 'serviceDailyList',
  gender: 'genderList',
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
  genderList: [],
  welfareList: [],
});

const createEmptyRecruit = () => ({
  patientLogSeq: null,
  name: '',
  afSeq: null,
  asSeq: null,
  atSeq: null,
  addressLabel: '',
  birthDate: '',
  weight: null,
  diseases: '',
  timeList: [],
  timeNegotiation: false,
  wageState: 1,
  wage: null,
  wageNegotiation: false,
  gender: null,
  workType: null,
  careLevel: null,
  dementiaSymptom: null,
  inmateState: null,
  serviceMeal: null,
  serviceToilet: null,
  serviceMobility: null,
  serviceDaily: null,
  welfare: null,
  requestContents: '',
});

// ===== 유틸리티 함수 =====
const calculateCareVal = (ids = [], base) => ids.reduce((mask, id) => mask | (1 << (id - base)), 0);
const findRecruitKey = (listKey) =>
  Object.keys(CARE_CHOICE_KEYMAP).find((key) => CARE_CHOICE_KEYMAP[key] === listKey);

export const useRecruitStore = create((set, get) => ({
  // 공고 정보
  recruitData: createEmptyRecruit(),
  idToName: createEmptyIdToName(),
  isSubmitting: false,
  isLoading: false,
  error: null,
  errorCode: null,

  setField: (field, val) => set((s) => ({ recruitData: { ...s.recruitData, [field]: val } })),
  setFields: (fields) => set((s) => ({ recruitData: { ...s.recruitData, ...fields } })),
  getTimeIndex: (timeStr) => (timeStr == null ? -1 : (TIME_TO_INDEX.get(timeStr) ?? -1)),

  // ===== 시간 관련 액션 =====
  setTime: (ptDate, start, end) =>
    set((state) => {
      const existingIndex = state.recruitData.timeList.findIndex((item) => item.ptDate === ptDate);

      if (existingIndex !== -1) {
        const updatedTimeList = [...state.recruitData.timeList];
        updatedTimeList[existingIndex] = { ptDate, ptStartTime: start, ptEndTime: end };
        return {
          recruitData: {
            ...state.recruitData,
            timeList: updatedTimeList,
          },
        };
      } else {
        const newTimeList = [
          ...state.recruitData.timeList,
          { ptDate, ptStartTime: start, ptEndTime: end },
        ];
        return {
          recruitData: {
            ...state.recruitData,
            timeList: newTimeList,
          },
        };
      }
    }),

  removeTime: (ptDate) =>
    set((state) => {
      const filteredTimeList = state.recruitData.timeList.filter((item) => item.ptDate !== ptDate);
      return {
        recruitData: {
          ...state.recruitData,
          timeList: filteredTimeList,
        },
      };
    }),

  getTimeListArray: () => {
    const timeList = get().recruitData.timeList;
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

    const nextRecruit = { ...get().recruitData };
    const nextIdToName = { ...get().idToName };

    Object.entries(CATEGORY_BASE).forEach(([listKey, base]) => {
      const data = careChoice[listKey];

      if (Array.isArray(data)) {
        const careVal = calculateCareVal(data, base);
        const recruitKey = findRecruitKey(listKey);

        if (recruitKey) {
          nextRecruit[recruitKey] = careVal;
          nextIdToName[listKey] = getCareNameByIds(listKey, data);
        }
      } else if (typeof data === 'number') {
        const recruitKey = findRecruitKey(listKey);

        if (recruitKey) {
          nextRecruit[recruitKey] = data;

          const { careValToIndex, getList } = useCareConstantsStore.getState();
          const indices = careValToIndex(listKey, data);
          const list = getList(listKey);
          const ids = indices.map((idx) => list[idx]?.id).filter((id) => id != null);
          nextIdToName[listKey] = getCareNameByIds(listKey, ids);
        }
      }
    });

    set({
      recruitData: nextRecruit,
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
      recruitData: { ...s.recruitData, [postKey]: careVal },
      idToName: { ...s.idToName, [postKey]: names },
    }));
  },

  isNextEnabled: () => {
    const r = get().recruitData;
    return !!(r.welfare && r.wage !== null && r.wageState && r.timeList.length > 0 && r.workType);
  },

  reset: () =>
    set({
      recruitData: createEmptyRecruit(),
      idToName: createEmptyIdToName(),
      isSubmitting: false,
      isLoading: false,
      error: null,
      errorCode: null,
    }),

  // 공고 상세 정보 로딩
  fetchRecruitDetail: async (patientLogSeq) => {
    if (!patientLogSeq) return;

    set({ isLoading: true, error: null, errorCode: null });

    try {
      const response = await getRecruitDetail(patientLogSeq);
      const { getCareNameByIds } = useCareConstantsStore.getState();
      const { getAddressNameById, ensureAddressesLoaded } = useAddressStore.getState();

      // 주소 데이터가 필요한 경우 미리 로드
      if (response.afSeq || response.asSeq || response.atSeq) {
        await ensureAddressesLoaded([
          {
            afSeq: response.afSeq,
            asSeq: response.asSeq,
            atSeq: response.atSeq,
          },
        ]);
      }

      // 성별 문자열 변환
      const gender = response.careChoice?.genderList?.[0]
        ? response.careChoice.genderList[0] - 67 === 0
          ? 1
          : 2
        : null;

      // 주소 라벨 생성
      const addressLabel = getAddressNameById({
        afSeq: response.afSeq,
        asSeq: response.asSeq,
        atSeq: response.atSeq,
      });

      // 기본 데이터 설정
      const recruitData = {
        ...response,
        gender,
        addressLabel,
      };

      set({
        recruitData,
        isLoading: false,
        error: null,
        errorCode: null,
      });

      // 케어 데이터 설정
      if (response.careChoice) {
        get().setCareData(response.careChoice, getCareNameByIds);
      }

      return response;
    } catch (error) {
      // handleApiError로 에러 처리
      const { code, message } = handleApiError(
        error,
        {
          7000: '데이터 조회 권한이 없습니다.',
          7001: '데이터 조회 중 권한이 없습니다.',
          8001: '공고 정보를 찾을 수 없습니다.',
          8000: '해당 어르신의 정보를 찾을 수 없습니다.',
        },
        '공고 정보를 불러오는 중 오류가 발생했습니다.',
        false, // alert 표시하지 않음 (UI에서 처리)
        false, // 자동 리다이렉트 비활성화 (컴포넌트에서 처리)
      );

      set({
        isLoading: false,
        error: message,
        errorCode: code,
      });

      throw error;
    }
  },

  submitRecruitPost: async () => {
    const { recruitData, isSubmitting } = get();
    if (isSubmitting) return;

    set({ isSubmitting: true, error: null, errorCode: null });

    const clearData = omit(recruitData, ['addressLabel', 'careChoice']);

    const payload = {
      ...clearData,
      rematchYn: true,
      linkingYn: true,
      weight: Number(recruitData.weight),
      timeList: get().getTimeListArray(),
    };

    console.log('공고 수정 요청 데이터:', payload);

    try {
      const res = await updateRecruitPost(payload);
      set({
        isSubmitting: false,
        error: null,
        errorCode: null,
      });
      return res;
    } catch (error) {
      const { code, message } = handleApiError(
        error,
        {
          1001: '올바르지 않은 주소입니다.',
          7000: '데이터 수정 권한이 없습니다.',
          7001: '데이터 수정 권한이 없습니다.',
          8000: '해당 어르신의 정보를 찾을 수 없습니다.',
          8001: '공고 정보를 찾을 수 없습니다.',
        },
        '공고 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        false, // alert 표시하지 않음 (컴포넌트에서 처리)
        false, // 자동 리다이렉트 비활성화 (컴포넌트에서 처리)
      );

      set({
        isSubmitting: false,
        error: message,
        errorCode: code,
      });

      throw error;
    }
  },
}));
