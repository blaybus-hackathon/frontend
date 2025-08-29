import { useNavigate } from 'react-router-dom';

import useHelperAccountStore from '@/store/helper/useHelperAccoutStore';

import backarrow from '@/assets/images/back-arrow.png';
import overview from '@/assets/images/overview.png';

// const PAY_TYPES = [
//   { id: 'hourly', label: '시급' },
//   { id: 'daily', label: '일급' },
//   { id: 'weekly', label: '주급' },
//   { id: 'monthly', label: '월급' },
// ];
const PAY_TYPES = ['시급', '일급', '주급'];

function PaySection({ pay }) {
  const navigate = useNavigate();

  const { helper } = useHelperAccountStore();

  return (
    <section
      className='helper-section hover:cursor-pointer'
      onClick={() => navigate('/helper/account/pay')}
    >
      <span className='helper-title'>나의 희망급여</span>
      <span className='helper-subtitle'>나의 희망급여를 설정해 보세요!</span>

      <div className='profile-section__content-box'>
        <img className='w-[24px] h-[24px]' src={overview} alt='overview_icon' />
        <span className='profile-section__content-text'>{PAY_TYPES[helper.wageState - 1]}</span>
        <img src={backarrow} alt='backarrow' className='w-4 h-4 rotate-180' />
        <span className='profile-section__content-text'>{helper.wage}원</span>
      </div>
    </section>
  );
}

export default PaySection;
