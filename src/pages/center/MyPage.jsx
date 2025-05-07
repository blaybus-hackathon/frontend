import Header from '@/components/ui/temp/Header';
import Profile from '@/assets/images/elder-basic-profile.png';
import { useManagerProfile } from '@/hooks/center/service/useManagerProfile';
import { useManagerProfileStore } from '@/store/center/useManagerProfileStore';
import { useNavigate } from 'react-router-dom';
import MaganerInfoDisplay from '@/components/Center/MyPage/MaganerInfoDisplay';
import { Button } from '@/components/ui/custom/button';

export default function MyPage() {
  const { data: managerProfile, isLoading } = useManagerProfile();
  const { isEditMode, toggleEditMode, setFormData, resetFormData } = useManagerProfileStore();
  const navigate = useNavigate();

  // TODO: 로딩 컴포넌트 필요
  if (isLoading) return <div>Loading...</div>;
  if (!managerProfile) {
    alert('관리자 정보를 불러오지 못했습니다.');
    navigate('/signin');
  }

  // save formData when edit mode is true
  const handleEditClick = () => {
    setFormData(managerProfile);
    toggleEditMode();
  };

  return (
    <div className='h-screen max-w-2xl mx-auto'>
      <Header variant='logo' hasBorder={false} />
      {/* 헤더 밑 공간 */}
      <div className='pt-[1.88rem] bg-[#f5f5f5]'>
        {/* 마이페이지 전체 컨테이너 */}
        <div className='flex items-center justify-between bg-white'>
          {/* 하단 넓이 */}
          <div className='w-[88%] mx-auto'>
            {/* 프로필 영역 */}
            <seciton className='flex items-center w-full gap-[1.5rem] py-[2rem]'>
              <img src={Profile} alt='profile' className='w-[6.56rem] h-[6.56rem]' />
              <div className='flex flex-col items-start'>
                <p className='text-[1.43rem] font-bold text-[var(--black)]'>
                  {managerProfile.cmName} {managerProfile.cmPosition}
                </p>
                <p className='text-[1.25rem] font-medium text-[var(--black)]'>
                  {managerProfile.centerName}
                </p>
              </div>
            </seciton>
            {isEditMode ? (
              <MaganerInfoDisplay managerProfile={managerProfile} />
            ) : (
              <MaganerInfoDisplay managerProfile={managerProfile} />
            )}

            <section className='flex flex-col items-center mb-[2.6rem]'>
              {isEditMode || (
                <Button variant='white' onClick={handleEditClick} className={'w-full mb-5'}>
                  로그아웃
                </Button>
              )}
              <Button onClick={isEditMode ? undefined : handleEditClick} className={'w-full'}>
                {isEditMode ? '저장하기' : '수정하기'}
              </Button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
