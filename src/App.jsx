import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/suho/Home";
import Test from "./Test";
import SignIn from "./pages/suho/SignIn";
import SignUp from "./pages/suho/SignUp";
import Account from "./pages/suho/Account";
import AccountEdit from "./pages/suho/AccountEdit";
import HelperLocation from "./pages/suho/HelperLocation";
import HelperLocationDetail from "./pages/suho/HelperLocationDetail";
import AccountSchedule from "./pages/suho/AccountSchedule";
import AccountPay from "./pages/suho/AccountPay";
import AccountCareType from "./pages/suho/AccountCareType";

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
