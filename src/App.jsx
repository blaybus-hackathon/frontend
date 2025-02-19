import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import Matching from './pages/Matching';
import MatchingStatus from './pages/MatchingStatus';

import SignTest from './components/SignUp/SignTest';
import ModifyInfo from './pages/ModifyInfo';
import CaregiverInfo from './pages/CaregiverInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/matching' element={<Matching />} />
        <Route path='/status' element={<MatchingStatus />} />
        <Route path='/modify' element={<ModifyInfo />} />
        <Route path='/caredetail' element={<CaregiverInfo />} />
        <Route path='/test' element={<SignTest />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
