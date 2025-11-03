import React from "react";
import { Box, Typography } from "@mui/material";
import "../../css/statistic.css"; // Assuming you have a CSS file for styles

export default function Statistics() {
  return (
    <Box className="statistics-section">
      <Box className="statistic-item">
        <Typography variant="h6" className="statistic-title">
          Free Shipping
        </Typography>
        <Typography className="statistic-desc">
          Free shipping on all order
        </Typography>
      </Box>
      <Box className="vertical-line" />
      <Box className="statistic-item">
        <Typography variant="h6" className="statistic-title">
          Money Return
        </Typography>
        <Typography className="statistic-desc">
          30 days for free return
        </Typography>
      </Box>
      <Box className="vertical-line" />
      <Box className="statistic-item">
        <Typography variant="h6" className="statistic-title">
          Online Support
        </Typography>
        <Typography className="statistic-desc">
          Support 24 hours a day
        </Typography>
      </Box>
    </Box>
  );
}