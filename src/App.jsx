import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/ui/Layout';
import NotFound from './pages/NotFound';

import SignIn from './pages/SignIn';
import CenterSignUp from './pages/center/SignUp';
import HelperSignUp from './pages/helper/SignUp';
import SearchCenter from './pages/SearchCenter';

import KakaoCallback from './components/Auth/KakaoCallback';
import Account from './pages/helper/Account/Account';
import AccountEdit from './pages/helper/AccountEdit/AccountEdit';
import HelperLocation from './pages/helper/AccountEdit/navigate/HelperLocation';
import HelperAddress from './pages/helper/HelperAddress';
import AccountSchedule from './pages/helper/AccountEdit/navigate/AccountSchedule';
import AccountPay from './pages/helper/AccountEdit/navigate/AccountPay';
import AccountCareType from './pages/helper/AccountEdit/navigate/AccountCareType';

import Home from './pages/Home';
import Matching from './pages/center/Matching';
import RecriutDetail from './pages/center/RecriutDetail';
import ModifyRecruit from './pages/center/ModifyRecruit';
import CaregiverInfo from './pages/center/CaregiverInfo';
import CenterRegister from './pages/center/CenterRegister';
import ElderRegister from './pages/center/ElderRegister';
import MyPage from './pages/center/MyPage';
import ElderInfo from './pages/center/ElderInfo';
import MatchingInfo from './pages/center/MatchingInfo';
import ElderAddress from './pages/center/ElderAddress';
import ChatRoomsPage from './pages/center/ChatRoomsPage';
import PrivateChatRoom from './pages/center/PrivateChatRoom';

function App() {
  return (
    <Router>
      <Routes>
        {/* 공통 */}
        <Route index element={<Home />} />
        <Route path='/login/oauth2/code/kakao' element={<KakaoCallback />} />
        <Route path='/*' element={<NotFound />} />

        {/* 레이아웃 */}
        <Route path='/' element={<Layout />}>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/search-center' element={<SearchCenter />} />

          {/* Center */}
          <Route path='center/signup' element={<CenterSignUp />} />
          <Route path='center/register' element={<CenterRegister />} />
          <Route path='center/elder-register' element={<ElderRegister />} />
          <Route path='center/mypage' element={<MyPage />} />
          <Route path='center/elder-info' element={<ElderInfo />} />
          <Route path='center/matching' element={<Matching />} />
          <Route path='center/matching-info' element={<MatchingInfo />} />
          <Route path='center/register/address' element={<ElderAddress />} />

          <Route path='center/recruit/detail' element={<RecriutDetail />} />
          <Route path='center/recruit/modify' element={<ModifyRecruit />} />
          <Route path='center/care-info' element={<CaregiverInfo />} />

          {/* Helper */}
          <Route path='helper/signup' element={<HelperSignUp />} />
          <Route path='helper/account' element={<Account />} />
          <Route path='helper/account/edit' element={<AccountEdit />} />
          <Route path='helper/account/schedule' element={<AccountSchedule />} />
          <Route path='helper/account/pay' element={<AccountPay />} />
          <Route path='helper/account/care-type' element={<AccountCareType />} />
          <Route path='helper/location' element={<HelperLocation />} />
          <Route path='helper/address' element={<HelperAddress />} />

          {/* Chatting */}
          <Route path='chatrooms' element={<ChatRoomsPage />} />
          <Route path='chatroom/:roomid' element={<PrivateChatRoom />} />

          {/* <Route path="/center" element={} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
