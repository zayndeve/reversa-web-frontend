import React from "react";
import { Link } from "react-router-dom";
import {
    Facebook,
    Twitter,
    Instagram,
    Github
  } from "lucide-react";
  
import "../../css/aboutUs.css";
import Statistics from "../homePage/Statistics";
import { GitHub } from "@mui/icons-material";
import ProductsBanner from "../productListPage/ShopBanner";

const AboutUsPage = () => {
  const teamData = [
    { name: " Alisher O`g`li", role: "Founder & CEO" },
    { name: "Charlie Path", role: "Creative Director" },
    { name: "Zendaya", role: "Brand Strategist" },
  ];

  return (  <>
    <ProductsBanner  />
    <div className="about-container">
      
      {/* Intro Section in container */}
      <section className="intro-section">
        <div className="intro-content">
          <div className="intro-text">
            <h1>Welcome to <span className="highlight">ReVerSo</span>!</h1>
            <div className="line" />
            <p>
              We provide modern, stylish, and essential fashion pieces for every individual. Our commitment is to quality, design, and sustainability. Join thousands who trust ReVerSo to define their everyday style.
            </p>
            <Link to="/products" className="shop-now-btn">Shop Now</Link>
          </div>
          <div className="intro-media">
            <video autoPlay muted loop playsInline className="intro-video">
              <source src="/video/maniken.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="statistics-wrapper">
        <Statistics />
      </section>

      {/* Our Team Section */}
      <section className="team-section">
        <div className="team-header">
          <h2>Experienced & Professional Team</h2>
          <p>
            You can rely on our amazing features list and also our customer services will be a great experience for you without doubt and in no-time.
          </p>
        </div>
        <div className="team-grid">
          {teamData.map((member, index) => (
            <div className="team-member" key={index}>
              <img
                src={`/img/team-${index + 1}.jpg`}
                alt={member.name}
                className="team-img"
              />
              <h4>{member.name}</h4>
              <h6>{member.role}</h6>
              <p>
                You can rely on our amazing features list and also our customer services will be a great experience.
              </p>
              <div className="social-links">
  <a href="https://www.instagram.com/"><Facebook size={20} strokeWidth={1.8} color="#3b5998" /></a>
  <a href="https://www.instagram.com/"><Twitter size={20} strokeWidth={1.8} color="#1da1f2" /></a>
  <a href="https://www.instagram.com/"><Instagram size={20} strokeWidth={1.8} color="#e4405f" /></a>
  <a href="https://www.instagram.com/"><Github size={20} strokeWidth={1.8} color="#181717
" /></a>
 
</div>

            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
};

export default AboutUsPage;