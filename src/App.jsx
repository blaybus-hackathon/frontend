import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* 공통 */}
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />

        {/* Center */}
        <Route path='/center/register' element={<ElderRegister />} />
        {/* Helper */}
        <Route path='/helper/account' element={<Account />} />
        <Route path='/helper/account/edit' element={<AccountEdit />} />
        <Route path='/helper/account/schedule' element={<AccountSchedule />} />
        <Route path='/helper/account/pay' element={<AccountPay />} />
        <Route path='/helper/account/care-type' element={<AccountCareType />} />
        <Route path='/helper/location' element={<HelperLocation />} />
        <Route path='/helper/location/:city' element={<HelperLocationDetail />} />

        <Route path='/matching' element={<Matching />} />
        <Route path='/status' element={<MatchingStatus />} />
        <Route path='/modify' element={<ModifyInfo />} />
        <Route path='/caredetail' element={<CaregiverInfo />} />
        <Route path='/test' element={<SignTest />} />
      </Routes>
    </Router>
  );
}

export default App;
