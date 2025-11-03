import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import "../../css/banner.css";
import { useNavigate } from "react-router-dom";

const images = ["/img/banner2.png", "/img/banner3.png","/img/banner4.png"]; // Add your images here

export default function Banner() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 8000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box className="banner-wrapper">
      {/* LEFT SIDE */}
      <Box className="banner-content">
        <span className="banner-offer">Exclusive Offer - 10% Off This Week</span>
        <h2 className="banner-title">Welcome to Reverso</h2>
        <p className="banner-desc">Bring your fashion ideas to life.</p>
        <Button
          variant="contained"
          className="banner-button"
          onClick={() => navigate("/member/signup")}
        >
          Sign Up
        </Button>
      </Box>

      {/* RIGHT SIDE */}
      <Box className="banner-image fade-in">
        <img src={images[currentImage]} alt="Fashion Model" key={images[currentImage]} />
      </Box>
    </Box>
  );
}