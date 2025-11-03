import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./homePage";
import ProductListPage from "./productListPage";
import ProductDetailPage from "./productDetailPage";
import CartPage from "./cartPage";
import CheckoutPage from "./checkoutPage";
import AccountPage from "./accountPage";
import SearchPage from "./searchPage";
import NotFoundPage from "./notFoundPage";
import { HomeNavbar } from "../components/headers/HomeNavbar";
import OtherNavbar from "../components/headers/OtherNavbar";
import Footer from "../components/footer";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SingupPage";

import "../css/basket.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/app.css";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import ResetPasswordPage from "../components/auth/ResetPasswordForm";

function App() {
  const location = useLocation();

  // Check if we're on an auth page
  const hideNavAndFooter = [
    "/login",
    "/member/signup",
    "/forgot-password",
    "/reset-password/:token",
  ].includes(location.pathname);

  return (
    <>
      {/* Navbar: only show if NOT on login/signup */}
      {!hideNavAndFooter &&
        (location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />)}

      {/* Routes */}
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* Authentication pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/member/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Footer: only show if NOT on login/signup */}
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default App;
