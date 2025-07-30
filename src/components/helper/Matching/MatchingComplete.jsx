import { Card, CardContent } from '@/components/ui/card';
import ElderProfile from '@/components/ui/InfoCard/ElderProfile';
import InfoField from '@/components/ui/InfoCard/InfoField';
import { Button } from '@/components/ui/custom/Button';
import { formatAddress } from '@/utils/formatters/formatAddress';

export default function MatchingComplete({ data = [], onDetail }) {
  if (!data || data.length === 0) {
    return (
      <div className='my-5 text-center text-gray-500'>
        <p>매칭 완료된 어르신이 없습니다.</p>
        <p className='text-sm mt-2'>새로운 매칭 요청을 확인해보세요.</p>
      </div>
    );
  }

  return (
    <>
      <section className='w-[88%] lg:w-[95%] mx-auto flex flex-col gap-5 mt-5'>
        {data.map((req) => (
          <Card key={req.patientSeq} className='px-5 pb-10 border-2'>
            <ElderProfile elderInfo={req} detailInfo={false} className='pb-0' />
            <hr />
            <CardContent className='grid gap-y-5 px-0'>
              <InfoField label='근무종류' text={req.workType} />
              <InfoField
                label='주소지'
                text={formatAddress(req.addressFirst, req.addressSecond, req.addressThird)}
              />
              <InfoField label='요양등급' text={req.careLevel} />

              <Button
                className={`w-full text-lg font-semibold h-fit p-3 lg:mt-5`}
                onClick={() => onDetail(req)}
              >
                상세 정보 보기
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
