import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { Search, ArrowUpLeft } from 'lucide-react';
import { useSignUpStore } from '@/store/auth/center/useSignUpStore';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useCenterList } from '@/hooks/center/service/useCenterList';
import { Button } from '@/components/ui/custom/Button';
import SignUpButton from '@/components/Auth/SignUp/center/SignUpButton';

function CenterListComponent({ center }) {
  const navigate = useNavigate();
  const setCenterInfo = useSignUpStore((state) => state.setPersonalInfoField);

  return (
    <button
      className='flex flex-col gap-2 text-start w-full cursor-pointer border-b-[#f1f1f1] border-b-1 pb-2'
      onClick={() => {
        setCenterInfo('centerSeq', center.centerSeq);
        setCenterInfo('centerName', center.centerName);
        navigate('/center/signup');
      }}
    >
      <h3 className='text-[var(--text)] text-xl font-normal'>{center.centerName}</h3>
      <div className='flex'>
        <span className='text-[var(--main)] text-base font-normal'>도로명&nbsp;</span>
        <span className='text-[var(--placeholder-gray)] text-base font-normal'>
          {center.centerAddress}
        </span>
      </div>
    </button>
  );
}

export default function SearchCenter() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText);
  const { data: centerList = [] } = useCenterList({ searchName: debouncedSearchText });

  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  useEffect(() => {
    setHeaderProps({
      type: 'back',
      title: '소속센터 설정',
      onBack: () => navigate('/center/signup'),
    });

    return () => {
      clearHeaderProps();
    };
  }, [setHeaderProps, clearHeaderProps, navigate]);

  return (
    <div className='flex flex-col gap-10 mt-8'>
      {/* Search */}
      <div className='flex items-center relative'>
        <input
          type='text'
          placeholder='센터 이름을 검색해주세요.'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='w-full border-b-[var(--main)] border-b-2 pb-[0.88rem] outline-none text-[var(--text)]'
        />
        <Search className='absolute strple right-4 top-0 text-[var(--main)]' strokeWidth={3} />
      </div>

      {/* Search Result */}
      <div className='flex flex-col gap-4 overflow-y-auto h-[50vh]'>
        {centerList.length === 0 ? (
          <div className='flex flex-col gap-15'>
            <p className='text-[var(--text)] text-lg font-normal text-center pt-10'>
              검색 결과가 존재하지 않습니다.
            </p>
            <div className='flex flex-col gap-2'>
              <p className='text-[var(--placeholder-gray)] text-base font-normal text-center'>
                찾으시는 센터가 없으신가요?
              </p>
              <Button
                variant='white'
                className='mx-auto text-lg font-normal p-3 flex items-center justify-center gap-1 w-fit'
                onClick={() => navigate('/center/register')}
              >
                <ArrowUpLeft className='mt-1/2 w-6 h-6 text-[var(--main)]' />
                센터 등록하러 가기
              </Button>
            </div>
          </div>
        ) : (
          centerList.map((center) => <CenterListComponent key={center.centerSeq} center={center} />)
        )}
      </div>

      <SignUpButton />
    </div>
  );
}
