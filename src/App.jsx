import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/ui/Layout';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import ErrorBoundary from './components/common/ErrorBoundary';
import RequireAuth from './routes/RequireAuth';

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
// const ElderList = lazy(() => import('./pages/center/ElderList'));
const MatchingInfo = lazy(() => import('./pages/center/MatchingInfo'));
const ElderAddress = lazy(() => import('./pages/center/ElderAddress'));
const ChatRoomsPage = lazy(() => import('./pages/center/ChatRoomsPage'));
const PrivateChatRoom = lazy(() => import('./pages/center/PrivateChatRoom'));

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* 공통 */}
            <Route index element={<Home />} />
            <Route
              path='center'
              element={
                <RequireAuth role='center'>
                  <DashBoard />
                </RequireAuth>
              }
            />
            <Route path='login/oauth2/code/kakao' element={<KakaoCallback />} />
            <Route path='*' element={<NotFound />} />
            <Route path='error' element={<Error />} />

            {/* 레이아웃 */}
            <Route path='/' element={<Layout />}>
              <Route path='signin' element={<SignIn />} />
              <Route path='find-account' element={<FindAccount />} />

              <Route
                path='search-center'
                element={
                  <RequireAuth role='center'>
                    <SearchCenter />
                  </RequireAuth>
                }
              />
              <Route path='center/signup' element={<CenterSignUp />} />
              <Route path='helper/signup' element={<HelperSignUp />} />

              {/* Center */}
              <Route
                path='center/*'
                element={
                  <RequireAuth role='center'>
                    <Route path='register' element={<CenterRegister />} />
                    <Route path='elder-register' element={<ElderRegister />} />
                    <Route path='mypage' element={<MyPage />} />
                    <Route path='elder-info' element={<ElderInfo />} />
                    <Route path='matching' element={<Matching />} />
                    <Route path='matching-info' element={<MatchingInfo />} />
                    <Route path='register/address' element={<ElderAddress />} />
                    <Route path='recruit/detail' element={<RecruitDetail />} />
                    <Route path='recruit/modify' element={<ModifyRecruit />} />
                    <Route path='care-info' element={<CaregiverInfo />} />
                  </RequireAuth>
                }
              />

              {/* Helper */}
              <Route
                path='helper'
                element={
                  <RequireAuth role='helper'>
                    <HelperHome />
                  </RequireAuth>
                }
              />
              <Route
                path='helper/*'
                element={
                  <RequireAuth role='helper'>
                    <Route path='detail/:patientLogSeq' element={<MatchingDetail />} />
                    <Route path='account' element={<Account />} />
                    <Route path='account/edit' element={<AccountEdit />} />
                    <Route path='account/schedule' element={<AccountSchedule />} />
                    <Route path='account/pay' element={<AccountPay />} />
                    <Route path='account/care-type' element={<AccountCareType />} />
                    <Route path='location' element={<HelperLocation />} />
                    <Route path='address' element={<HelperAddress />} />
                  </RequireAuth>
                }
              />

              {/* Chatting */}
              <Route path='chatrooms' element={<ChatRoomsPage />} />
              <Route path='chatroom/:roomid' element={<PrivateChatRoom />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
