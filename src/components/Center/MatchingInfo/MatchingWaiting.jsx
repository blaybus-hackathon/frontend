import { memo, useState, useCallback, useEffect } from 'react';
import { useMatchStatusMutation } from '@/hooks/center/service/useMatchList';
import { Button } from '@/components/ui/custom/Button';
import { formatAddress } from '@/utils/format';
import { MATCH_STATE } from '@/constants/matching';
import InfoCard from '@/components/ui/InfoCard/InfoCard';
import ElderProfile from '@/components/ui/InfoCard/ElderProfile';
import HelperProfile from '@/components/ui/InfoCard/HelperProfile';

export default memo(function MatchingWaiting({ data, isLoading: parentLoading }) {
  const fullAddress = formatAddress(data.addressFirst, data.addressSecond, data.addressThird);
  const helperList = data.initHelperInfoList || [];
  const hasHelpers = helperList.length > 0;

  // track requested helpers locally
  const [requestedHelpers, setRequestedHelpers] = useState(new Set());

  // initialize local requested helpers from server
  useEffect(() => {
    if (data.requestedHelpers?.length > 0) {
      setRequestedHelpers(new Set(data.requestedHelpers));
    }
  }, [data.requestedHelpers]);

  // update local state when match request succeds
  const handleLocalUpdate = useCallback(({ helperSeq }) => {
    setRequestedHelpers((prev) => new Set(prev).add(helperSeq));
  }, []);

  const matchStatusMutation = useMatchStatusMutation({
    optimisticUpdate: false,
    onLocalUpdate: handleLocalUpdate,
  });

  const handleMatchRequest = useCallback(
    async (helper) => {
      // ignore if already requested
      if (requestedHelpers.has(helper.helperSeq)) return;

      try {
        await matchStatusMutation.mutateAsync({
          patientLogSeq: data.patientLogSeq,
          helperSeq: helper.helperSeq,
          matchState: MATCH_STATE.MATCH_REQUEST,
        });
      } catch (error) {
        // rollback local state
        setRequestedHelpers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(helper.helperSeq);
          return newSet;
        });
        console.error('매칭 요청 실패: ', error);
      }
    },
    [requestedHelpers, matchStatusMutation, data.patientLogSeq],
  );

  // check if helper has already been requested
  const isHelperRequested = useCallback(
    (helperSeq) => requestedHelpers.has(helperSeq),
    [requestedHelpers],
  );

  // overall loading state
  const isLoading = parentLoading || matchStatusMutation.isPending;

  return (
    <InfoCard className='my-5 lg:my-8'>
      <ElderProfile
        elderInfo={{
          ...data,
          fullAddress,
        }}
        detailInfo
      />

      {/* helper */}
      <section className='flex flex-col gap-y-3 pt-10'>
        <h3 className='text-start text-lg font-semibold text-[var(--text)] lg:text-xl'>
          요양보호사 {helperList.length}명 매칭
        </h3>
        <hr className='border-[var (--outline)]' />

        {hasHelpers ? (
          <div className='space-y-3'>
            {helperList.map((helper) => {
              const isRequested = isHelperRequested(helper.helperSeq);
              const isCurrentlyLoading =
                matchStatusMutation.isPending &&
                matchStatusMutation.variables?.helperSeq === helper.helperSeq;

              return (
                <HelperProfile
                  key={helper.helperSeq}
                  helperInfo={helper}
                  renderButton={() =>
                    isRequested ? (
                      <Button className='w-fit h-fit px-3.5 py-2 shrink-0 bg-[var(--main)] rounded-[0.625rem] text-white cursor-default font-semibold text-base lg:text-lg'>
                        매칭 요청함
                      </Button>
                    ) : (
                      <Button
                        variant='white'
                        onClick={() => handleMatchRequest(helper)}
                        disabled={isLoading}
                        className='w-fit h-fit px-3.5 py-2 shrink-0 hover:bg-[var(--main)] hover:text-white transition-colors duration-200 text-base font-semibold lg:text-lg'
                      >
                        {/* loading */}
                        {isCurrentlyLoading ? '요청 중' : '매칭 요청하기'}
                      </Button>
                    )
                  }
                />
              );
            })}
          </div>
        ) : (
          <p className='pt-3 text-[var(--text-sub)] text-base lg:text-lg'>
            현재 추천된 요양보호사가 존재하지 않습니다.
          </p>
        )}
      </section>

      <section className='flex justify-end -mb-2 lg:-mb-4'>
        {/* TODO: 어르신 정보 수정하기   */}
        <Button
          variant='link'
          className='w-fit text-[var(--text)] cursor-pointer font-medium text-base hover:text-[var(--main)]'
        >
          어르신 정보 수정하기
        </Button>
      </section>
    </InfoCard>
  );
});
