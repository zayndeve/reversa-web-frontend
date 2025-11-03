import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./homePage";
import ProductListPage from "./productListPage";
import AccountPage from "./accountPage";
import NotFoundPage from "./notFoundPage";
import { HomeNavbar } from "../components/headers/HomeNavbar";
import OtherNavbar from "../components/headers/OtherNavbar";
import Footer from "../components/footer";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SingupPage";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import ResetPasswordPage from "../components/auth/ResetPasswordForm";
import { useGlobal } from "../hooks/useGlobal";
import OrderPageRoutes from "./orderPage";
import MemberService from "../service/MemberService";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "../css/basket.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/app.css";
import AboutUs from "./aboutUsPage";
import ContactUs from "./contactUsPage/ContactUs";

// ✅ Stripe Public Test Key
const stripePromise = loadStripe("pk_test_51RQnE0R2xYxm90hWTuEd0YHvKPbe3LKKDr07FPTeNJCVlS01Mc2kUr1C0IEmk3O39bK0rmyIJ2f8RgeXWoA4Cv0U00hSr9bnQa");

function App() {
  const location = useLocation();
  const { authMember, setAuthMember } = useGlobal();

  const hideNavAndFooter = [
    "/login",
    "/member/signup",
    "/forgot-password",
    "/reset-password/:token",
  ].includes(location.pathname);

  // ✅ Fetch current user on first load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const service = new MemberService();
        const member = await service.getMyDetails();
        setAuthMember(member);
      } catch (err) {
        console.warn("No active session or failed to fetch user.");
      }
    };

    fetchUser();
  }, [setAuthMember]);

  return (
    <>
      {!hideNavAndFooter && (authMember ? <OtherNavbar /> : <HomeNavbar />)}

      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductListPage />} />
          <Route path="/order/*" element={<OrderPageRoutes />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/member/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Elements>

      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default App;
