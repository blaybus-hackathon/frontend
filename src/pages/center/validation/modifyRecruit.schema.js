/**
 * ModifyRecruit 페이지의 폼 검증 스키마
 */

export const modifyRecruitSchema = {
  name: (value) => {
    if (!value || !value.trim()) {
      return '이름을 입력해주세요.';
    }
    if (value.trim().length < 2) {
      return '이름은 2글자 이상 입력해주세요.';
    }
    if (value.trim().length > 10) {
      return '이름은 10글자 이하로 입력해주세요.';
    }
    return '';
  },

  birthDate: (value) => {
    if (!value || !value.trim()) {
      return '생년월일을 입력해주세요.';
    }

    // 날짜 형식 검증 (YYYY-MM-DD)
    const dateRegex = /^\d{8}$/;
    if (!dateRegex.test(value)) {
      return '올바른 날짜 형식(YYYYMMDD)으로 입력해주세요.';
    }
    return '';
  },

  gender: (value) => {
    if (!value) {
      return '성별을 선택해주세요.';
    }
    if (!['남성', '여성'].includes(value)) {
      return '올바른 성별을 선택해주세요.';
    }
    return '';
  },

  weight: (value) => {
    if (value === null || value === undefined || value === '') {
      return '몸무게를 입력해주세요.';
    }

    const numValue = Number(value);
    if (isNaN(numValue) || numValue <= 0) {
      return '올바른 몸무게를 입력해주세요.';
    }

    if (numValue < 20) {
      return '몸무게는 20kg 이상이어야 합니다.';
    }

    if (numValue > 300) {
      return '몸무게는 300kg 이하여야 합니다.';
    }

    return '';
  },

  diseases: (value) => {
    if (!value || !value.trim()) {
      return '보유질병을 입력해주세요.';
    }
    if (value.trim().length > 100) {
      return '보유질병은 100글자 이하로 입력해주세요.';
    }
    return '';
  },

  careLevel: (value) => {
    if (!value || value === 0) {
      return '장기요양등급을 선택해주세요.';
    }
    return '';
  },

  inmateState: (value) => {
    if (!value || value === 0) {
      return '동거인 여부를 선택해주세요.';
    }
    return '';
  },

  serviceMeal: (value) => {
    if (!value || value === 0) {
      return '식사 보조를 선택해주세요.';
    }
    return '';
  },

  welfare: (value) => {
    if (!value || value === 0) {
      return '복리후생을 선택해주세요.';
    }
    return '';
  },

  workType: (value) => {
    if (!value || value === 0) {
      return '근무종류를 선택해주세요.';
    }
    return '';
  },

  requestContents: (value) => {
    if (value && value.length > 300) {
      return '기타 요청사항은 300글자 이하로 입력해주세요.';
    }
    return '';
  },
};
