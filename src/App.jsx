import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Test from './Test';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import MatchingManage from './pages/MatchigManage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path='/' element={<MatchingManage />} />
        <Route path='/test' element={<Test />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
