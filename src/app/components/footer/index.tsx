import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>About Reverso</h4>
          <p>
            Reverso is a minimalist fashion brand bringing premium designs and
            timeless style to your wardrobe.
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" className="facebook">
              <i className="icon ion-logo-facebook"></i>
            </a>
            <a href="https://instagram.com" className="twitter">
              <i className="icon ion-logo-twitter"></i>
            </a>
            <a href="https://twitter.com" className="instagram">
              <i className="icon ion-logo-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Newsletter</h4>
          <p>Subscribe to get updates on new arrivals and special offers.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">
              <i className="icon ion-ios-mail"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Reverso. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
