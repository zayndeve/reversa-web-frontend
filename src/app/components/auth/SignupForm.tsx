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
export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    memberNick: "",
    memberEmail: "",
    memberPassword: "",
    confirmPassword: "",
    memberPhone: "",
    memberImage: null as File | null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    let updatedFormData = { ...formData, [name]: files ? files[0] : value };

    if (
      (name === "memberPassword" &&
        updatedFormData.confirmPassword &&
        value !== updatedFormData.confirmPassword) ||
      (name === "confirmPassword" &&
        updatedFormData.memberPassword &&
        value !== updatedFormData.memberPassword)
    ) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }

    setFormData(updatedFormData);
  };
  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5001/auth/member/google";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.memberPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        form.append(key, value as string | Blob);
      }
    });

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${apiUrl}/api/member/signup`, form);
      console.log(res.data);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <Box className="auth-container">
      {/* LEFT SIDE */}
      <Box className="auth-left">
        <Typography variant="h2">
          “Bring your fashion ideas to life with Reverso.”
        </Typography>
      </Box>

      {/* RIGHT SIDE */}
      <Box className="auth-right">
        <Box className="auth-form">
          <Typography variant="h4" mb={3}>
            Register
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Stack spacing={2}>
              <TextField
                name="memberNick"
                label="Nickname"
                variant="outlined"
                fullWidth
                value={formData.memberNick}
                onChange={handleChange}
                required
              />
              <TextField
                name="memberEmail"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={formData.memberEmail}
                onChange={handleChange}
                required
              />
              <TextField
                name="memberPhone"
                label="Phone"
                variant="outlined"
                fullWidth
                value={formData.memberPhone}
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
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box>
                <input
                  accept="image/*"
                  id="memberImage"
                  type="file"
                  name="memberImage"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="memberImage">
                  <Button
                    variant="outlined"
                    component="span"
                    className="upload-button"
                    fullWidth
                  >
                    {formData.memberImage
                      ? formData.memberImage.name
                      : "Upload Image"}
                  </Button>
                </label>
                <Typography
                  variant="caption"
                  display="block"
                  textAlign="center"
                >
                  Allowed formats: .jpg, .jpeg, .png
                </Typography>
              </Box>

              {error && <Typography color="error">{error}</Typography>}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="auth-button"
              >
                Register
              </Button>

              <Button
                fullWidth
                variant="contained"
                className="google-signup-button"
                startIcon={
                  <img
                    src="/img/google-logo.svg" // your local path to Google logo
                    alt="Google logo"
                    style={{ width: "20px", height: "20px" }}
                  />
                }
                onClick={handleGoogleSignup}
              >
                Sign up with Google
              </Button>
            </Stack>
          </form>
          <Typography mt={2} textAlign="center">
            Already have an account? <a href="/login">Login here</a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
