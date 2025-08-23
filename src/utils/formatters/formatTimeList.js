import { DAYS } from '@/constants/days';

export const formatTimeList = (timeList = []) => {
  return timeList.map(({ ptDate, ptStartTime, ptEndTime }) => {
    const day = DAYS[ptDate - 1];
    return `${day.slice(0, 1)} ${ptStartTime}~${ptEndTime}\n`;
  });
};
