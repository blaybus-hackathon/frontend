import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchStatusMutation } from '@/hooks/center/service/useMatchList';
import { formatAddress } from '@/utils/formatters/formatAddress';
import { MATCH_STATE } from '@/constants/matching';
import { handleApiError } from '@/utils/handleApiError';
import { Button } from '@/components/ui/custom/Button';
import InfoCard from '@/components/ui/InfoCard/InfoCard';
import ElderProfile from '@/components/ui/InfoCard/ElderProfile';
import HelperProfile from '@/components/ui/InfoCard/HelperProfile';

export default memo(function MatchingInProgress({ data }) {
  const navigate = useNavigate();
  const fullAddress = formatAddress(data.addressFirst, data.addressSecond, data.addressThird);
  const [hovered, setHovered] = useState(null);

  // helper list by state
  const accepted = data.permitTuneHelperInfoList || []; // 수락됨(채팅 중)
  const requested = data.matchRequestHelperInfoList || []; // 요청 완료
  const rejected = data.rejectHelperInfoList || []; // 거절됨

  const totalHelpers = accepted.length + requested.length + rejected.length;
  const hasHelpers = totalHelpers > 0;

  const matchStatusMutation = useMatchStatusMutation({
    optimisticUpdate: false,
  });

  const handleCancelMatch = useCallback(
    async (helper) => {
      try {
        await matchStatusMutation.mutateAsync({
          patientLogSeq: data.patientLogSeq,
          helperSeq: helper.helperSeq,
          matchState: MATCH_STATE.REJECT,
        });
      } catch (error) {
        handleApiError(error, '매칭 취소 중 오류가 발생했습니다. 다시 시도해주세요.', true, false);
      }
    },
    [matchStatusMutation, data.patientLogSeq],
  );

  // TODO: 채팅방으로 이동하는 로직 추가
  const goToChat = (roomId) => {
    navigate(`/chatroom/${roomId}`);
  };

  // render helper section
  const renderHelperSection = (helpers, type) => {
    if (helpers.length === 0) return null;

    return helpers.map((helper) => {
      const isCurrentlyLoading =
        matchStatusMutation.isPending &&
        matchStatusMutation.variables?.helperSeq === helper.helperSeq;
      let renderButton = null;

      switch (type) {
        case 'accepted':
          renderButton = () => (
            <Button
              variant='white'
              className='w-fit h-fit px-3.5 py-2 shrink-0 font-semibold text-base lg:text-lg'
              onClick={() => goToChat(helper)}
            >
              <span>채팅하기</span>
            </Button>
          );
          break;

        case 'requested':
          renderButton = () => (
            <div
              onMouseEnter={() => setHovered(helper.helperSeq)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === helper.helperSeq ? (
                <Button
                  onClick={() => handleCancelMatch(helper)}
                  variant='outline'
                  disabled={isCurrentlyLoading}
                  className={`w-fit h-fit px-3.5 py-2 shrink-0 font-semibold text-base lg:text-lg hover:text-[var(--required-red)] hover:bg-white transition-all duration-200 hover:border-[var(--required-text)]`}
                >
                  {isCurrentlyLoading ? '취소 중' : '매칭 취소하기'}
                </Button>
              ) : (
                <Button
                  variant='white'
                  className='w-fit h-fit px-3.5 py-2 shrink-0 font-semibold text-base lg:text-lg'
                >
                  확인 대기 중
                </Button>
              )}
            </div>
          );
          break;

        case 'rejected':
          renderButton = () => (
            <Button
              variant='disabled'
              className={`w-fit h-fit px-3.5 py-2 shrink-0 font-semibold text-base lg:text-lg bg-white cursor-default text-[var(--required-red)] border-none`}
            >
              매칭 거절됨
            </Button>
          );
          break;
      }

      return (
        <div key={`${type}-${helper.helperSeq}`}>
          <HelperProfile helperInfo={helper} renderButton={renderButton} />
        </div>
      );
    });
  };

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
          매칭을 수락했어요!
        </h3>
        <hr className='border-[var(--outline)]' />

        {hasHelpers ? (
          <div className='space-y-5'>
            {/* 수락됨 (채팅 가능) */}
            {renderHelperSection(accepted, 'accepted')}

            {/* 요청됨 (확인 대기중) */}
            {renderHelperSection(requested, 'requested')}

            {/* 거절됨 */}
            {renderHelperSection(rejected, 'rejected')}
          </div>
        ) : (
          <p className='pt-3 text-[var(--text-sub)] text-base lg:text-lg'>
            현재 진행중인 매칭이 없습니다.
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
