import { useOtpMutation } from "@/customHooks/query/auth.query.hooks";
import { useState } from "react";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { OTpProps } from "@/typescript/auth.interface";
import toast, { Toaster } from "react-hot-toast";

const VerifyOTP: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTpProps>();
  const { mutate, isPending } = useOtpMutation();
  const [email, setEmail] = useState("");
  const router = useRouter();

  const onSubmit = (formData: FieldValues) => {
    const { otp } = formData as OTpProps;

    if (!email) {
      toast.error("Please enter your email before verifying OTP.");
      return;
    }

    const requestData = { email, otp };

    mutate(requestData, {
      onSuccess: () => {
        toast.success("OTP verified successfully!");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      },
      onError: () => {
        toast.error("Invalid OTP. Please try again.");
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
          background:
            "linear-gradient(135deg, #0D0D0D, #1A1A2E, #FF6600, #0099CC)",
          backgroundSize: "400% 400%",
          animation: "gradientBG 10s ease infinite",
          padding: 2,
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
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              sx={{ mb: 3, color: "#123C69" }}
            >
              Verify OTP
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
              />

              <TextField
                {...register("otp", {
                  required: "OTP is required",
                })}
                label="Enter OTP"
                fullWidth
                error={!!errors.otp}
                helperText={errors.otp?.message}
                margin="normal"
              />

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
                  "Verify OTP"
                )}
              </Button>

              <Typography
                align="center"
                sx={{ marginTop: 2, fontWeight: "bold" }}
              >
                Back to{" "}
                <a
                  href="/auth/login"
                  style={{ color: "#123C69", textDecoration: "none" }}
                >
                  Log In{" "}
                </a>
                Page
              </Typography>
            </form>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default VerifyOTP;
