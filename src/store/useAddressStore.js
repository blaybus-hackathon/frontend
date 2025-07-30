// zustand + persist 기반 통합 주소 상태 관리
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getFirstAddr, getSecondAddr, getThirdAddr } from '@/services/addressService';
import { formatAddress } from '@/utils/formatters/formatAddress';

// === constants ===
const ADDRESS_LEVELS = {
  FIRST: 'first',
  SECOND: 'second',
  THIRD: 'third',
};

// for ui
const STATE_KEYS = {
  LIST: {
    first: 'firstAddressList',
    second: 'secondAddressList',
    third: 'thirdAddressList',
  },
  SELECTED: {
    first: 'selectedAfSeq',
    second: 'selectedAsSeq',
    third: 'selectedAtSeq',
  },
};

// === utility functions for persistence ===
const serializeMap = (mapObj) => {
  const result = {};
  for (const [key, map] of Object.entries(mapObj)) {
    if (map instanceof Map) {
      result[key] = Array.from(map.entries());
    } else if (Array.isArray(map)) {
      // Already serialized
      result[key] = map;
    } else {
      // Convert object to entries array
      result[key] = Object.entries(map || {});
    }
  }
  return result;
};

const deserializeMap = (raw) => {
  const result = {};
  for (const [key, entries] of Object.entries(raw)) {
    if (Array.isArray(entries)) {
      result[key] = new Map(entries);
    } else {
      result[key] = new Map();
    }
  }
  return result;
};

const serializeSet = (setObj) => {
  const result = {};
  for (const [key, set] of Object.entries(setObj)) {
    if (set instanceof Set) {
      result[key] = Array.from(set);
    } else if (Array.isArray(set)) {
      // Already serialized
      result[key] = set;
    } else {
      // Convert to array
      result[key] = [];
    }
  }
  return result;
};

const deserializeSet = (raw) => {
  const result = {};
  for (const [key, values] of Object.entries(raw)) {
    if (Array.isArray(values)) {
      result[key] = new Set(values);
    } else {
      result[key] = new Set();
    }
  }
  return result;
};

const mapStorage = {
  getItem: (name) => {
    const str = sessionStorage.getItem(name);
    if (!str) return null;

    try {
      const parsed = JSON.parse(str);

      if (parsed.state) {
        // Deserialize Maps and Sets after loading
        if (parsed.state.addressMaps) {
          parsed.state.addressMaps = deserializeMap(parsed.state.addressMaps);
        }
        if (parsed.state.loadedIds) {
          parsed.state.loadedIds = deserializeSet(parsed.state.loadedIds);
        }
      }

      return parsed;
    } catch (error) {
      console.warn('address store load failed:', error);
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      if (!value) return;

      // Zustand persist passes the value as string
      const valueStr = typeof value === 'string' ? value : JSON.stringify(value);
      const parsed = JSON.parse(valueStr);

      if (parsed.state) {
        // Try to serialize Maps and Sets before saving
        try {
          if (parsed.state.addressMaps) {
            parsed.state.addressMaps = serializeMap(parsed.state.addressMaps);
          }
          if (parsed.state.loadedIds) {
            parsed.state.loadedIds = serializeSet(parsed.state.loadedIds);
          }
        } catch (serializeError) {
          console.warn('Serialization failed, saving without serialization:', serializeError);
          // Continue with original data if serialization fails
        }
      }

      sessionStorage.setItem(name, JSON.stringify(parsed));
    } catch (error) {
      console.warn('address store save failed:', error);
    }
  },
  removeItem: (name) => sessionStorage.removeItem(name),
};

// === store ===
export const useAddressStore = create(
  persist(
    (set, get) => ({
      // state for UI
      firstAddressList: [],
      secondAddressList: [],
      thirdAddressList: [],
      selectedAfSeq: null,
      selectedAsSeq: null,
      selectedAtSeq: null,

      // cache: id -> name mapping
      addressMaps: {
        first: new Map(),
        second: new Map(),
        third: new Map(),
      },
      loadedIds: {
        first: new Set(),
        second: new Set(),
        third: new Set(),
      },

      isReady: false,
      isLoading: false,
      error: null,

      // === internal helper functions for update list and mapping ===
      _updateAddressData: (level, data, parentId = null) => {
        const state = get();
        const listKey = STATE_KEYS.LIST[level];
        const map = new Map(data.map((item) => [item.id, item.name]));

        const updates = {
          [listKey]: data,
          addressMaps: { ...state.addressMaps, [level]: map },
          loadedIds: {
            ...state.loadedIds,
            [level]:
              level === ADDRESS_LEVELS.FIRST
                ? new Set(data.map((item) => item.id))
                : new Set([...state.loadedIds[level], parentId]),
          },
        };

        // initialize state for lower levels
        if (level === ADDRESS_LEVELS.FIRST) {
          updates.secondAddressList = [];
          updates.thirdAddressList = [];
          updates.selectedAsSeq = null;
          updates.selectedAtSeq = null;
        } else if (level === ADDRESS_LEVELS.SECOND) {
          updates.thirdAddressList = [];
          updates.selectedAtSeq = null;
          updates.selectedAfSeq = parentId;
        } else if (level === ADDRESS_LEVELS.THIRD) {
          updates.selectedAsSeq = parentId;
        }

        set(updates);
      },

      // === UI actions ===
      fetchFirstAddressList: async () => {
        const state = get();
        if (state.firstAddressList.length > 0) return;

        try {
          const data = await getFirstAddr();
          get()._updateAddressData(ADDRESS_LEVELS.FIRST, data);
        } catch (error) {
          console.error('1차 주소 로드 실패:', error);
          set({ error: error.message });
        }
      },

      fetchSecondAddressList: async (afSeq) => {
        try {
          const data = await getSecondAddr(afSeq);
          get()._updateAddressData(ADDRESS_LEVELS.SECOND, data, afSeq);
        } catch (error) {
          console.error('2차 주소 로드 실패:', error);
          set({ error: error.message });
        }
      },

      fetchThirdAddressList: async (asSeq) => {
        try {
          const data = await getThirdAddr(asSeq);
          get()._updateAddressData(ADDRESS_LEVELS.THIRD, data, asSeq);
        } catch (error) {
          console.error('3차 주소 로드 실패:', error);
          set({ error: error.message });
        }
      },

      // === UI actions for selection ===
      setSelectedAfSeq: (afSeq) => set({ selectedAfSeq: afSeq }),
      setSelectedAsSeq: (asSeq) => set({ selectedAsSeq: asSeq }),
      setSelectedAtSeq: (atSeq) => set({ selectedAtSeq: atSeq }),

      // === lazy loading for mapping ===
      loadAddressesByIds: async (level, parentIds, fetchFn) => {
        const state = get();
        const idsToLoad = parentIds.filter((id) => !state.loadedIds[level].has(id));
        if (idsToLoad.length === 0) return;

        try {
          const results = await Promise.all(idsToLoad.map((id) => fetchFn(id)));
          const flatList = results.flat();

          set((prevState) => {
            const newMap = new Map(prevState.addressMaps[level]);
            const newSet = new Set(prevState.loadedIds[level]);

            flatList.forEach((item) => newMap.set(item.id, item.name));
            idsToLoad.forEach((id) => newSet.add(id));

            return {
              addressMaps: { ...prevState.addressMaps, [level]: newMap },
              loadedIds: { ...prevState.loadedIds, [level]: newSet },
            };
          });
        } catch (error) {
          console.error(`${level} 주소 매핑 로드 실패:`, error);
        }
      },

      loadSecondAddresses: (firstIds = []) =>
        get().loadAddressesByIds(ADDRESS_LEVELS.SECOND, firstIds, getSecondAddr),

      loadThirdAddresses: (secondIds = []) =>
        get().loadAddressesByIds(ADDRESS_LEVELS.THIRD, secondIds, getThirdAddr),

      // load addresses by ids
      ensureAddressesLoaded: async (addresses = []) => {
        try {
          const { fetchFirstAddressList, loadSecondAddresses, loadThirdAddresses } = get();

          await fetchFirstAddressList();

          const secondIds = [...new Set(addresses.map((addr) => addr.afSeq).filter(Boolean))];
          const thirdIds = [...new Set(addresses.map((addr) => addr.asSeq).filter(Boolean))];

          await Promise.all([
            secondIds.length > 0 ? loadSecondAddresses(secondIds) : Promise.resolve(),
            thirdIds.length > 0 ? loadThirdAddresses(thirdIds) : Promise.resolve(),
          ]);

          set({ isReady: true });
        } catch (error) {
          console.error('ensureAddressesLoaded failed:', error);
          set({ isReady: false, error: error.message });
        }
      },

      // convert address to name
      getAddressNameById: ({ afSeq, asSeq, atSeq }) => {
        const state = get();
        const first = state.addressMaps.first.get(afSeq) || '';
        const second = state.addressMaps.second.get(asSeq) || '';
        const third = state.addressMaps.third.get(atSeq) || '';
        return formatAddress(first, second, third);
      },

      getSelectedAddressName: () => {
        const { selectedAfSeq, selectedAsSeq, selectedAtSeq, getAddressNameById } = get();
        if (!selectedAfSeq) return '';
        return getAddressNameById({
          afSeq: selectedAfSeq,
          asSeq: selectedAsSeq,
          atSeq: selectedAtSeq,
        });
      },

      reset: () => {
        set({
          firstAddressList: [],
          secondAddressList: [],
          thirdAddressList: [],
          selectedAfSeq: null,
          selectedAsSeq: null,
          selectedAtSeq: null,
          addressMaps: {
            first: new Map(),
            second: new Map(),
            third: new Map(),
          },
          loadedIds: {
            first: new Set(),
            second: new Set(),
            third: new Set(),
          },
          isReady: false,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: 'address-storage',
      storage: createJSONStorage(() => mapStorage),
      version: 1,
      partialize: (state) => ({
        addressMaps: state.addressMaps,
        loadedIds: state.loadedIds,
        isReady: state.isReady,
      }),
    },
  ),
);

// === custom hooks ===

// for address selection by user
export const useAddressSelection = () => {
  const store = useAddressStore();
  return {
    // 데이터
    firstAddressList: store.firstAddressList,
    secondAddressList: store.secondAddressList,
    thirdAddressList: store.thirdAddressList,
    selectedAfSeq: store.selectedAfSeq,
    selectedAsSeq: store.selectedAsSeq,
    selectedAtSeq: store.selectedAtSeq,

    // 액션
    fetchFirstAddressList: store.fetchFirstAddressList,
    fetchSecondAddressList: store.fetchSecondAddressList,
    fetchThirdAddressList: store.fetchThirdAddressList,
    setSelectedAfSeq: store.setSelectedAfSeq,
    setSelectedAsSeq: store.setSelectedAsSeq,
    setSelectedAtSeq: store.setSelectedAtSeq,
    getSelectedAddressName: store.getSelectedAddressName,
    reset: store.reset,
  };
};

// for address mapping
export const useAddressMapping = () => {
  const store = useAddressStore();
  return {
    isReady: store.isReady,
    isLoading: store.isLoading,
    error: store.error,
    getAddressNameById: store.getAddressNameById,
    ensureAddressesLoaded: store.ensureAddressesLoaded,
    reset: store.reset,
  };
};

export const initializeAddressMapping = async (addresses = []) => {
  const store = useAddressStore.getState();
  await store.ensureAddressesLoaded(addresses);
};

export default useAddressSelection;
