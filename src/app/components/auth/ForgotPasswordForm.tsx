import React, { useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import axios from "axios";

export default function ForgotPasswordForm() {
  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/api/member/request-password`, {
        memberNick: identifier,
      });
      setMessage("✅ Reset link sent! Check your email.");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "No member found with this nickname or email."
      );
    }
  };

  return (
    <Box className="auth-container">
      <Box className="auth-left">
        <Typography variant="h5">
          “Reset your password to continue exploring Reverso.”
        </Typography>
      </Box>
      <Box className="auth-right">
        <Box className="auth-form">
          <Typography variant="h4" mb={3}>
            Forgot Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="memberNick"
                label="Nickname or Email"
                variant="outlined"
                fullWidth
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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
                Send Reset Link
              </Button>
            </Stack>
          </form>
          <Typography mt={2} textAlign="center">
            Remembered? <a href="/login">Go back to login</a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
