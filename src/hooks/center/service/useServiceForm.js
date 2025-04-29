import { useState } from 'react';
import { useElderRegiStore } from '@/store/center/useElderRegiStore';

const initialFormData = {
  serviceMeal: 0,
  serviceToilet: 0,
  serviceMobility: 0,
  serviceDaily: 0,
  selectedMeals: [],
  selectedToilet: [],
  selectedMobility: [],
  selectedDaily: [],
};

const serviceFieldMap = {
  selectedMeals: { selectedKey: 'selectedMeals', totalKey: 'serviceMeal' },
  selectedToilet: { selectedKey: 'selectedToilet', totalKey: 'serviceToilet' },
  selectedMobility: { selectedKey: 'selectedMobility', totalKey: 'serviceMobility' },
  selectedDaily: { selectedKey: 'selectedDaily', totalKey: 'serviceDaily' },
};

export const useServiceForm = () => {
  const { setService } = useElderRegiStore();
  const [formData, setFormData] = useState(initialFormData);

  const updateFormData = (updater) => {
    const newData = updater(formData);
    if (!newData) return;

    setFormData(newData);

    const backendData = {
      serviceMeal: newData.serviceMeal,
      serviceToilet: newData.serviceToilet,
      serviceMobility: newData.serviceMobility,
      serviceDaily: newData.serviceDaily,
    };

    setService(backendData);
  };

  const handleInputChange = (field, value) => {
    const data = serviceFieldMap[field];
    if (!data) return;

    const currentSelected = formData[data.selectedKey] || [];
    const index = currentSelected.indexOf(value);

    const newSelected =
      index === -1 ? [...currentSelected, value] : currentSelected.filter((v) => v !== value);

    const total = newSelected.reduce((sum, val) => sum + val, 0);

    updateFormData((prev) => ({
      ...prev,
      [data.selectedKey]: newSelected,
      [data.totalKey]: total,
    }));
  };

  const isFormValid = () => {
    return (
      formData.serviceMeal > 0 &&
      formData.serviceToilet > 0 &&
      formData.serviceMobility > 0 &&
      formData.serviceDaily > 0
    );
  };

  return { formData, handleInputChange, isFormValid };
};
