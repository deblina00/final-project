// import Link from "next/link";
// import * as React from "react";
// import { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Menu,
//   MenuItem,
//   Avatar,
//   Button,
//   Tooltip,
//   Box,
//   Container,
// } from "@mui/material";
// import { useUserStore } from "@/toolkit/store/store";
// import { useCookies } from "react-cookie";
// import { useRouter } from "next/router";
// import { motion } from "framer-motion";
// import Cookies from "js-cookie";
// import toast, { Toaster } from "react-hot-toast";

// const pages = [
//   { name: "Add-Product", path: "/cms/create" },
//   { name: "All-Products", path: "/cms/list" },
//   { name: "Update-Password", path: "/auth/updatepassword" },
// ];

// const settings = [
//   { name: "Dasboard", path: "/auth/dashboard" },
//   { name: "Logout", path: "/" },
// ];

// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
//     null
//   );
//   const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const { token, setToken, user, setUser } = useUserStore();
//   const [cookies, , removeCookie] = useCookies();
//   const router = useRouter();
//   const [pic, setPic] = useState<any>({});

//   useEffect(() => {
//     if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
//       const profile = localStorage.getItem("user");
//       if (profile) {
//         try {
//           const parsedData: any = JSON.parse(profile);
//           console.log("data:", parsedData);
//           setPic(parsedData);
//         } catch (error) {
//           console.error("Error parsing JSON:", error);
//         }
//       }
//     }
//     console.log("pic:", pic);
//   }, [token]);

//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleLogout = () => {
//     Cookies.remove("token");
//     removeCookie("token", { path: "/" });
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     useUserStore.getState().logout();
//     toast.success("Logout Successfully");
//     setTimeout(() => {
//       router.push("/auth/login");
//     }, 1000);
//   };

//   useEffect(() => {
//     const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
//     setIsLoggedIn(loggedInStatus);
//   }, []);

//   useEffect(() => {
//     if (cookies.token) {
//       setToken(cookies.token);
//     } else {
//       setToken("");
//     }
//   }, [cookies.token, setToken, setUser]);

//   return (
//     <AppBar
//       position="static"
//       sx={{
//         background: "linear-gradient(90deg, #0F172A 0%, #123C69 100%)",
//         boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
//         paddingY: 1,
//       }}
//     >
//       <Toaster position="top-center" reverseOrder={false} />
//       <Container maxWidth="xl">
//         <Toolbar>
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <Typography
//               variant="h6"
//               noWrap
//               component={Link}
//               href="/"
//               sx={{
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 letterSpacing: ".2rem",
//                 color: "white",
//                 textDecoration: "none",
//                 cursor: "pointer",
//                 fontSize: "1.5rem",
//               }}
//             >
//               Circuit Hub!
//             </Typography>
//           </motion.div>

//           <Box
//             sx={{
//               flexGrow: 1,
//               display: "flex",
//               justifyContent: "center",
//               gap: 3,
//             }}
//           >
//             {pages.map((page) => (
//               <motion.div
//                 key={page.name}
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <Link href={page.path} passHref>
//                   <Button
//                     sx={{
//                       color: "white",
//                       fontWeight: "bold",
//                       fontSize: "1rem",
//                       transition: "0.3s",
//                       "&:hover": { color: "#FACC15" },
//                     }}
//                   >
//                     {page.name}
//                   </Button>
//                 </Link>
//               </motion.div>
//             ))}
//           </Box>

//           <Box sx={{ marginLeft: "auto" }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <motion.div
//                   whileHover={{ scale: 1.1 }}
//                   transition={{ type: "spring", stiffness: 200 }}
//                 >
//                   <Avatar
//                     alt="User"
//                     src={pic?.avatar || "/c.png"}
//                     sx={{ width: 40, height: 40 }}
//                   />
//                 </motion.div>
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{
//                 mt: "45px",
//                 ".MuiPaper-root": {
//                   backgroundColor: "#1E293B",
//                   color: "white",
//                   borderRadius: "10px",
//                 },
//               }}
//               anchorEl={anchorElUser}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem
//                   key={setting.name}
//                   onClick={handleCloseUserMenu}
//                   sx={{ paddingX: 2 }}
//                 >
//                   {setting.name === "Logout" ? (
//                     <Typography
//                       textAlign="center"
//                       onClick={handleLogout}
//                       sx={{ "&:hover": { color: "#FACC15" } }}
//                     >
//                       {setting.name}
//                     </Typography>
//                   ) : (
//                     <Link href={setting.path} passHref>
//                       <Typography
//                         sx={{
//                           textDecoration: "none",
//                           color: "inherit",
//                           "&:hover": { color: "#FACC15" },
//                         }}
//                       >
//                         {setting.name}
//                       </Typography>
//                     </Link>
//                   )}
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default ResponsiveAppBar;

import Link from "next/link";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Tooltip,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useUserStore } from "@/toolkit/store/store";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const pages = [
  { name: "Add-Product", path: "/cms/create" },
  { name: "All-Products", path: "/cms/list" },
  { name: "Update-Password", path: "/auth/updatepassword" },
];

const settings = [
  { name: "Dasboard", path: "/auth/dashboard" },
  { name: "Logout", path: "/" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token, setToken, user, setUser } = useUserStore();
  const [cookies, , removeCookie] = useCookies();
  const router = useRouter();
  const [pic, setPic] = useState<any>({});

  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const profile = localStorage.getItem("user");
      if (profile) {
        try {
          const parsedData: any = JSON.parse(profile);
          console.log("data:", parsedData);
          setPic(parsedData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    }
    console.log("pic:", pic);
  }, [token]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    removeCookie("token", { path: "/" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    useUserStore.getState().logout();
    toast.success("Logout Successfully");
    setTimeout(() => {
      router.push("/auth/login");
    }, 1000);
  };

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  useEffect(() => {
    if (cookies.token) {
      setToken(cookies.token);
    } else {
      setToken("");
    }
  }, [cookies.token, setToken, setUser]);

  // Drawer toggle function
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  const drawer = (
    <Box
      sx={{
        width: "100vw",
        paddingTop: "10px",
        paddingBottom: "10px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {pages.map((page) => (
          <ListItem key={page.name} sx={{ pl: 4 }}>
            <Link href={page.path} passHref>
              <ListItemText primary={page.name} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #0F172A 0%, #123C69 100%)",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
        paddingY: 1,
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Container maxWidth="xl">
        <Toolbar>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "white",
                textDecoration: "none",
                cursor: "pointer",
                fontSize: "2rem",
              }}
            >
              Circuit Hub!
            </Typography>
          </motion.div>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              gap: 3,
            }}
          >
            {pages.map((page) => (
              <motion.div
                key={page.name}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={page.path} passHref>
                  <Button
                    sx={{
                      display: { xs: "none", md: "flex" },
                      color: "white",
                      fontWeight: "bold",
                      // fontSize: "1rem",
                      transition: "0.3s",
                      "&:hover": { color: "white" },
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </Box>

          <Box sx={{ marginLeft: "auto" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Avatar
                    alt="User"
                    src={pic?.avatar || "/c.png"}
                    sx={{ width: 40, height: 40 }}
                  />
                </motion.div>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
                ".MuiPaper-root": {
                  backgroundColor: "#1E293B",
                  color: "white",
                  borderRadius: "10px",
                },
              }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={handleCloseUserMenu}
                  sx={{ paddingX: 2 }}
                >
                  {setting.name === "Logout" ? (
                    <Typography
                      textAlign="center"
                      onClick={handleLogout}
                      sx={{ "&:hover": { color: "#FACC15" } }}
                    >
                      {setting.name}
                    </Typography>
                  ) : (
                    <Link href={setting.path} passHref>
                      <Typography
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                          "&:hover": { color: "white" },
                        }}
                      >
                        {setting.name}
                      </Typography>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  width: "30vw",
                  margin: 0,
                  padding: 0,
                  overflowX: "hidden",
                  bgcolor: "#123C69",
                  color: "#fff",
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
