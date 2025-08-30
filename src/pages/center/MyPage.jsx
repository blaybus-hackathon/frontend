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

  const { data: managerProfile, isLoading, saveManagerProfile } = useManagerProfile();
  const { isEditMode, toggleEditMode, setFormData } = useManagerProfileStore();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  useEffect(() => {
    setHeaderProps({ type: 'logo' });
    return () => clearHeaderProps();
  }, [clearHeaderProps, setHeaderProps]);

  // fallback profile image
  useEffect(() => {
    // if profile image exists, set profileSrc
    if (managerProfile?.imgAddress) {
      setProfileSrc(managerProfile.imgAddress);
    } else {
      // if profile image doesn't exist, set default profile image
      fetchDefaultImage()
        .then((url) => setProfileSrc(url))
        .catch(() => setProfileSrc(DefaultProfile));
    }
  }, [managerProfile]);

  const handleImgError = useCallback(() => {
    fetchDefaultImage()
      .then((url) => setProfileSrc(url))
      .catch(() => setProfileSrc(DefaultProfile));
  }, []);

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
