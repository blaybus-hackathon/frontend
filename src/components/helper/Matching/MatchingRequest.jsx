import { Card, CardContent } from '@/components/ui/card';
import ElderProfile from '@/components/ui/InfoCard/ElderProfile';
import InfoField from '@/components/ui/InfoCard/InfoField';
import { Button } from '@/components/ui/custom/Button';
import { formatAddress } from '@/utils/formatters/formatAddress';

export default function MatchingRequest({ data = [], onDetail }) {
  if (!data || data.length === 0) {
    return <div className='my-5 text-center text-gray-500'>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <>
      <section className='w-[88%] lg:w-[95%] mx-auto flex flex-col gap-5 mt-5'>
        {data.map((req) => (
          <Card key={req.patientSeq} className='px-5 border-2'>
            <ElderProfile elderInfo={req} detailInfo={false} className='pb-0' />
            <hr />
            <CardContent className='grid gap-y-5 px-0'>
              <InfoField label='근무종류' text={req.workType} />
              <InfoField
                label='주소지'
                text={formatAddress(req.addressFirst, req.addressSecond, req.addressThird)}
              />
              <Button
                className={`w-full text-lg font-semibold h-fit p-3 lg:mt-5`}
                onClick={() => onDetail(req)}
              >
                자세히 보기
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
