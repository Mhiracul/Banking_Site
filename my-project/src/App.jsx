import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forgotpassword from "./Pages/ForgotPassword";
import Home from "./Home";
import RegistrationForm from "./Pages/RegistrationForm";
import LoginForm from "./Pages/LoginForm";
import Dashboard from "./Pages/Dashboard";
import WithdrawalForm from "./Pages/WithdrawalForm";
import Settings from "./Pages/Settings";
import DepositForm from "./Pages/DepositForm";
import Withdrawals from "./Admin/Withdrawals";
import Users from "./Admin/Users";
import Main from "./MainPage";
import { Toaster } from "react-hot-toast";
import TextCarousel from "./component/TextCarousel";
import Savings from "./Pages/Savings";
import Wallet from "./Admin/Wallet";
import LoanForm from "./component/Dashboard/LoanForm";
import UserPage from "./Pages/UserPage";
import TransactionHistory from "./Pages/TransactionHistory";
import AccountBalance from "./Admin/AccountBalance";
import Admins from "./Admin/Admins";
import AdminSettings from "./Admin/pages/AdminSettings";
import Profile from "./Admin/pages/Profile";
import PenaltyForm from "./Admin/pages/PenaltyForm";
import AddForm from "./Admin/pages/AddForm";
import TransactionsHistory from "./Admin/pages/TransactionsHistory";
import EmailTemplateEditor from "./Admin/pages/EmailTemplateEditor";
import VirtualCardRegistrationForm from "./Pages/VirtualCardRegistration";
import WalletUpdate from "./Admin/pages/WalletUpdate";
import VirtualCardList from "./Admin/pages/VirtualCardList";
import LoanReason from "./Admin/pages/LoanReason";
import MainPage from "./Admin/pages/MainPage";
import ErrorPage from "./Pages/ErrorPage";
import AboutUsPage from "./Pages/AboutUsPage";
import TermsPage from "./Pages/TermsPage";
import PrivacyPage from "./Pages/PrivacyPage";
import Contact from "./Pages/Contact/Contact";
import SavingsPage from "./Admin/pages/SavingsPage";
import VerifyOTPPage from "./Pages/VerifyOTPPage";

const App = () => {
  return (
    <>
      <Toaster />

      <TextCarousel />

      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} exact />

            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />

            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/main" element={<Main />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/verify" element={<VerifyOTPPage />} exact />

            {/* private routes */}
            <Route path="/dash" element={<Dashboard />} />

            <Route path="/deposit" element={<DepositForm />} />
            <Route path="/withdraw" element={<WithdrawalForm />} />
            <Route path="/transact" element={<TransactionHistory />} />

            <Route path="/settings" element={<Settings />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/sss" element={<Withdrawals />} />
            <Route path="/bbb" element={<Crypto />} />
            <Route path="/users" element={<Users />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/card" element={<VirtualCardRegistrationForm />} />

            <Route path="/wall" element={<Wallet />} />
            <Route path="/loan" element={<LoanForm />} />
            <Route path="/bat" element={<UserPage />} />
            <Route path="/mimi" element={<Admins />} />
            <Route path="/save" element={<SavingsPage />} />
            <Route path="/account" element={<AccountBalance />} />
            <Route path="/set" element={<AdminSettings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-user" element={<MainPage />} />
            <Route path="/account/admin-penalty" element={<PenaltyForm />} />
            <Route path="/account/admin-add" element={<AddForm />} />
            <Route path="/admin-user/edit" element={<MainPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/payment/loan" element={<LoanReason />} />
            <Route path="/payment/card" element={<VirtualCardList />} />
            <Route path="/wallet-update" element={<WalletUpdate />} />
            <Route path="/mail" element={<EmailTemplateEditor />} />

            <Route
              path="/account/admin-transaction"
              element={<TransactionsHistory />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
