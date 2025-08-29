import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getFormConstants } from '@/services/center';
import { FALLBACK_CARE_CONSTANTS } from '@/constants/fallbackCareConstants';

// base category
const CAREVAL_BASE = {
  workTypeList: 2,
  careLevelList: 21,
  dementiaSymptomList: 29,
  inmateStateList: 38,
  serviceMealList: 45,
  serviceToiletList: 50,
  serviceMobilityList: 55,
  serviceDailyList: 60,
};

// set range for each category
const categoryRanges = [
  { key: 'workTypeList', range: [2, 8] },
  { key: 'welfareList', range: [10, 19] },
  { key: 'careLevelList', range: [21, 27] },
  { key: 'dementiaSymptomList', range: [29, 36] },
  { key: 'inmateStateList', range: [38, 42] },
  { key: 'serviceMealList', range: [45, 48] },
  { key: 'serviceToiletList', range: [50, 53] },
  { key: 'serviceMobilityList', range: [55, 58] },
  { key: 'serviceDailyList', range: [60, 65] },
  { key: 'gender', range: [67, 68] },
];

export const getCareVal = (ids = [], baseNum) => {
  if (!Number.isFinite(baseNum)) return 0;
  return ids.reduce((mask, id) => mask | (1 << (id - baseNum)), 0);
};

export const careValHas = (careVal, id, baseNum) =>
  Number.isFinite(baseNum) && (careVal & (1 << (id - baseNum))) !== 0;

// group fallback data by category
const createFallbackMapping = () => {
  const result = {};
  categoryRanges.forEach(({ key, range: [start, end] }) => {
    const map = new Map();
    for (let id = start; id <= end; id++) {
      if (FALLBACK_CARE_CONSTANTS[id]) {
        map.set(id, FALLBACK_CARE_CONSTANTS[id]);
      }
    }
    result[key] = map;
  });
  return result;
};

// Map to serialize/deserialize
/**
 * Map을 세션 스토리지에 안전하게 저장/복원하기 위한 커스텀 스토리지 구현
 */
const mapStorage = {
  getItem: (name) => {
    const str = sessionStorage.getItem(name);
    if (!str) return null;

    try {
      const { state, version } = JSON.parse(str);
      // restore Map object
      if (state.mapping) {
        const restoredMapping = {};
        for (const [key, entries] of Object.entries(state.mapping)) {
          restoredMapping[key] = new Map(entries);
        }
        state.mapping = restoredMapping;
      }
      return { state, version };
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      let stateToSave, versionToSave;

      // {state, version} 형태로 저장
      if (value && typeof value === 'object' && 'state' in value && 'version' in value) {
        stateToSave = { ...value.state };
        versionToSave = value.version;
      } else {
        stateToSave = { ...value };
        versionToSave = 1;
      }

      // convert Map to array for serialization
      if (stateToSave?.mapping) {
        const serializedMapping = {};
        for (const [key, map] of Object.entries(stateToSave.mapping)) {
          if (map instanceof Map) {
            serializedMapping[key] = Array.from(map.entries());
          } else {
            serializedMapping[key] = map;
          }
        }
        stateToSave.mapping = serializedMapping;
      }

      sessionStorage.setItem(
        name,
        JSON.stringify({
          state: stateToSave,
          version: versionToSave,
        }),
      );
    } catch (error) {
      console.warn('care mapping save failed:', error);
    }
  },
  removeItem: (name) => sessionStorage.removeItem(name),
};

const mapToList = (m) => (m ? Array.from(m, ([id, careName]) => ({ id, careName })) : []);

const careValToIndex = (list, careVal, baseNum) => {
  if (!Number.isFinite(baseNum) || careVal == null) return [];
  return list
    .map((item, i) => (careValHas(careVal, item.id, baseNum) ? i : -1))
    .filter((i) => i !== -1);
};

const indexToCareVal = (list, idxs, baseNum) => {
  if (!Number.isFinite(baseNum) || !Array.isArray(idxs)) return 0;
  const ids = idxs.map((i) => list[i]?.id).filter((v) => Number.isFinite(v));
  return getCareVal(ids, baseNum);
};

export const useCareConstantsStore = create(
  persist(
    (set, get) => ({
      // state
      mapping: {},
      isReady: false,
      isUsingFallback: false,
      isLoading: false,
      error: null,
      lastFetched: null,

      // actions
      fetchConstants: async (force = false) => {
        const state = get();
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;

        // if not forced update and data is fetched within 1 hour, skip
        if (!force && state.isReady && state.lastFetched && now - state.lastFetched < oneHour) {
          return;
        }

        set({ isLoading: true, error: null });
        const fallbackMapping = createFallbackMapping();

        try {
          const data = await getFormConstants();
          const apiMapping = {};
          for (const key in data) {
            const m = new Map();
            data[key]?.forEach((item) => {
              m.set(item.id, item.careName);
            });
            apiMapping[key] = m;
          }

          // fallback 위에 api 덮어쓰기(api 우선)
          const merged = { ...fallbackMapping };
          for (const key in apiMapping) {
            if (apiMapping[key]?.size > 0) merged[key] = apiMapping[key];
          }

          set({
            mapping: merged,
            isReady: true,
            isUsingFallback: false,
            isLoading: false,
            error: null,
            lastFetched: now,
          });
        } catch (error) {
          console.warn('fetch constants failed:', error);
          set({
            mapping: fallbackMapping,
            isReady: true,
            isUsingFallback: true,
            isLoading: false,
            error: error.message || '상수 로딩 실패(fallback 사용)',
            lastFetched: now,
          });
        }
      },

      // get care name by index
      getCareNameById: (categoryKey, id) => {
        const map = get().mapping[categoryKey];
        return map?.get(id) || FALLBACK_CARE_CONSTANTS[id] || '알 수 없음';
      },

      // get care name
      getCareNameByIds: (categoryKey, idList = []) => {
        const map = get().mapping[categoryKey];
        return idList.map((id) => map?.get(id) || FALLBACK_CARE_CONSTANTS[id] || '알 수 없음');
      },

      // transform map to [{id, careName}]
      getList: (categoryKey) => {
        const map = get().mapping[categoryKey];
        return mapToList(map);
      },

      // careVal -> index
      careValToIndex: (categoryKey, careVal) => {
        const list = get().getList(categoryKey);
        const base = CAREVAL_BASE[categoryKey];
        return careValToIndex(list, careVal, base);
      },

      // index -> careVal
      indexToCareVal: (categoryKey, idxs) => {
        const list = get().getList(categoryKey);
        const base = CAREVAL_BASE[categoryKey];
        return indexToCareVal(list, idxs, base);
      },

      // reset cache
      reset: () => {
        set({
          mapping: {},
          isReady: false,
          isUsingFallback: false,
          isLoading: false,
          error: null,
          lastFetched: null,
        });
      },
    }),
    {
      name: 'care-constants-storage',
      storage: createJSONStorage(() => mapStorage),
      version: 1,
      partialize: (state) => ({
        mapping: state.mapping,
        isReady: state.isReady,
        isUsingFallback: state.isUsingFallback,
        lastFetched: state.lastFetched,
      }),
    },
  ),
);

// initialize helper
export const initializeCareConstants = () => {
  const store = useCareConstantsStore.getState();
  if (!store.isReady && !store.isLoading) {
    store.fetchConstants();
  }
};
