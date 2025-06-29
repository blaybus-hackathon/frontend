export const validateCareInfo = (careInfo) => {
  if (!careInfo) return false;

  const { workType = 0, timeList = [] } = careInfo;

  return (
    workType !== 0 &&
    timeList.length > 0 &&
    timeList.every((time) => time.ptStartTime && time.ptEndTime) &&
    timeList.every((time) => time.ptStartTime < time.ptEndTime)
  );
};
