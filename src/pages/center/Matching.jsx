import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';

import ElderSelect from '@/components/Center/RecruitInfo/ElderSelect';
import ElderInfoCheck from '@/components/Center/RecruitInfo/ElderInfoCheck';
import RecruitSetting from '@/components/Center/RecruitInfo/RecruitSetting';
import MatchingComplete from '@/components/Center/RecruitInfo/MatchingComplete';

export default function Matching() {
  const navigate = useNavigate();
  const location = useLocation();

  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  const getStep = () => {
    const sp = new URLSearchParams(location.search);
    const step = Number(sp.get('step'));
    return step && step >= 1 && step <= 4 ? step : 1;
  };

  const [curMatchingPage, setCurMatchingPage] = useState(getStep());

  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const prev = sp.get('step');
    if (String(curMatchingPage) !== prev) {
      sp.set('step', String(curMatchingPage));
      navigate({ search: `?${sp.toString()}` }, { replace: true });
    }
  }, [curMatchingPage, location.search, navigate]);

  useEffect(() => {
    setHeaderProps({
      // 총 페이지는 4개 이지만 프로그레스바는 3개만 보여줌
      // 마지막 페이지는 Header 없음
      type: curMatchingPage === 4 ? 'none' : 'back-progress',
      title: '공고 올리기',
      progress: {
        current: curMatchingPage,
        total: 3,
      },
      onBack: () => {
        if (curMatchingPage === 1) {
          navigate('/center');
        } else {
          setCurMatchingPage(curMatchingPage - 1);
        }
      },
    });

    return () => {
      clearHeaderProps();
    };
  }, [clearHeaderProps, curMatchingPage, setHeaderProps, navigate]);

  return (
    <>
      {curMatchingPage === 1 && <ElderSelect handleMatchingPage={setCurMatchingPage} />}
      {curMatchingPage === 2 && <ElderInfoCheck handleMatchingPage={setCurMatchingPage} />}
      {curMatchingPage === 3 && <RecruitSetting handleMatchingPage={setCurMatchingPage} />}
      {curMatchingPage === 4 && <MatchingComplete />}
    </>
  );
}
