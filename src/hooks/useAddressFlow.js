import { useState, useEffect, useCallback } from 'react';
import { useAddressSelection } from '@/store/useAddressStore';

export function useAddressFlow() {
  const {
    firstAddressList,
    secondAddressList,
    thirdAddressList,
    selectedAfSeq, // selected first address id
    selectedAsSeq, // selected second address id
    selectedAtSeq, // selected third address id
    fetchFirstAddressList,
    fetchSecondAddressList,
    fetchThirdAddressList,
    setSelectedAfSeq,
    setSelectedAsSeq,
    setSelectedAtSeq,
  } = useAddressSelection();

  const [step, setStep] = useState(1);

  // load first address list when component mounts
  useEffect(() => {
    fetchFirstAddressList();
  }, [fetchFirstAddressList]);

  // guard: if previous step undefined, go to prev step
  useEffect(() => {
    if (step === 2 && !selectedAfSeq) {
      setStep(1);
    }
    if (step === 3 && (!selectedAfSeq || !selectedAsSeq)) {
      setStep(selectedAfSeq ? 2 : 1);
    }
  }, [step, selectedAfSeq, selectedAsSeq]);

  // load address list when previous address is selected
  const handleSelectFirstAddress = useCallback(
    async (afSeq) => {
      setSelectedAfSeq(afSeq);
      await fetchSecondAddressList(afSeq);
      setStep(2);
    },
    [fetchSecondAddressList, setSelectedAfSeq],
  );

  const handleSelectSecondAddress = useCallback(
    async (asSeq) => {
      setSelectedAsSeq(asSeq);
      await fetchThirdAddressList(asSeq);
      setStep(3);
    },
    [fetchThirdAddressList, setSelectedAsSeq],
  );

  const handleSelectThirdAddress = useCallback(
    async (atSeq) => {
      setSelectedAtSeq(atSeq);
    },
    [setSelectedAtSeq],
  );

  const stepButtons = {
    1: {
      list: firstAddressList,
      selectedId: selectedAfSeq,
      onClick: handleSelectFirstAddress,
    },
    2: {
      list: secondAddressList,
      selectedId: selectedAsSeq,
      onClick: handleSelectSecondAddress,
    },
    3: {
      list: thirdAddressList,
      selectedId: selectedAtSeq,
      onClick: handleSelectThirdAddress,
    },
  };

  return { step, setStep, stepButtons };
}
