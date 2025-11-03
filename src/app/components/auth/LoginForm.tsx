import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/auth.css";
import { useGlobal } from "../../hooks/useGlobal";


export default function LoginForm() {
  const { setAuthMember } = useGlobal();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    memberNick: "",
    memberPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${apiUrl}/api/member/login`, formData, {
        withCredentials: true,
      });
  
      // ✅ Save in localStorage
      localStorage.setItem("memberData", JSON.stringify(res.data.member));
  
      // ✅ Update global context state
      setAuthMember(res.data.member);
  
      // ✅ Navigate to account
      navigate("/account");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };
  

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5001/auth/member/google";
  };

  return (
    <Box className="auth-container">
      {/* LEFT SIDE */}
      <Box className="auth-left">
        <Typography variant="h2">
          “Welcome back to Reverso – Login to continue.”
        </Typography>
      </Box>

      {/* RIGHT SIDE */}
      <Box className="auth-right">
        <Box className="auth-form">
          <Typography variant="h4" mb={3}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="memberNick"
                label="Nickname or Email"
                variant="outlined"
                fullWidth
                value={formData.memberNick}
                onChange={handleChange}
                required
              />
              <TextField
                name="memberPassword"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={formData.memberPassword}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="auth-button"
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="contained"
                className="google-signup-button"
                startIcon={
                  <img
                    src="/img/google-logo.svg"
                    alt="Google logo"
                    style={{ width: "20px", height: "20px" }}
                  />
                }
                onClick={handleGoogleLogin}
              >
                Login with Google
              </Button>
            </Stack>
          </form>
          <Box className="auth-links">
            <a href="/member/signup">Register here</a>
            <a href="/forgot-password">Forgot password?</a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
