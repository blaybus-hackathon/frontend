import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/ui/temp/Header';
import usePayStore from '@/store/suho/usePayStore';

const PAY_TYPES = [
  { id: 'hourly', label: '시급' },
  { id: 'daily', label: '일급' },
  { id: 'weekly', label: '주급' },
];

export default function AccountPay() {
  const navigate = useNavigate();

  // store에서 직접 값과 함수 가져오기
  const selectedPay = usePayStore((state) => state.selectedPay);
  const payType = usePayStore((state) => state.payType);
  const setPay = usePayStore((state) => state.setPay);

  // 로컬 상태로 관리
  const [inputPay, setInputPay] = useState(selectedPay?.toString() || '');
  const [selectedType, setSelectedType] = useState(payType || 'hourly');

  // PayStore의 현재 값으로 초기화
  useEffect(() => {
    setInputPay(selectedPay?.toString() || '');
    setSelectedType(payType);
  }, [selectedPay, payType]);

  const handlePayChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setInputPay(value);
    }
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleSave = () => {
    // PayStore만 업데이트
    setPay({
      amount: Number(inputPay),
      type: selectedType,
    });

    navigate('/helper/account/edit');
  };

  return (
    <main className='max-w-md mx-auto flex flex-col gap-4 p-4'>
      <Header title='희망 급여 설정' />

      <div className='text-center space-y-2 mb-4'>
        <span className='block'>희망하시는 급여를 입력해 주세요.</span>
        <span className='block text-gray-500'>(중개 수수료 10% 포함)</span>
      </div>

      {/* 급여 유형 선택 */}
      <div className='grid grid-cols-3 gap-2'>
        {PAY_TYPES.map(({ id, label }) => (
          <Button
            key={id}
            type='button'
            variant={selectedType === id ? 'default' : 'outline'}
            onClick={() => handleTypeChange(id)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* 급여 입력 */}
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <Input
            type='text'
            value={inputPay}
            onChange={handlePayChange}
            placeholder={`${PAY_TYPES.find((t) => t.id === selectedType)?.label}을 입력하세요`}
            className='text-right'
          />
          <span className='flex-shrink-0'>원</span>
        </div>

        <Button onClick={handleSave} className='w-full' disabled={!inputPay}>
          저장하기
        </Button>
      </div>
    </main>
  );
}
