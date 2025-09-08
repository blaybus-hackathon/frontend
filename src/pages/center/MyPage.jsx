import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/custom/Button';
import Spinner from '@/components/loading/Spinner';
import { handleApiError } from '@/utils/handleApiError';

import { useManagerProfile } from '@/hooks/center/service/useManagerProfile';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useManagerProfileStore } from '@/store/center/useManagerProfileStore';
import { fetchDefaultImage } from '@/utils/fetchDefaultImage';

import ManagerInfoDisplay from '@/components/Center/MyPage/ManagerInfoDisplay';
import ManagerInfoEdit from '@/components/Center/MyPage/ManagerInfoEdit';
import DefaultProfile from '@/assets/images/elder-basic-profile.png';

export default function MyPage() {
  const navigate = useNavigate();
  const [profileSrc, setProfileSrc] = useState(DefaultProfile);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    componentMountTime: null,
    dataLoadStartTime: null,
    dataLoadEndTime: null,
    imageLoadStartTime: null,
    imageLoadEndTime: null,
  });

  const { data: managerProfile, isLoading, saveManagerProfile } = useManagerProfile();
  const { isEditMode, toggleEditMode, setFormData } = useManagerProfileStore();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  // 컴포넌트 마운트 시간 측정
  useEffect(() => {
    const mountTime = performance.now();
    setPerformanceMetrics((prev) => ({ ...prev, componentMountTime: mountTime }));
    console.log('🚀 MyPage 컴포넌트 마운트 시작');

    setHeaderProps({ type: 'logo' });
    return () => clearHeaderProps();
  }, [clearHeaderProps, setHeaderProps]);

  // React Query 데이터 로딩 상태 추적
  useEffect(() => {
    if (!isLoading && managerProfile) {
      const dataLoadEndTime = performance.now();
      setPerformanceMetrics((prev) => ({
        ...prev,
        dataLoadEndTime,
        dataLoadStartTime: prev.dataLoadStartTime || prev.componentMountTime,
      }));

      const dataLoadTime = (prev) =>
        prev.dataLoadEndTime && prev.dataLoadStartTime
          ? (prev.dataLoadEndTime - prev.dataLoadStartTime).toFixed(2)
          : 'N/A';

      console.log('📊 React Query 데이터 로딩 완료:', {
        isLoading,
        hasData: !!managerProfile,
        dataSource: 'cache', // react-query 캐시에서 가져온 경우
        loadTime: dataLoadTime(performanceMetrics),
      });
    }
  }, [isLoading, managerProfile, performanceMetrics]);

  // 프로필 이미지 로딩 및 성능 측정
  useEffect(() => {
    if (!managerProfile) return;

    const imageLoadStartTime = performance.now();
    setPerformanceMetrics((prev) => ({ ...prev, imageLoadStartTime }));
    console.log('🖼️ 프로필 사진 로딩 시작');

    // if profile image exists, set profileSrc
    if (managerProfile?.imgAddress) {
      console.log('📸 기존 프로필 이미지 사용:', managerProfile.imgAddress);
      setProfileSrc(managerProfile.imgAddress);
      const imageLoadEndTime = performance.now();
      setPerformanceMetrics((prev) => ({ ...prev, imageLoadEndTime }));

      const imageLoadTime = (imageLoadEndTime - imageLoadStartTime).toFixed(2);
      console.log(`⚡ 프로필 사진 로딩 완료 (기존 이미지): ${imageLoadTime}ms`);

      // 전체 성능 메트릭 출력
      logPerformanceMetrics();
    } else {
      // if profile image doesn't exist, set default profile image
      console.log('🔄 기본 프로필 이미지 로딩 중...');
      fetchDefaultImage()
        .then((url) => {
          setProfileSrc(url);
          const imageLoadEndTime = performance.now();
          setPerformanceMetrics((prev) => ({ ...prev, imageLoadEndTime }));

          const imageLoadTime = (imageLoadEndTime - imageLoadStartTime).toFixed(2);
          console.log(`⚡ 프로필 사진 로딩 완료 (기본 이미지): ${imageLoadTime}ms`);
          console.log('📸 기본 이미지 URL:', url);

          // 전체 성능 메트릭 출력
          logPerformanceMetrics();
        })
        .catch(() => {
          setProfileSrc(DefaultProfile);
          const imageLoadEndTime = performance.now();
          setPerformanceMetrics((prev) => ({ ...prev, imageLoadEndTime }));

          const imageLoadTime = (imageLoadEndTime - imageLoadStartTime).toFixed(2);
          console.log(`⚡ 프로필 사진 로딩 완료 (fallback): ${imageLoadTime}ms`);
          console.log('⚠️ 기본 이미지 로딩 실패, fallback 이미지 사용');

          // 전체 성능 메트릭 출력
          logPerformanceMetrics();
        });
    }
  }, [managerProfile]);

  // 전체 성능 메트릭 로깅 함수
  const logPerformanceMetrics = () => {
    const metrics = performanceMetrics;
    const now = performance.now();

    console.group('📈 전체 성능 메트릭');
    console.log(
      '🚀 컴포넌트 마운트 시간:',
      metrics.componentMountTime ? `${(now - metrics.componentMountTime).toFixed(2)}ms` : 'N/A',
    );
    console.log(
      '📊 데이터 로딩 시간:',
      metrics.dataLoadEndTime && metrics.dataLoadStartTime
        ? `${(metrics.dataLoadEndTime - metrics.dataLoadStartTime).toFixed(2)}ms`
        : 'N/A',
    );
    console.log(
      '🖼️ 이미지 로딩 시간:',
      metrics.imageLoadEndTime && metrics.imageLoadStartTime
        ? `${(metrics.imageLoadEndTime - metrics.imageLoadStartTime).toFixed(2)}ms`
        : 'N/A',
    );
    console.log(
      '⚡ 총 로딩 시간:',
      metrics.componentMountTime ? `${(now - metrics.componentMountTime).toFixed(2)}ms` : 'N/A',
    );
    console.groupEnd();
  };

  const handleImgError = useCallback(() => {
    const startTime = performance.now();
    console.log('❌ 이미지 로딩 에러 발생, 대체 이미지 로딩 시작');

    fetchDefaultImage()
      .then((url) => {
        setProfileSrc(url);
        const endTime = performance.now();
        console.log(`⚡ 대체 이미지 로딩 완료: ${(endTime - startTime).toFixed(2)}ms`);
        console.log('📸 대체 이미지 URL:', url);

        // 에러 복구 후 성능 메트릭 업데이트
        setPerformanceMetrics((prev) => ({
          ...prev,
          imageLoadEndTime: endTime,
          imageLoadStartTime: startTime,
        }));
        logPerformanceMetrics();
      })
      .catch(() => {
        setProfileSrc(DefaultProfile);
        const endTime = performance.now();
        console.log(`⚡ fallback 이미지 로딩 완료: ${(endTime - startTime).toFixed(2)}ms`);
        console.log('⚠️ 대체 이미지 로딩도 실패, 최종 fallback 이미지 사용');

        // 에러 복구 후 성능 메트릭 업데이트
        setPerformanceMetrics((prev) => ({
          ...prev,
          imageLoadEndTime: endTime,
          imageLoadStartTime: startTime,
        }));
        logPerformanceMetrics();
      });
  }, [performanceMetrics]);

  // if profile data doesn't exist, redirect to signin page
  useEffect(() => {
    if (!isLoading && !managerProfile) {
      handleApiError(
        { response: { status: 404, data: { code: 4008 } } },
        {
          4008: '로그인 정보가 없습니다. 다시 로그인해주세요.',
          7000: '관리자 권한이 없습니다.',
        },
        '관리자 정보를 불러오지 못했습니다.',
        true,
        false,
      );
      navigate('/signin', { replace: true });
    }
  }, [isLoading, managerProfile, navigate]);

  // hydrate form data
  useEffect(() => {
    if (!isLoading && managerProfile) {
      setFormData((prev) => ({
        ...managerProfile,
        photoFile: prev?.photoFile ?? null,
        profileOption: managerProfile.imgSeq ? '1' : '2',
        imgChangeYn: false,
      }));
    }
  }, [isLoading, managerProfile, setFormData]);

  // enter edit mode
  const handleEditClick = () => {
    setFormData({
      ...managerProfile,
      profileOption: managerProfile?.imgSeq ? '1' : '2',
      photoFile: null,
      imgChangeYn: false,
    });
    toggleEditMode();
  };

  // submit form data
  const handleSubmit = async () => {
    try {
      const { formData } = useManagerProfileStore.getState();
      const submitData = formData || managerProfile;

      await saveManagerProfile.mutateAsync({
        cmSeq: submitData.cmSeq || managerProfile.cmSeq,
        cmPosition: submitData.cmPosition || managerProfile.cmPosition,
        photoFile: submitData.photoFile,
        profileOption: submitData.profileOption || (managerProfile.imgSeq ? '1' : '2'),
        imgChangeYn: !!(submitData.imgChangeYn || false),
      });

      toggleEditMode();
    } catch (e) {
      handleApiError(
        e,
        {
          4008: '로그인 정보가 없습니다. 다시 로그인해주세요.',
          7000: '관리자 권한이 없습니다.',
          7001: '프로필 수정 권한이 없습니다.',
          5000: '서버 오류가 발생했습니다.',
          6000: '이미지 업로드 중 오류가 발생했습니다.',
          6001: '삭제할 이미지 파일을 찾을 수 없습니다.',
          6002: '한 개의 이미지만 업로드 할 수 있습니다.',
          6003: '이미지를 등록할 수 없습니다.',
        },
        '프로필 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        true,
        true,
      );
    }
  };

  if (isLoading || !managerProfile) return <Spinner />;

  console.log('📊 현재 프로필 사진 상태:', {
    profileSrc,
    hasManagerProfile: !!managerProfile,
    hasImgAddress: !!managerProfile?.imgAddress,
    imgSeq: managerProfile?.imgSeq,
    reactQueryStatus: {
      isLoading,
      isFetching: false, // react-query의 isFetching 상태도 확인 가능
      dataSource: 'cache', // 캐시에서 가져온 데이터인지 확인
    },
    zustandState: {
      isEditMode,
      hasFormData: !!useManagerProfileStore.getState().formData,
    },
  });

  return (
    <article className='flex flex-col'>
      {/* profile header */}
      <section className='flex items-center w-full gap-6 py-8'>
        <img
          src={profileSrc}
          alt='profile'
          className='w-[6.56rem] h-[6.56rem]'
          onError={handleImgError}
        />
        <div className='flex flex-col text-start'>
          {managerProfile && (
            <>
              <p className='text-xl font-bold text-[var(--black)]'>
                {managerProfile.cmName} {managerProfile.cmPosition}
              </p>
              <p className='text-lg font-medium text-[var(--black)]'>{managerProfile.centerName}</p>
            </>
          )}
        </div>
      </section>

      {/* profile info */}
      <section className='flex flex-col w-full overflow-y-auto space-y-6 lg:space-y-8'>
        {isEditMode ? (
          <ManagerInfoEdit managerProfile={managerProfile} />
        ) : (
          <ManagerInfoDisplay managerProfile={managerProfile} />
        )}
      </section>

      {/* buttons */}
      <section className='flex flex-col items-center my-10 gap-5'>
        {isEditMode || (
          // TODO: 로그아웃 기능 추가
          <Button
            variant='white'
            onClick={() => navigate('/signin', { replace: true })}
            className={'w-full'}
          >
            로그아웃
          </Button>
        )}
        <Button onClick={isEditMode ? handleSubmit : handleEditClick} className={'w-full'}>
          {isEditMode ? '저장하기' : '수정하기'}
        </Button>
      </section>
    </article>
  );
}
