import { useUpdatePasswordMutation } from "@/customHooks/query/auth.query.hooks";
import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockReset as LockResetIcon,
} from "@mui/icons-material";
import { useUserStore } from "@/toolkit/store/store";
import { updatePassProps } from "@/typescript/auth.interface";
import toast, { Toaster } from "react-hot-toast";

const UpdatePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updatePassProps>({
    defaultValues: { user_id: "", password: "" },
  });
  const { mutate, isPending } = useUpdatePasswordMutation();
  const router = useRouter();
  const { user } = useUserStore();
  const userId = user?.id;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (formData: FieldValues) => {
    if (!userId) {
      toast.error("User not found. Please log in again.");
      return;
    }

    const { password } = formData as updatePassProps;
    const requestData = { user_id: userId, password };

    mutate(requestData, {
      onSuccess: () => {
        toast.success("Password updated successfully! Please log in.");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      },
      onError: (error) => {
        console.error("Update Password Error:", error);
        toast.error("Failed to update password. Please try again.");
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
            width: 380,
            borderRadius: 15,
            background: "#fff",
            // background:"transparent",
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
              Update Password
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="User ID"
              margin="normal"
              {...register("user_id", { required: "User ID is required" })}
              // InputProps={{ style: { color: "#fff" } }}
              // InputLabelProps={{ style: { color: "#fff" } }}
              // disabled
            />
            <Box sx={{ position: "relative", width: "100%" }}>
              <TextField
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                label="New Password"
                type={showPassword ? "text" : "password"}
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
                "Update Password"
              )}
            </Button>

            <Typography
              align="center"
              sx={{ marginTop: 2, fontWeight: "bold" }}
            >
              Remembered your password?{" "}
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

export default UpdatePassword;
