const errorMessageMap = {
  400: '잘못된 요청입니다.',
  401: '인증 실패',
  403: '권한 없음',
  404: '존재하지 않는 리소스',
  405: '허용되지 않는 메서드',
  409: '충돌',
  500: '서버 오류입니다. 잠시 후 다시 시도해주세요.',
};

// codes to redirect to error page
const REDIRECT_TO_ERROR_PAGE_CODES = [500, 502, 503, 504];

/**
 * common API error handler (with alert or redirect)
 * @param {*} error - Axios Error
 * @param {Object} localMap - custom message per page
 * @param {string} fallbackMessage - default message
 * @param {boolean} showAlert - show alert or not (default: true)
 * @param {boolean} redirectOnServerError - redirect to error page if server error (default: true)
 * @returns {{code: number, message: string}}
 */

export const handleApiError = (
  error,
  localMap = {},
  fallbackMessage = '문제가 발생했습니다.',
  showAlert = true,
  redirectOnServerError = true,
) => {
  const code = error?.response?.status || error?.response?.data?.code;
  const message = localMap[code] || errorMessageMap[code] || fallbackMessage;

  // if code is 5xx, redirect to error page
  if (redirectOnServerError && REDIRECT_TO_ERROR_PAGE_CODES.includes(code)) {
    // save current location and error info, then redirect to error page
    sessionStorage.setItem('errorRedirectFrom', window.location.pathname);
    sessionStorage.setItem(
      'errorInfo',
      JSON.stringify({
        code,
        message,
        timestamp: Date.now(),
      }),
    );
    window.location.href = '/error';
    return { code, message };
  }

  if (showAlert) {
    alert(message);
  }

  console.error(`[API Error] ${code}: ${message}`);

  return { code, message };
};
