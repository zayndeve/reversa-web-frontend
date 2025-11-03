import React from "react";
import { Box, Button } from "@mui/material";
import "../../css/homePage.css";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../../app/hooks/useGlobal"; // ✅ Import context

export default function Banner() {
  const navigate = useNavigate();
  const { authMember } = useGlobal(); // ✅ Check login state

  return (
    <Box className="banner">
      <video
        className="banner-video"
        src="/video/hero-videos.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <Box className="banner-overlay">
        <span className="banner-offer">Exclusive Collection</span>
        <h1 className="banner-title">Reverso <br />New Arrivals 2025</h1>
        <p className="banner-desc">Discover luxury fashion made for you.</p>
        <Button
          variant="contained"
          className="banner-button"
          onClick={() => navigate(authMember ? "/products" : "/member/signup")}
        >
          {authMember ? "Shop Now" : "Sign Up Now"}
        </Button>
      </Box>
    </Box>
  );
}
