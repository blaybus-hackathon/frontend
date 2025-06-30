import { useState } from 'react';

import Header from '@/components/ui/temp/Header';
import ElderSelect from '../../components/Center/RecruitInfo/ElderSelect';
import ElderInfoCheck from '../../components/Center/RecruitInfo/ElderInfoCheck';
import RecruitSetting from '../../components/Center/RecruitInfo/RecruitSetting';
import MatchingComplete from '../../components/Center/RecruitInfo/MatchingComplete';

export default function Matching() {
  const [curMatchingPage, setCurMatchingPage] = useState(1);
  return (
    <div className='main-minus-footer'>
      {curMatchingPage < 4 && (
        <Header
          title={'공고 올리기'}
          currentPage={curMatchingPage}
          totalPage={3}
          className='px-0'
        />
      )}

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
    </div>
  );
}
