import { create } from 'zustand';
const useScheduleStore = create((set, get) => ({
  consult: false,

  setConsult: (value) => set({ consult: value }),

  schedule: {
    월: { start: '10:00', end: '23:00' },
    화: { start: '10:00', end: '23:00' },
    수: { start: '', end: '' },
    목: { start: '', end: '' },
    금: { start: '', end: '' },
    토: { start: '', end: '' },
    일: { start: '', end: '' },
  },
  updateSchedule: (day, type, time) =>
    set((state) => ({
      schedule: {
        ...state.schedule,
        [day]: {
          ...state.schedule[day],
          [type]: time,
        },
      },
    })),
  resetSchedule: () =>
    set({
      schedule: {
        월: { start: '', end: '' },
        화: { start: '', end: '' },
        수: { start: '', end: '' },
        목: { start: '', end: '' },
        금: { start: '', end: '' },
        토: { start: '', end: '' },
        일: { start: '', end: '' },
      },
    }),
  optimizedSchedule: () => {
    const { schedule } = get();
    const timeBasedSchedule = {}; // 시간대별로 요일 그룹화

    for (const day in schedule) {
      if (schedule[day].start && schedule[day].end) {
        const timeRange = `${schedule[day].start}~${schedule[day].end}`;
        if (!timeBasedSchedule[timeRange]) {
          timeBasedSchedule[timeRange] = [];
        }
        timeBasedSchedule[timeRange].push(day);
      }
    }

    const result = Object.entries(timeBasedSchedule).map(([time, days]) => {
      // 요일 순서대로 정렬
      const sortedDays = days.sort((a, b) => {
        const dayOrder = ['월', '화', '수', '목', '금', '토', '일'];
        return dayOrder.indexOf(a) - dayOrder.indexOf(b);
      });
      return {
        days: sortedDays.join(', '),
        time: time,
      };
    });

    return result;
  },
}));

export default useScheduleStore;
