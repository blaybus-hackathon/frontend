import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/ui/Layout';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/helper/Account';
import AccountEdit from './pages/helper/AccountEdit';
import HelperLocation from './pages/helper/HelperLocation';
import HelperLocationDetail from './pages/helper/HelperLocationDetail';
import AccountSchedule from './pages/helper/AccountSchedule';
import AccountPay from './pages/helper/AccountPay';
import AccountCareType from './pages/helper/AccountCareType';

import './App.css';

import Home from './pages/Home';
import Matching from './pages/center/Matching';
import MatchingStatus from './pages/center/MatchingStatus';

import SignTest from './components/Auth/SignUp/SignTest';
import ModifyInfo from './pages/center/ModifyInfo';
import CaregiverInfo from './pages/center/CaregiverInfo';

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
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />

        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          {/* Center */}
          <Route path='center/register' element={<ElderRegister />} />
          <Route path='center/mypage' element={<MyPage />} />
          <Route path='center/elder-info' element={<ElderInfo />} />
          <Route path='center/matching-info' element={<MatchingInfo />} />
          <Route path='center/register/address' element={<ElderAddress />} />

          {/* Helper */}
          <Route path='helper/account' element={<Account />} />
          <Route path='helper/account/edit' element={<AccountEdit />} />
          <Route path='helper/account/schedule' element={<AccountSchedule />} />
          <Route path='helper/account/pay' element={<AccountPay />} />
          <Route path='helper/account/care-type' element={<AccountCareType />} />
          <Route path='helper/location' element={<HelperLocation />} />
          <Route path='helper/location/:city' element={<HelperLocationDetail />} />

          <Route path='matching' element={<Matching />} />
          <Route path='status' element={<MatchingStatus />} />
          <Route path='modify' element={<ModifyInfo />} />
          <Route path='caredetail' element={<CaregiverInfo />} />
          <Route path='test' element={<SignTest />} />

          <Route path='chatrooms' element={<ChatRoomsPage />} />
          <Route path='chatroom/:roomid' element={<PrivateChatRoom />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
