import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';

import Header from '@/components/ui/temp/Header';
import ElderSelect from '@/components/Center/RecruitInfo/ElderSelect';
import ElderInfoCheck from '@/components/Center/RecruitInfo/ElderInfoCheck';
import RecruitSetting from '@/components/Center/RecruitInfo/RecruitSetting';
import MatchingComplete from '@/components/Center/RecruitInfo/MatchingComplete';

export default function Matching() {
  const navigate = useNavigate();
  const [curMatchingPage, setCurMatchingPage] = useState(1);

  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

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
          navigate('/');
        } else {
          setCurMatchingPage(curMatchingPage - 1);
        }
      },
    });

    return () => {
      clearHeaderProps();
    };
  }, [clearHeaderProps, curMatchingPage, setHeaderProps]);

  return (
    <>
      {curMatchingPage === 1 && (
        <ElderSelect
          handleMatchingPage={(pg) => {
            setCurMatchingPage(pg);
          }}
        />
      )}
      {curMatchingPage === 2 && (
        <ElderInfoCheck
          handleMatchingPage={(updatePn) => {
            setCurMatchingPage(updatePn);
          }}
        />
      )}
      {curMatchingPage === 3 && (
        <RecruitSetting
          handleMatchingPage={(updatePn) => {
            setCurMatchingPage(updatePn);
          }}
        />
      )}
      {curMatchingPage === 4 && (
        <MatchingComplete
          handleMatchingPage={(updatePn) => {
            setCurMatchingPage(updatePn);
          }}
        />
      )}
    </>
  );
}
