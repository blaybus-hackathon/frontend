import { memo } from 'react';

export default memo(function TabPanel({
  query, // react-query 결과
  renderList, // 데이터 리스트를 렌더링하는 함수
  emptyText, // 데이터 없을 때 텍스트
  dataExtractor, // 쿼리 데이터가 복합 구조일 때 변환 함수
}) {
  // TODO: 추후 로딩, 에러 처리 추가
  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error...</div>;

  // 쿼리 데이터가 복합 구조일 때 변환 함수
  const list = dataExtractor ? dataExtractor(query.data) : query.data;

  if (!list || list.length === 0)
    return (
      <div className='flex justify-center items-center'>
        <p className='text-base font-normal text-[var(--text)]'>{emptyText}</p>
      </div>
    );

  return renderList(list, query.data);
});
