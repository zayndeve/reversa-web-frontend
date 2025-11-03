import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import axios from "axios";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/api/member/reset-password/${token}`, {
        newPassword,
      });
      setMessage("✅ Password reset successfully. Please login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Reset failed. Please try again."
      );
    }
  };

  return (
    <Box className="auth-container">
      <Box className="auth-left">
        <Typography variant="h5">
          “Create your new password for Reverso.”
        </Typography>
      </Box>
      <Box className="auth-right">
        <Box className="auth-form">
          <Typography variant="h4" mb={3}>
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                type="password"
                label="New Password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                required
              />
              {message && <Typography color="primary">{message}</Typography>}
              {error && <Typography color="error">{error}</Typography>}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="auth-button"
              >
                Reset Password
              </Button>
            </Stack>
          </form>
          <Typography mt={2} textAlign="center">
            <a href="/login">Back to Login</a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
