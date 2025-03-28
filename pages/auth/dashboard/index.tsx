import React from "react";
import { Box, Typography, Avatar, CircularProgress, Modal, Grid2 } from "@mui/material";
import { useDashboardQuery } from "@/customHooks/query/auth.query.hooks";
import { dashboardProps } from "@/typescript/auth.interface";

const ProfileModal: React.FC<dashboardProps> = () => {
  const {
    data: user,
    isPending: isPendingCategories,
    isError: isErrorCategories,
  } = useDashboardQuery();

  return (
    <>
      <Grid2
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
        <Box
          sx={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            height: 400,
            bgcolor: "#fff",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "#123C69" }}
            >
              Profile Details
            </Typography>
          </Box>

          {isPendingCategories ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : isErrorCategories ? (
            <Typography color="error" sx={{ mt: 4 }}>
              Error fetching profile details.
            </Typography>
          ) : (
            user && (
              <Box sx={{ mt: 4 }}>
                <Avatar
                  src="/c.png"
                  alt="Profile Image"
                  sx={{
                    width: 170,
                    height: 170,
                    mx: "auto",
                    mb: 2,
                    border: "4px solid #123C69",
                    boxShadow: "0px 0px 10px rgba(25, 118, 210, 0.5)",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0px 0px 20px rgba(25, 118, 210, 0.8)",
                    },
                  }}
                />
                <Typography variant="h6" textAlign="center">
                  <strong>Name:</strong> {user.data.name}
                </Typography>
                <Typography textAlign="center">
                  <strong>Email: </strong>
                  {user.data.email}
                </Typography>
              </Box>
            )
          )}
        </Box>
      </Grid2>
    </>
  );
};

export default ProfileModal;
