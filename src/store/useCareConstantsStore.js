import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getElderForm } from '@/services/center/elderFormService';
import { FALLBACK_CARE_CONSTANTS } from '@/constants/fallbackCareConstants';

// set range for each category
const categoryRanges = [
  { key: 'workType', range: [2, 8] },
  { key: 'welfareList', range: [10, 19] },
  { key: 'careLevel', range: [21, 27] },
  { key: 'dementiaSymptomList', range: [29, 36] },
  { key: 'inmateStateList', range: [38, 42] },
  { key: 'serviceMealList', range: [45, 48] },
  { key: 'serviceToiletList', range: [50, 53] },
  { key: 'serviceMobilityList', range: [55, 58] },
  { key: 'serviceDailyList', range: [60, 65] },
  { key: 'gender', range: [67, 68] },
];

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
      // Zustand persist는 상태 객체를 직접 전달할 수 있음
      let stateToSave, versionToSave;

      if (value && typeof value === 'object' && 'state' in value && 'version' in value) {
        // 래핑된 형태: { state, version }
        stateToSave = { ...value.state };
        versionToSave = value.version;
      } else {
        // 직접 상태 객체가 전달된 경우
        stateToSave = { ...value };
        versionToSave = 1;
      }

      // convert Map to array for serialization
      if (stateToSave && stateToSave.mapping) {
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

export const useCareMapping = create(
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
      fetchMapping: async (force = false) => {
        const state = get();
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;

        // if not forced update and data is fetched within 1 hour, skip
        if (!force && state.isReady && state.lastFetched && now - state.lastFetched < oneHour) {
          return;
        }

        set({ isLoading: true, error: null });

        const fallbackMapping = createFallbackMapping();
        let retryCount = 0;
        const maxRetries = 2;

        const attemptFetch = async () => {
          try {
            const data = await getElderForm();
            const apiMapping = {};

            // convert API data to Map
            for (const key in data) {
              apiMapping[key] = new Map();
              data[key].forEach((item) => {
                apiMapping[key].set(item.id, item.careName);
              });
            }

            // merge API data with fallback (API first)
            const mergedMapping = { ...fallbackMapping };
            for (const key in apiMapping) {
              if (apiMapping[key].size > 0) {
                mergedMapping[key] = apiMapping[key];
              }
            }

            set({
              mapping: mergedMapping,
              isReady: true,
              isUsingFallback: false,
              isLoading: false,
              error: null,
              lastFetched: now,
            });
          } catch (error) {
            console.error(`API call failed (attempt ${retryCount + 1}/${maxRetries + 1}):`, error);

            if (retryCount < maxRetries) {
              retryCount++;
              const delay = Math.pow(2, retryCount - 1) * 1000;
              setTimeout(attemptFetch, delay);
              return;
            }

            console.warn('API call failed, using fallback data');
            set({
              mapping: fallbackMapping,
              isReady: true,
              isUsingFallback: true,
              isLoading: false,
              error: error.message,
              lastFetched: now,
            });
          }
        };

        await attemptFetch();
      },

      // get care name (memoized selector)
      getCareNameByIds: (categoryKey, idList = []) => {
        const state = get();

        if (!state.isReady) return ['로딩 중...'];

        const map = state.mapping[categoryKey];
        if (!map) {
          // if category is not found, find directly from fallback
          return idList.map((id) => FALLBACK_CARE_CONSTANTS[id] || '알 수 없음');
        }

        return idList.map((id) => {
          const name = map.get(id);
          if (name) return name;

          // if not found in mapping, find from fallback constants
          return FALLBACK_CARE_CONSTANTS[id] || '알 수 없음';
        });
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
      name: 'care-mapping-storage',
      storage: createJSONStorage(() => mapStorage),
      version: 1,
      // 1 hour cache expiration
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
export const initializeCareMapping = () => {
  const store = useCareMapping.getState();
  if (!store.isReady && !store.isLoading) {
    store.fetchMapping();
  }
};

export const useCareMappingHook = () => {
  const { isReady, isUsingFallback, isLoading, error, fetchMapping, getCareNameByIds, reset } =
    useCareMapping();

  return {
    isReady,
    isUsingFallback,
    isLoading,
    error,
    getCareNameByIds,
    refreshMapping: () => fetchMapping(true),
    reset,
  };
};
