import { useEffect } from 'react';
import Profile from '@/assets/images/elder-basic-profile.png';
import { useManagerProfile } from '@/hooks/center/service/useManagerProfile';
import { useManagerProfileStore } from '@/store/center/useManagerProfileStore';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useNavigate } from 'react-router-dom';
import ManagerInfoDisplay from '@/components/Center/MyPage/ManagerInfoDisplay';
import ManagerInfoEdit from '@/components/Center/MyPage/ManagerInfoEdit';
import { Button } from '@/components/ui/custom/Button';

export default function MyPage() {
  const { data: managerProfile, isLoading, saveManagerProfile } = useManagerProfile();
  const { isEditMode, toggleEditMode, setFormData, formData } = useManagerProfileStore();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderProps({
      type: 'logo',
    });

    return () => {
      clearHeaderProps();
    };
  }, [clearHeaderProps, setHeaderProps]);

  // TODO: 로딩 컴포넌트 필요
  useEffect(() => {
    if (!isLoading && !managerProfile) {
      alert('관리자 정보를 불러오지 못했습니다.');
      navigate('/signin');
    }
  }, [isLoading, managerProfile, navigate]);

  if (isLoading || !managerProfile) return <div>Loading...</div>; //

  // save formData when edit mode is true
  const handleEditClick = () => {
    setFormData({
      ...managerProfile,
      photoFile: null,
      profileOption: managerProfile.imgSeq === null ? '2' : '1',
    });
    toggleEditMode();
  };

  const handleSubmit = async () => {
    try {
      await saveManagerProfile.mutateAsync({
        cmSeq: formData.cmSeq,
        cmPosition: formData.cmPosition,
        photoFile: formData.profileOption === '2' ? null : formData.photoFile,
        imgChangeYn:
          formData.profileOption !== formData.initialProfileOption || !!formData.photoFile,
      });
      toggleEditMode();
    } catch (e) {
      console.error(e);
    }
  };

  const getImgUrl = (imgAddress) => {
    if (!imgAddress) return null;

    const fileName = imgAddress.split('\\').pop();
    return fileName;
  };

  return (
    <article className='flex flex-col'>
      {/* 마이페이지 전체 컨테이너 */}
      <div className='flex flex-col items-center justify-between'>
        {/* 프로필 영역 */}
        <section className='flex items-center w-full gap-[1.5rem] py-[2rem]'>
          <img
            src={getImgUrl(managerProfile.imgAddress) || Profile}
            // src={managerProfile.imgAddress || Profile}
            alt='profile'
            className='w-[6.56rem] h-[6.56rem]'
          />
          <div className='flex flex-col items-start'>
            <p className='text-[1.43rem] font-bold text-[var(--black)]'>
              {managerProfile.cmName} {managerProfile.cmPosition}
            </p>
            <p className='text-[1.25rem] font-medium text-[var(--black)]'>
              {managerProfile.centerName}
            </p>
          </div>
        </section>

        <section className='w-full'>
          {isEditMode ? (
            <ManagerInfoEdit />
          ) : (
            <ManagerInfoDisplay managerProfile={managerProfile} />
          )}
        </section>
      </div>

      <section className='flex flex-col items-center mb-[2.6rem]'>
        {isEditMode || (
          <Button variant='white' onClick={handleEditClick} className={'w-full mb-5'}>
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
