import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/custom/Button';
import { formatAddress } from '@/utils/formatters/formatAddress';
import InfoCard from '@/components/ui/InfoCard/InfoCard';
import ElderProfile from '@/components/ui/InfoCard/ElderProfile';
import HelperProfile from '@/components/ui/InfoCard/HelperProfile';

export default (function MatchingCompleted({ data }) {
  const navigate = useNavigate();
  const fullAddress = formatAddress(data.addressFirst, data.addressSecond, data.addressThird);
  const helperList = data.matchFinHelperInfoList || [];
  const hasHelpers = helperList.length > 0;

  return (
    <InfoCard className='my-5 lg:my-8'>
      <ElderProfile
        elderInfo={{
          ...data,
          fullAddress,
        }}
        detailInfo
      />

      {/* 요양보호사 */}
      <section className='flex flex-col gap-y-3 pt-10'>
        <h3 className='text-start text-lg font-semibold text-[var(--text)] lg:text-xl'>
          매칭이 완료되었어요!
        </h3>
        <hr className='border-[var (--outline)]' />

        {hasHelpers ? (
          <div className='space-y-3'>
            {helperList.map((helper) => (
              // TODO: 채팅방으로 이동
              <HelperProfile
                key={helper.helperSeq}
                helperInfo={helper}
                renderButton={() => (
                  <Button
                    variant='white'
                    className='w-fit h-fit px-3.5 py-2 shrink-0 text-base lg:text-lg font-semibold'
                  >
                    채팅하기
                  </Button>
                )}
              />
            ))}
          </div>
        ) : (
          <p className='pt-3 text-[var(--text-sub)] text-base lg:text-lg'>
            현재 매칭 완료된 요양보호사가 존재하지 않습니다.
          </p>
        )}
      </section>

      <section className='flex justify-end -mb-2 lg:-mb-4'>
        <Button
          variant='link'
          className='w-fit text-[var(--text)] cursor-pointer font-medium text-base hover:text-[var(--main)]'
          onClick={() => navigate('/center/recruit/detail')}
        >
          어르신 정보 수정하기
        </Button>
      </section>
    </InfoCard>
  );
});
