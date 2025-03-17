import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useScheduleStore = create(
    persist(
        (set) => ({
            // 스케줄 데이터
            schedules: {},  // { "월": { start: "9", end: "18" }, ... }

            // 요일별 스케줄 설정
            setDaySchedule: (day, schedule) =>
                set((state) => ({
                    schedules: {
                        ...state.schedules,
                        [day]: schedule
                    }
                })),

            // 요일 스케줄 삭제
            removeDaySchedule: (day) =>
                set((state) => {
                    const newSchedules = { ...state.schedules };
                    delete newSchedules[day];
                    return { schedules: newSchedules };
                }),

            // 전체 스케줄 설정
            setAllSchedules: (schedules) =>
                set({ schedules }),

            // 스케줄 초기화
            resetSchedules: () =>
                set({ schedules: {} })
        }),
        {
            name: 'schedule-storage'
        }
    )
);

export default useScheduleStore;