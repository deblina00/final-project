import {
  Button,
  Paper,
  TextField,
  Typography,
  Avatar,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginMutation } from "@/customHooks/query/auth.query.hooks";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import toast, { Toaster } from "react-hot-toast";
import { loginProps } from "@/typescript/auth.interface";
import Link from "next/link";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginProps>();
  const router = useRouter();
  const { mutate, isPending } = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onsubmit = async (formData: FieldValues) => {
    const { email, password } = formData as { email: string; password: string };

    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    mutate(formData, {
      onSuccess: (res) => {
        console.log("Login Mutation Response:", res);

        if (res?.token) {
          console.log("Token:", res.token);
          console.log("User:", res.user);

          Cookies.set("token", res.token, { expires: 7 });
          toast.success("Login successful! Welcome back.");

          setTimeout(() => {
            router.replace("/cms/list");
          }, 500);
        } else {
          toast.error("Invalid credentials! Please try again.");
          console.log("Login failed. Please try again.");
        }
      },
      onError: () => {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
        console.error(
          "Login failed. Please check your credentials and try again."
        );
      },
    });
    console.log(formData);
    reset();
    router.push("/cms/list");
  };

  const handleLoginError = () => {
    router.push("/auth/registration");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          minHeight: "100vh",
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
            width: 350,
            borderRadius: 15,
            background: "#fff",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
          }}
        >
          <Box textAlign="center">
            <Avatar style={{ background: "#5d4037", margin: "0 auto" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              variant="h5"
              style={{ margin: "20px 0", color: "#123C69", fontWeight: "bold" }}
            >
              Sign In
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onsubmit)}>
            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email format",
                },
              })}
              label="Email"
              placeholder="Enter email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
            />

            <Box sx={{ position: "relative", width: "100%" }}>
              <TextField
                {...register("password", { required: "Password is required" })}
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
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
              {isPending ? "Loading..." : "Sign In"}
            </Button>

            <Typography
              align="center"
              sx={{ fontWeight: "bold", marginTop: 2 }}
            >
              Don't have an account?{" "}
              <Link
                href="/auth/registration"
                passHref
                style={{
                  color: "#123C69",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Link>
            </Typography>

            {/* <Button
              variant="text"
              fullWidth
              style={{
                color: "#000",
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={handleLoginError}
            >
              Don’t have an account? Register here
            </Button> */}
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
