import { useNavigate } from 'react-router-dom';
import { useSidebarStore } from '../../../hooks/useSidebar';
import {
  DiamondPlus,
  UserSearch,
  ArrowRightLeft,
  Mail,
  User,
  BarChart3,
  PillBottle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import LogoIcon from '/blaybus_logo_icon.svg';
import Logo from '/blaybus_logo_icon_text_row.svg';

const menuItems = [
  { icon: BarChart3, label: '통계 현황', path: '/center', active: true },
  { icon: DiamondPlus, label: '요양사 조회', path: '/center/caregiver', active: false },
  { icon: UserSearch, label: '어르신 조회', path: '/center/elder-list', active: false },
  { icon: Mail, label: '채팅', path: '/chatrooms', active: false },
  { icon: ArrowRightLeft, label: '매칭관리', path: '/center/matching-info', active: false },
  { icon: PillBottle, label: '어르신 관리 ', path: '/center/elder-info', active: false },
  { icon: User, label: '마이페이지', path: '/center/mypage', active: false },
];

export function Sidebar() {
  const navigate = useNavigate();
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const toggle = useSidebarStore((state) => state.toggle);

  const handleClick = (path) => {
    // 어르신 조회와 요양보호사 조회는 임시로 alert로 처리
    if (path === '/center/elder-list' || path === '/center/caregiver') {
      alert('준비 중입니다.');
      return;
    }

    navigate(path);
  };

  return (
    <aside
      className={`hidden lg:flex lg:flex-col bg-white border-r border-r-[#e6e6e6] min-h-screen px-4 py-12 transition-all duration-300 ease-in-out relative ${
        isCollapsed ? 'w-20' : 'w-3xs'
      }`}
    >
      {/* Toggle Button */}
      <button
        className='absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-[#f3edfd] cursor-pointer hover:text-[var(--main)] hover:-translate-x-0.5 duration-100 active:translate-x-0.5 active:shadow-md'
        onClick={toggle}
        aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className='w-6 h-6 stroke-3 text-[#9e9e9e]' />
        ) : (
          <ChevronLeft className='w-6 h-6 stroke-3 text-[#9e9e9e]' />
        )}
      </button>

      <div
        className={`flex flex-col gap-10 h-full justify-between ${
          isCollapsed ? 'items-center' : 'items-start'
        }`}
      >
        <div className='flex items-center gap-2 justify-center'>
          <img
            src={isCollapsed ? LogoIcon : Logo}
            alt='logo'
            className={`h-auto  ${isCollapsed ? 'w-8' : 'w-44'}`}
          />
        </div>
        <nav className='flex flex-col gap-5'>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center gap-2 px-5 py-3 rounded-lg text-left text-lg transition-colors cursor-pointer ${
                item.active
                  ? 'bg-[#f3edfd] text-[var(--main)] font-medium shadow-md'
                  : 'text-[#9e9e9e] hover:bg-[#f3edfd] hover:text-[var(--main)] hover:shadow-md hover:translate-x-0.5 transition-all duration-100 active:translate-x-0.5 active:translate-y-0.5 active:shadow-md'
              }`}
            >
              {isCollapsed ? (
                <item.icon className='w-5 h-5' />
              ) : (
                <div className='flex items-center gap-2'>
                  <item.icon className='w-5 h-5' />
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>
        <button className='flex items-center gap-2 text-lg text-[#9e9e9e] hover:text-[var(--main)] cursor-pointer hover:bg-[#f3edfd] rounded-lg px-5 py-3'>
          {isCollapsed ? (
            <LogOut className='w-5 h-5' />
          ) : (
            <>
              <LogOut className='w-5 h-5' />
              로그아웃
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
