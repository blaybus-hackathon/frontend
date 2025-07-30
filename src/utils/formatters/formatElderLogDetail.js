import { FALLBACK_CARE_CONSTANTS } from '@/constants/fallbackCareConstants';
import { formatBirthDate } from './formatBirthDate';
import { formatBirthToAge } from './formatBirthToAge';
import { formatTimeList } from './formatTimeList';
import { formatWageToHourlyText } from './formatWageToHourlyText';

/**
 * map care id -> careName (fallback support)
 * get care name by fallback
 */
const getFallbackCareNames = (idList = []) => {
  return idList.map((id) => FALLBACK_CARE_CONSTANTS[id] || '알 수 없음');
};

/**
 * map care id -> careName (fallback support)
 */
const getCareNames = (getCareNameByIds, categoryKey, idList = []) => {
  try {
    if (!getCareNameByIds) {
      return getFallbackCareNames(idList);
    }

    const result = getCareNameByIds(categoryKey, idList);

    // if loading or failed, use fallback
    if (!result || result.includes('로딩 중...') || result.includes('알 수 없음')) {
      const fallback = getFallbackCareNames(idList);
      // combine api and fallback result (api result first)
      return (
        result?.map((item, index) =>
          item && item !== '로딩 중...' && item !== '알 수 없음' ? item : fallback[index],
        ) || fallback
      );
    }

    return result;
  } catch (error) {
    console.warn(`failed to map care (${categoryKey}):`, error);
    return getFallbackCareNames(idList);
  }
};

/**
 * map address id -> address name (fallback support)
 */
const getAddressName = (getAddressNameById, addressData) => {
  try {
    if (!addressData || (!addressData.afSeq && !addressData.asSeq && !addressData.atSeq)) {
      return '주소 정보 없음';
    }

    if (!getAddressNameById) {
      console.warn('getAddressNameById function not available');
      return '주소 정보 없음';
    }

    const result = getAddressNameById(addressData);

    if (!result || result === '로딩 중...' || result.trim() === '') {
      console.warn('Address mapping returned empty result:', result);
      return '주소 정보 없음';
    }

    return result;
  } catch (error) {
    console.warn('failed to map address:', error);
    return '주소 정보 없음';
  }
};

/**
 * 어르신 로그 상세 정보 포맷팅
 */
export const formatElderLogDetail = (data, getAddressNameById, getCareNameByIds) => {
  if (!data) return null;

  // format basic data
  const elderData = {
    ...data,
    formattedBirthDate: formatBirthDate(data.birthDate),
    age: formatBirthToAge(data.birthDate),
    formattedTimeList: formatTimeList(data.timeList || []),
    formattedWage: formatWageToHourlyText(data.wage, data.wageState, data.timeList || []),
  };

  elderData.fullAddress = getAddressName(getAddressNameById, {
    afSeq: data.afSeq,
    asSeq: data.asSeq,
    atSeq: data.atSeq,
  });

  if (data.careChoice) {
    elderData.careChoiceFormatted = {
      workType: getCareNames(getCareNameByIds, 'workType', data.careChoice.workTypeList || []),
      careLevel: getCareNames(getCareNameByIds, 'careLevel', data.careChoice.careLevelList || []),
      dementiaSymptoms: getCareNames(
        getCareNameByIds,
        'dementiaSymptomList',
        data.careChoice.dementiaSymptomList || [],
      ),
      inmateStates: getCareNames(
        getCareNameByIds,
        'inmateStateList',
        data.careChoice.inmateStateList || [],
      ),
      gender: getCareNames(getCareNameByIds, 'gender', data.careChoice.genderList || []),
      serviceMeals: getCareNames(
        getCareNameByIds,
        'serviceMealList',
        data.careChoice.serviceMealList || [],
      ),
      serviceToilets: getCareNames(
        getCareNameByIds,
        'serviceToiletList',
        data.careChoice.serviceToiletList || [],
      ),
      serviceMobilities: getCareNames(
        getCareNameByIds,
        'serviceMobilityList',
        data.careChoice.serviceMobilityList || [],
      ),
      serviceDailies: getCareNames(
        getCareNameByIds,
        'serviceDailyList',
        data.careChoice.serviceDailyList || [],
      ),
      welfares: getCareNames(getCareNameByIds, 'welfareList', data.careChoice.welfareList || []),
    };

    // if careChoiceFormatted.gender is not empty, overwrite the default gender field
    if (elderData.careChoiceFormatted.gender?.length > 0) {
      elderData.gender = elderData.careChoiceFormatted.gender.join(', ');
    }
  } else {
    elderData.careChoiceFormatted = null;
  }

  return elderData;
};
