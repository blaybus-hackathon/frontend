import Header from '@/components/ui/temp/Header';
import { Input } from '@/components/ui/custom/input';
import Profile from '@/assets/images/elder-basic-profile.png';

const FormField = ({ label, required, children }) => (
  <section className='flex justify-start flex-col pb-7'>
    <div className='flex items-center mb-[1.25rem]'>
      <span className='sub-title'>{label}</span>
      {required && <span className='required-text'>필수</span>}
    </div>
    {children}
  </section>
);

export default function MyPage() {
  const { userInfo, isEditMode, handleInputChange, handleEdit, handleSave, handleLogout } =
    useUserInfo({
      name: '김길동 주임',
      center: '강동구청 어르신 케어센터',
      position: '주임',
    });

  return (
    <div className='h-screen max-w-2xl mx-auto'>
      <Header variant='simple' />
      <div className='pt-[1.88rem] bg-[#f5f5f5]'>
        <div className='flex items-center justify-between bg-white'>
          <div className='w-[88%] py-[2.7rem]'>
            <seciton>
              <img src={Profile} alt='profile' />
              <div>
                <p>김길동 주임</p>
                <p>강동구청 어르신 케어센터</p>
              </div>
            </seciton>
            <FormField label='소속 센터'>
              <input></input>
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );
}
