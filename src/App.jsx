import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/ui/Layout';
import NotFound from './pages/NotFound';

import Home from './pages/Home';
import HelperHome from './pages/helper/HelperHome';
import MatchingDetail from './pages/helper/MatchingDetail';
import Spinner from './components/loading/Spinner';

const SignIn = lazy(() => import('./pages/SignIn'));
const CenterSignUp = lazy(() => import('./pages/center/SignUp'));
const HelperSignUp = lazy(() => import('./pages/helper/SignUp'));
const FindAccount = lazy(() => import('./pages/FindAccount'));
const SearchCenter = lazy(() => import('./pages/SearchCenter'));
const KakaoCallback = lazy(() => import('./components/Auth/KakaoCallback'));
const Account = lazy(() => import('./pages/helper/Account/Account'));
const AccountEdit = lazy(() => import('./pages/helper/AccountEdit/AccountEdit'));
const HelperLocation = lazy(() => import('./pages/helper/AccountEdit/navigate/HelperLocation'));
const HelperAddress = lazy(() => import('./pages/helper/HelperAddress'));
const AccountSchedule = lazy(() => import('./pages/helper/AccountEdit/navigate/AccountSchedule'));
const AccountPay = lazy(() => import('./pages/helper/AccountEdit/navigate/AccountPay'));
const AccountCareType = lazy(() => import('./pages/helper/AccountEdit/navigate/AccountCareType'));
const DashBoard = lazy(() => import('./pages/center/Dashboard'));
const Matching = lazy(() => import('./pages/center/Matching'));
const RecruitDetail = lazy(() => import('./pages/center/RecruitDetail'));
const ModifyRecruit = lazy(() => import('./pages/center/ModifyRecruit'));
const CaregiverInfo = lazy(() => import('./pages/center/CaregiverInfo'));
const CenterRegister = lazy(() => import('./pages/center/CenterRegister'));
const ElderRegister = lazy(() => import('./pages/center/ElderRegister'));
const MyPage = lazy(() => import('./pages/center/MyPage'));
const ElderInfo = lazy(() => import('./pages/center/ElderInfo'));
const MatchingInfo = lazy(() => import('./pages/center/MatchingInfo'));
const ElderAddress = lazy(() => import('./pages/center/ElderAddress'));
const ChatRoomsPage = lazy(() => import('./pages/center/ChatRoomsPage'));
const PrivateChatRoom = lazy(() => import('./pages/center/PrivateChatRoom'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* 공통 */}
          <Route index element={<Home />} />
          <Route path='/login/oauth2/code/kakao' element={<KakaoCallback />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='center' element={<DashBoard />} />

          {/* 레이아웃 */}
          <Route path='/' element={<Layout />}>
            <Route path='signin' element={<SignIn />} />
            <Route path='find-account' element={<FindAccount />} />
            <Route path='search-center' element={<SearchCenter />} />

            {/* Center */}
            <Route path='center/signup' element={<CenterSignUp />} />
            <Route path='center/register' element={<CenterRegister />} />
            <Route path='center/elder-register' element={<ElderRegister />} />
            <Route path='center/mypage' element={<MyPage />} />
            <Route path='center/elder-info' element={<ElderInfo />} />
            <Route path='center/matching' element={<Matching />} />
            <Route path='center/matching-info' element={<MatchingInfo />} />
            <Route path='center/register/address' element={<ElderAddress />} />
            <Route path='center/recruit/detail' element={<RecruitDetail />} />
            <Route path='center/recruit/modify' element={<ModifyRecruit />} />
            <Route path='center/care-info' element={<CaregiverInfo />} />

            {/* Helper */}
            <Route path='helper' element={<HelperHome />} />
            <Route path='helper/detail/:patientLogSeq' element={<MatchingDetail />} />
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
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
