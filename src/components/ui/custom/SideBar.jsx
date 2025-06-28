import { Users, UserCheck, MessageCircle, Settings, User, BarChart3 } from 'lucide-react';

const menuItems = [
  { icon: BarChart3, label: '통계 현황', active: true },
  { icon: Users, label: '요양사 조회' },
  { icon: UserCheck, label: '이르신 조회' },
  { icon: MessageCircle, label: '채팅' },
  { icon: Settings, label: '매칭관리' },
  { icon: UserCheck, label: '어르신 관리' },
  { icon: User, label: '마이' },
];

export function Sidebar() {
  return (
    <aside className='hidden lg:flex lg:flex-col lg:w-64 bg-purple-50 min-h-screen'>
      <div className='p-6'>
        <div className='flex items-center gap-2 mb-8'>
          <div className='w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>D</span>
          </div>
          <span className='text-xl font-bold text-purple-700'>Dolbomwork</span>
        </div>

        <nav className='space-y-2'>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                item.active
                  ? 'bg-purple-100 text-purple-700 font-medium'
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              <item.icon className='w-5 h-5' />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
