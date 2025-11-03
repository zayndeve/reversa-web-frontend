import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/auth.css";
import { useGlobal } from "../../hooks/useGlobal";

export default function LoginForm() {
  const { setAuthMember } = useGlobal();
  const navigate = useNavigate();

  // chosen login method: memberEmail | memberNick | memberPhone
  type LoginMethod = "memberEmail" | "memberNick" | "memberPhone";
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("memberNick");

  const [formData, setFormData] = useState<{
    memberEmail: string;
    memberNick: string;
    memberPhone: string;
    memberPassword: string;
  }>({
    memberEmail: "",
    memberNick: "",
    memberPhone: "",
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

      // 🔥 Construct only the selected login field
      const payload = {
        [loginMethod]: formData[loginMethod],
        memberPassword: formData.memberPassword,
      };

      const res = await axios.post(`${apiUrl}/api/member/login`, payload, {
        withCredentials: true,
      });

      localStorage.setItem("memberData", JSON.stringify(res.data.member));
      setAuthMember(res.data.member);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <Box className="auth-container">
      <Box className="auth-left">
        <Typography variant="h2">
          “Welcome back to Reverso – Login to continue.”
        </Typography>
      </Box>

      <Box className="auth-right">
        <Box className="auth-form">
          <Typography variant="h4" mb={3}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="login-method-label">Login With</InputLabel>
                <Select
                  labelId="login-method-label"
                  value={loginMethod}
                  onChange={(e) => setLoginMethod(e.target.value as LoginMethod)}
                >
                  <MenuItem value="memberEmail">Email</MenuItem>
                  <MenuItem value="memberNick">Nickname</MenuItem>
                  <MenuItem value="memberPhone">Phone</MenuItem>
                </Select>
              </FormControl>

              <TextField
                name={loginMethod}
                label={
                  loginMethod === "memberEmail"
                    ? "Email"
                    : loginMethod === "memberNick"
                    ? "Nickname"
                    : "Phone"
                }
                variant="outlined"
                fullWidth
                value={formData[loginMethod]}
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
                      <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {error && <Typography color="error">{error}</Typography>}

              <Button type="submit" variant="contained" fullWidth className="auth-button">
                Login
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
