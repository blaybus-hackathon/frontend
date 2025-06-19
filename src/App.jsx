import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/ui/Layout';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import KakaoCallback from './components/Auth/KakaoCallback';
import Account from './pages/helper/Account/Account';
import AccountEdit from './pages/helper/AccountEdit/AccountEdit';
import HelperLocation from './pages/helper/AccountEdit/navigate/HelperLocation';

import AccountSchedule from './pages/helper/AccountEdit/navigate/AccountSchedule';
import AccountPay from './pages/helper/AccountEdit/navigate/AccountPay';
import AccountCareType from './pages/helper/AccountEdit/navigate/AccountCareType';

import Home from './pages/Home';
import Matching from './pages/center/Matching';
import RecriutDetail from './pages/center/RecriutDetail';
import SignTest from './components/Auth/SignUp/SignTest';
import ModifyInfo from './pages/center/ModifyInfo';
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
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/oauth/kakao/callback' element={<KakaoCallback />} />

        {/* 레이아웃 */}
        <Route path='/' element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route path='/signin' element={<SignIn />} />

          {/* Center */}
          <Route path='center/register' element={<CenterRegister />} />
          <Route path='center/elder-register' element={<ElderRegister />} />
          <Route path='center/mypage' element={<MyPage />} />
          <Route path='center/elder-info' element={<ElderInfo />} />
          <Route path='center/matching' element={<Matching />} />
          <Route path='center/recruit-detail' element={<RecriutDetail />} />
          <Route path='center/modify-info' element={<ModifyInfo />} />
          <Route path='center/matching-info' element={<MatchingInfo />} />
          <Route path='center/caregiver-info' element={<CaregiverInfo />} />
          <Route path='center/register/address' element={<ElderAddress />} />

          {/* Helper */}
          <Route path='helper/account' element={<Account />} />
          <Route path='helper/account/edit' element={<AccountEdit />} />
          <Route path='helper/account/schedule' element={<AccountSchedule />} />
          <Route path='helper/account/pay' element={<AccountPay />} />
          <Route path='helper/account/care-type' element={<AccountCareType />} />
          <Route path='helper/location' element={<HelperLocation />} />
          {/* <Route path='helper/location/:city' element={<HelperLocationDetail />} /> */}

          {/* <Route path="/center/signUp" element={} /> */}
          <Route path='test' element={<SignTest />} />

          <Route path='chatrooms' element={<ChatRoomsPage />} />
          <Route path='chatroom/:roomid' element={<PrivateChatRoom />} />

          {/* <Route path="/center" element={} /> */}
          {/* <Route path="/center/(helper)search" element={<Matching />} /> */}
          {/* <Route path="/center/(helper)search/result" element={<Matching />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
