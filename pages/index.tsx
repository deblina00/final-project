import { Playfair_Display } from "next/font/google";
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Box } from "@mui/material";

const playfairDisplay = Playfair_Display({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundImage: 'url("/1.webp")', // Change to your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: "#fff",
              fontWeight: "bold",
              mb: 2,
              fontFamily: playfairDisplay.style.fontFamily,
            }}
          >
            Welcome to{" "}
            <Typography
              component="span"
              sx={{
                backgroundImage: "linear-gradient(45deg, #fff,#ff5733)", // Define gradient colors
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                fontSize: "inherit",
                fontFamily: "inherit",
                display: "inline",
              }}
            >
              Circuit Hub!
            </Typography>
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => router.push("/auth/login")}
            sx={{
              px: 3,
              py: 1.2,
              bgcolor: "#123C69",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "20px",
              transition: "background-color 0.3s, transform 0.2s",
              "&:hover": {
                backgroundColor: "#ff4d00",
                color: "#123C69",
                // border: "2px solid #ff5733",
                transform: "scale(1.05)",
              },
            }}
          >
            Explore Now
          </Button>
        </Container>
      </Box>
    </>
  );
}
