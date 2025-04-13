import { useState, useEffect } from 'react';
import useElderRegiStore from '@/store/center/useElderRegiStore';
import { createSelectHandlers } from '@/utils/useSelectHandler';

// form fields constants
const FORM_FIELDS = {
  DEMENTIA_SYMPTOMS: 'dementiaSymptom',
  INMATE_STATE: 'inmateState',
};

const initialFormData = {
  dementiaSymptom: 0, // 선택된 careVal의 합계
  inmateState: 0,
  selectedDementiaSymptoms: [], // UI 상태용 선택된 증상 목록
};

export const useElderAddForm = () => {
  const { registerElder, setAdditionalInfo } = useElderRegiStore();
  const [formData, setFormData] = useState(initialFormData);

  const updateFormData = (updater) => {
    const newData = updater(formData);
    if (!newData) return;

    setFormData(newData);

    // 백엔드로 전송할 데이터에서 UI용 속성 제외
    const backendData = {
      dementiaSymptom: newData.dementiaSymptom,
      inmateState: newData.inmateState,
    };

    setAdditionalInfo(backendData);
  };

  // createSelectHandlers for select fields
  const handlers = createSelectHandlers(updateFormData);

  // if registerElder.additionalInfo is not null, setFormData
  useEffect(() => {
    if (registerElder.additionalInfo) {
      setFormData((prev) => ({
        ...prev,
        ...registerElder.additionalInfo,
        selectedDementiaSymptoms: prev.selectedDementiaSymptoms || [],
      }));
    }
  }, [registerElder.additionalInfo]);

  const handleInputChange = (field, value) => {
    if (field === FORM_FIELDS.DEMENTIA_SYMPTOMS) {
      // 치매 증상 선택 시
      const currentSelected = formData.selectedDementiaSymptoms || [];
      const index = currentSelected.indexOf(value);

      const newSelected =
        index === -1 ? [...currentSelected, value] : currentSelected.filter((v) => v !== value);

      const total = newSelected.reduce((sum, val) => sum + val, 0);

      updateFormData((prev) => ({
        ...prev,
        selectedDementiaSymptoms: newSelected,
        dementiaSymptom: total,
      }));
    } else if (field === FORM_FIELDS.INMATE_STATE) {
      const handler = handlers.singleSelect(field);
      handler(value);
    }
  };

  const isFormValid = () => {
    return formData.dementiaSymptom !== 0 && formData.inmateState !== 0;
  };

  return {
    formData,
    handleInputChange,
    isFormValid,
  };
};
