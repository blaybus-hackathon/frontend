import { useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { useRecruitStore } from '@/store/center/usePatientStore';
import AddressRegister from '@/pages/AddressRegister';

export default function ElderAddress() {
  const location = useLocation();

  const setBasicInfoField = useElderRegiStore((s) => s.setBasicInfoField);
  const setRecruitField = useRecruitStore((s) => s.setRecruitField);

  // check is it from recruit
  // if state is undefined, check query params
  const isFromRecruit = useMemo(() => {
    const fromState = location.state?.from;
    const sp = new URLSearchParams(location.search);
    const fromQuery = sp.get('from');
    return fromState === 'recruit' || fromQuery === 'recruit';
  }, [location.state, location.search]);

  // helper function for update fields
  const updateRecruitFields = useCallback(
    (payload) => {
      Object.entries(payload).forEach(([k, v]) => setRecruitField(k, v));
    },
    [setRecruitField],
  );

  const updateElderFields = useCallback(
    (payload) => {
      Object.entries(payload).forEach(([k, v]) => setBasicInfoField(k, v));
    },
    [setBasicInfoField],
  );

  // handle address complete
  const handleAddressComplete = useCallback(
    ({ afSeq, asSeq, atSeq, addressLabel }) => {
      // if any value is null, return
      if (afSeq == null || asSeq == null || atSeq == null || !addressLabel) return;

      if (isFromRecruit) {
        // update recruit fields
        updateRecruitFields({
          afSeq,
          asSeq,
          atSeq,
          address: addressLabel,
        });
      } else {
        // update elder fields
        updateElderFields({
          afSeq,
          asSeq,
          atSeq,
          addressLabel,
        });
      }
    },
    [isFromRecruit, updateRecruitFields, updateElderFields],
  );

  // back path
  const backPath = useMemo(() => {
    if (location.state?.backPath) return location.state.backPath;
    return isFromRecruit ? '/center/matching' : '/center/elder-register';
  }, [isFromRecruit, location.state]);

  return (
    <AddressRegister
      backPath={backPath}
      title='나의 주소지를 등록해 주세요!'
      description={`돌봄워크가 나에게 맞는\n보호사를 소개시켜 드릴게요.`}
      onComplete={handleAddressComplete}
    />
  );
}
