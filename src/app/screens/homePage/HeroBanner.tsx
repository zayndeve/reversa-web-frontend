import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/homePage.css';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-banner">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/video/video-qoravoy.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <h1>Get exclusive<br />Products.</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          Lorem Ipsum has been the industry's standard dummy text</p>
        <span>(+123) 123 321 345</span>
        <button onClick={() => navigate('/orders')}>SHOP NOW</button>
      </div>
    </section>
  );
};

export default HeroBanner;
