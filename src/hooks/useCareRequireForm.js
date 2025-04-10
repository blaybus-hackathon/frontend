import { useState, useEffect } from 'react';
import useElderRegiStore from '@/store/center/useElderRegiStore';
import { createSelectHandlers } from '@/utils/useSelectHandler';

const FORM_FIELDS = {
  WORK_TYPE: 'workType',
};

const initialFormData = {
  workType: 0,
  timeNegotiation: false,
  timeList: [],
};

export const useCareRequireForm = () => {
  const { registerElder, setCareRequirements } = useElderRegiStore();
  const [formData, setFormData] = useState(initialFormData);

  const updateFormData = (updater) => {
    const newData = updater(formData);
    if (!newData) return;

    setFormData(newData);
    setCareRequirements(newData);
  };

  const handlers = createSelectHandlers(updateFormData);

  useEffect(() => {
    if (registerElder.careRequirements) {
      setFormData(registerElder.careRequirements);
    }
  }, [registerElder.careRequirements]);

  const handleInputChange = (field, value) => {
    if (field === FORM_FIELDS.WORK_TYPE) {
      const handler = handlers.singleSelect(field);
      handler(value);
    } else {
      updateFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleTimeChange = (day, type, value) => {
    const existingTimeIndex = formData.timeList.findIndex((time) => time.ptDate === day);

    let newTimeList;
    if (existingTimeIndex === -1) {
      // 해당 날짜가 없는 경우 새로 추가
      newTimeList = [...formData.timeList, { ptDate: day, ptStartTime: '', ptEndTime: '' }];
    } else {
      // 해당 날짜가 있는 경우 업데이트
      newTimeList = formData.timeList.map((time) =>
        time.ptDate === day ? { ...time, [type]: value } : time,
      );
    }

    updateFormData((prev) => ({ ...prev, timeList: newTimeList }));
  };

  const isFormValid = () => {
    return (
      formData.workType !== 0 &&
      formData.timeList.length > 0 &&
      formData.timeList.every((time) => time.ptStartTime && time.ptEndTime) &&
      formData.timeList.every((time) => time.ptStartTime < time.ptEndTime)
    );
  };

  return { formData, handleInputChange, handleTimeChange, isFormValid };
};
