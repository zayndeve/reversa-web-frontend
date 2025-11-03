import React from 'react';
import '../../css/homePage.css';

const BannerBlock = () => {
  return (
    <section className="home-banner-block">
      <div className="home-banner-block-item">
        <img src="/img/banner14.jpg" alt="Jeans For Man" />
        <div className="home-banner-block-content">
          <span className="home-banner-block-label">BEST</span>
          <h3>Jeans For<br />man</h3>
          <p>$130.00</p>
        </div>
      </div>
      <div className="home-banner-block-item">
        <img src="/img/banner15.jpg" alt="Demont Fashion" />
        <div className="home-banner-block-content">
          <span className="home-banner-block-label">BEST</span>
          <h3>Demont<br />Fashion</h3>
          <p>$120.00</p>
        </div>
      </div>
    </section>
  );
};

export default BannerBlock;
