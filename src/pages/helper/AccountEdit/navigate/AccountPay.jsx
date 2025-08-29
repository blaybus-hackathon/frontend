import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/custom/Button';
import { Input } from '@/components/ui/custom/input';
import usePayStore from '@/store/suho/usePayStore';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import useHelperAccountStore from '@/store/helper/useHelperAccoutStore';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/custom/select';

const PAY_TYPES = [
  { id: 'hourly', label: '시급' },
  { id: 'daily', label: '일급' },
  { id: 'weekly', label: '주급' },
];

export default function AccountPay() {
  const navigate = useNavigate();

  const { helper, setPart } = useHelperAccountStore();

  // store에서 직접 값과 함수 가져오기
  const { pay, setPay, consult, setConsult } = usePayStore();

  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  // 로컬 상태로 관리
  const [inputPay, setInputPay] = useState(helper.wage);
  const [selectedType, setSelectedType] = useState(PAY_TYPES[helper.wageState - 1].id);

  useEffect(() => {
    setHeaderProps({
      type: 'back',
      title: '희망급여 설정',
      onBack: () => navigate(-1),
    });
    return () => {
      clearHeaderProps();
    };
  }, []);

  // PayStore의 현재 값으로 초기화

  const handlePayChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    setInputPay(rawValue);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleSave = () => {
    setPart({ wage: inputPay, wageState: PAY_TYPES.findIndex((x) => x.id === selectedType) + 1 });

    navigate('/helper/account/edit');
  };

  const handleConsultClick = () => {
    setConsult(!consult);
  };

  return (
    <main className='max-w-md mx-auto flex flex-col gap-6 h-full'>
      <section className='flex flex-col gap-8 py-10'>
        <div className='flex flex-col items-start gap-2.5 self-stretch'>
          <span className='text-xl font-bold'>
            희망하시는 급여를 입력해 주세요.
            <span className='helper-title_sub'>필수</span>
          </span>
        </div>

        <div className='w-full flex flex-row items-center gap-[10px]'>
          <div className='w-[50%]'>
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className='w-full h-[65px] border-[#C8C8C8] border rounded-[10px] items-center justify-center px-8 py-5 flex gap-8 profile-section__content-text'>
                <SelectValue placeholder='급여' />
              </SelectTrigger>
              <SelectContent>
                {PAY_TYPES.map(({ id, label }) => (
                  <SelectItem
                    key={id}
                    value={id}
                    className='text-[#191919] text-[20px] font-normal leading-none text-left'
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='profile-section__content-text flex-shrink-0'>~</div>

          <div className='w-[50%]'>
            <Input
              type='number'
              value={inputPay}
              onChange={handlePayChange}
              placeholder={`${PAY_TYPES.find((t) => t.id === selectedType)?.label}을 입력하세요`}
              className='h-[65px] flex items-center justify-center text-center profile-section__content-text border-[#C8C8C8] border rounded-[10px] px-8 py-5'
            />
          </div>
        </div>

        <div className='flex items-start w-full gap-2 profile-section__content-text'>
          <span
            onClick={handleConsultClick}
            className='inline-flex items-center gap-2 cursor-pointer'
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className=''
            >
              <rect width='29' height='29' rx='14.5' fill={consult ? '#9b4dff' : '#B6B6B6'} />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            {consult ? '협의 가능' : '협의 불가'}
          </span>
        </div>

        <Button onClick={handleSave} className='w-full' disabled={!inputPay}>
          저장하기
        </Button>
      </section>
    </main>
  );
}
