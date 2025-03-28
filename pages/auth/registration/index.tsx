import { useRegisterMutation } from "@/customHooks/query/auth.query.hooks";
import { useState } from "react";
import Link from "next/link";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
  Paper,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import { registerProps } from "@/typescript/auth.interface";
import toast, { Toaster } from "react-hot-toast";

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerProps>();

  const { mutate, isPending } = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (formData: FieldValues) => {
    const { name, email, password } = formData as registerProps;

    const requestData = { name, email, password };

    mutate(requestData, {
      onSuccess: () => {
        toast.success("Registration successful!");
        console.log("Registration successful!");
        router.push("/auth/verify-OTP");
      },

      onError: (error) => {
        toast.error("Registration failed. Please check your credentials.");
        console.error("Error:", error);
      },
    });
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          padding: 2,
          background:
            "linear-gradient(135deg, #0D0D0D, #1A1A2E, #FF6600, #0099CC)",
          backgroundSize: "400% 400%",
          animation: "gradientBG 10s ease infinite",
        }}
      >
        <Paper
          elevation={10}
          style={{
            padding: 30,
            maxWidth: 380,
            borderRadius: 15,
            background: "#fff",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
          }}
        >
          <Box textAlign="center">
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              sx={{ mb: 3, color: "#123C69" }}
            >
              Sign Up
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("name", { required: "Name is required" })}
              label="Full Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              margin="normal"
            />

            <Box sx={{ position: "relative", width: "100%" }}>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format",
                  },
                })}
                label="Email"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                margin="normal"
              />
              <EmailOutlinedIcon
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(0, 0, 0, 0.54)",
                }}
              />
            </Box>

            <Box sx={{ position: "relative", width: "100%" }}>
              <TextField
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                margin="normal"
              />
              <IconButton
                onClick={togglePasswordVisibility}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                p: 1.5,
                fontWeight: "bold",
                background: "#123C69",
                "&:hover": { background: "#008ba3" },
              }}
              disabled={isPending}
            >
              {isPending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>

            <Typography
              align="center"
              sx={{ marginTop: 2, fontWeight: "bold" }}
            >
              Already have an account?{" "}
              <Link
                href="/auth/login"
                passHref
                style={{ color: "#123C69", textDecoration: "none" }}
              >
                Sign In
              </Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Registration;
