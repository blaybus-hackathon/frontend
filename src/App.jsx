import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./Test";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import AccountEdit from "./pages/AccountEdit";
import HelperLocation from "./pages/HelperLocation";
import HelperLocationDetail from "./pages/HelperLocationDetail";
import AccountSchedule from "./pages/AccountSchedule";
import AccountPay from "./pages/AccountPay";
import AccountCareType from "./pages/AccountCareType";

import "./App.css";

function App() {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />


        {/* 공통 */}
        <Route path="/signIn" element={<SignIn />} />

        {/* Helper */}
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/helper/account" element={<Account />} />
        <Route path="/helper/account/edit" element={<AccountEdit />} />
        <Route path="/helper/account/schedule" element={<AccountSchedule />} />
        <Route path="/helper/account/pay" element={<AccountPay />} />
        <Route path="/helper/account/care-type" element={<AccountCareType />} />
        <Route path="/helper/location" element={<HelperLocation />} />
        <Route path="/helper/location/:city" element={<HelperLocationDetail />} />



      </Routes>
    </Router>


  );
}

export default App;
