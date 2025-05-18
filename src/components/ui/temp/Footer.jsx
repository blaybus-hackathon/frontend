import { Link } from 'react-router-dom';
import ChatIcon from '../../../assets/images/chat-icon.svg';
import HomeIcon from '../../../assets/images/home-icon.svg';
import MatchingIcon from '../../../assets/images/matching-icon.svg';
import PillIcon from '../../../assets/images/pill-icon.svg';
import MyPageIcon from '../../../assets/images/mypage-icon.svg';

export default function Footer() {
  const baseItemClass =
    'hover:bg-black/40 w-full h-full flex flex-col items-center justify-center rounded-[1.25rem] cursor-pointer gap-[0.25rem]';
  const iconClass = 'w-[1.3rem] h-[1.3rem] object-contain';
  const textClass = 'text-white text-[0.82rem] font-semibold';

  return (
    <footer className='bottom-0 bg-[var(--main)] h-[4.44rem] rounded-t-[1.25rem] py-[0.8rem] grid grid-cols-5 items-center gap-[0.25rem]'>
      <Link to='/' className={baseItemClass}>
        <img src={HomeIcon} alt='home' className={iconClass} />
        <span className={textClass}>홈</span>
      </Link>

      <Link to='/chatrooms' className={baseItemClass}>
        <img src={ChatIcon} alt='chat' className={iconClass} />
        <span className={textClass}>채팅</span>
      </Link>

      <Link to='/matching' className={baseItemClass}>
        <img src={MatchingIcon} alt='matching' className={iconClass} />
        <span className={textClass}>매칭 관리</span>
      </Link>

      <Link to='/center/register' className={baseItemClass}>
        <img src={PillIcon} alt='pill' className={iconClass} />
        <span className={textClass}>어르신 관리</span>
      </Link>

      <Link to='/center/mypage' className={baseItemClass}>
        <img src={MyPageIcon} alt='mypage' className={iconClass} />
        <span className={textClass}>마이</span>
      </Link>
    </footer>
  );
}
