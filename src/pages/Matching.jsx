import { useState } from 'react';

import Header from '@/components/Header';
import MatchingManage from './MatchingManage';
import MatchingManage2 from './MatchingManage2';
import MatchingManage3 from './MatchingManage3';
import MatchingComplete from './MatchingComplete';

export default function Matching() {
  const [curMatchingPage, setCurMatchingPage] = useState(1);
  return (
    <>
      <Header title={'공고 올리기'} />
      {curMatchingPage === 1 && (
        <MatchingManage
          handleMatchingPage={(pg) => {
            setCurMatchingPage(pg);
          }}
        />
      )}
      {curMatchingPage === 2 && (
        <MatchingManage2
          handleMatchingPage={(updatePn) => {
            setCurMatchingPage(updatePn);
          }}
        />
      )}
      {curMatchingPage === 3 && (
        <MatchingManage3
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
