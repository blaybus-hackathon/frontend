/**
 * hourly wage formatter
 * @param {number} wageState - 1: 시급, 2: 주급, 3: 월급
 * @param {number} wage - 입력된 금액
 * @param {Array} timeList - ptDate, ptStartTime, ptEndTime 포함된 배열
 * @returns {{ value: string, label: string }} - 포맷된 숫자, 설명 포함 텍스트
 */

export const formatWageToHourlyText = (wage, wageState, timeList = []) => {
  if (!wage || wage <= 0) {
    return {
      value: '정보 없음',
      label: '정보 없음',
    };
  }

  // wageState 1: 시급
  if (wageState === 1) {
    return `${wage.toLocaleString()}원`;
  }

  const totalWeeklyMinutes = timeList.reduce((acc, curr) => {
    const [startH, startM] = curr.ptStartTime.split(':').map(Number);
    const [endH, endM] = curr.ptEndTime.split(':').map(Number);
    const duration = endH * 60 + endM - (startH * 60 + startM);
    return acc + duration;
  }, 0);

  const totalMinutes =
    wageState === 2
      ? totalWeeklyMinutes // 주급 시 주간 총 근무 시간
      : totalWeeklyMinutes * 4; // 월급 시 월간 총 근무 시간

  const hourlyRate = totalMinutes > 0 ? Math.floor((wage * 60) / totalMinutes) : 0;

  return `${hourlyRate.toLocaleString()}원`;
};
