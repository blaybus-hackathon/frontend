import { useState, useEffect } from 'react';
import useElderRegiStore from '@/store/center/useElderRegiStore';
import { createSelectHandlers } from '@/utils/useSelectHandler';

const FORM_FIELDS = {
  GENDER: 'gender',
  CARE_LEVEL: 'careLevel',
};

const initialFormData = {
  name: '',
  gender: 0,
  birthDate: '',
  afSeq: 0,
  asSeq: 0,
  atSeq: 0,
  weight: 0,
  disease: '',
  careLevel: 0,
};

export const useElderBasicForm = () => {
  const { registerElder, setBasicInfo } = useElderRegiStore();
  const [formData, setFormData] = useState(initialFormData);

  const updateFormData = (updater) => {
    const newData = updater(formData);
    if (!newData) return;

    setFormData(newData);
    setBasicInfo(newData);
  };

  const handlers = createSelectHandlers(updateFormData);

  useEffect(() => {
    if (registerElder.basicInfo) {
      setFormData(registerElder.basicInfo);
    }
  }, [registerElder.basicInfo]);

  const handleInputChange = (field, value) => {
    if (field === FORM_FIELDS.GENDER || field === FORM_FIELDS.CARE_LEVEL) {
      const handler = handlers.singleSelect(field);
      handler(value);
    } else {
      updateFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.gender !== 0 &&
      formData.birthDate.length === 8 &&
      formData.afSeq !== 0 &&
      formData.asSeq !== 0 &&
      formData.atSeq !== 0 &&
      formData.weight > 0 &&
      formData.disease.trim() !== '' &&
      formData.careLevel !== 0
    );
  };

  return {
    formData,
    handleInputChange,
    isFormValid,
  };
};
