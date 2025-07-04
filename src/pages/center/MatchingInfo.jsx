import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/ui/temp/Header';
import Footer from '@/components/ui/temp/Footer';
import MatchingInfoTitle from '@/components/Center/MatchingInfo/MatchingInfoTitle';
import MatchingTabs from '@/components/Center/MatchingInfo/MatchingTabs';

export default function MatchingInfo() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('waiting');

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div className='min-h-screen flex flex-col max-w-2xl mx-auto'>
      <Header type='back' title='매칭 관리' onBack={() => navigate(-1)} hasBorder={false} />

      {/* title */}
      <MatchingInfoTitle activeTab={activeTab} />

      <div className='mx-auto flex-grow w-full'>
        <MatchingTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      <Footer />
    </div>
  );
}
