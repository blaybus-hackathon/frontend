import { DAYS } from '@/constants/days';

export const sortTimeListByDate = (timeList = []) =>
  [...timeList].sort((a, b) => a.ptDate - b.ptDate);

export const formatTimeList = (timeList = []) => {
  return sortTimeListByDate(timeList).map(({ ptDate, ptStartTime, ptEndTime }) => {
    const dayName = DAYS[ptDate - 1]?.slice(0, 1) ?? '';
    return `${dayName} ${ptStartTime}~${ptEndTime}`;
  });
};
