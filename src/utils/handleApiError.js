const errorMessageMap = {
  400: '잘못된 요청입니다.',
  401: '인증 실패',
  403: '권한 없음',
  404: '존재하지 않는 리소스',
  405: '허용되지 않는 메서드',
  409: '충돌',
  500: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

/**
 * common API error handler (with alert)
 * @param {*} error - Axios Error
 * @param {Object} localMap - custom message per page
 * @param {string} fallbackMessage - default message
 * @returns {{code: number, message: string}}
 */

export const handleApiError = (error, localMap = {}, fallbackMessage = '문제가 발생했습니다.') => {
  const code = error?.response?.data?.code;
  const message = localMap[code] || errorMessageMap[code] || fallbackMessage;

  alert(message);
  console.error(`[API Error] ${code}: ${message}`);

  return { code, message };
};
