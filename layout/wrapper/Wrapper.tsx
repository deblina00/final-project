import { ReactNode } from "react";
import ResponsiveAppBar from "../header/Header";
import Footer from "../footer/Footer";
import { useRouter } from "next/router";

interface props {
  children: ReactNode;
}
const Wrapper: React.FC<props> = ({ children }) => {
  const router = useRouter();
  const hideHeaderRoutes = [
    "/auth/login",
    "/auth/registration",
    "/",
    "/auth/verify-OTP",
    "/auth/updatepassword",
  ];
  const shouldShowHeader = !hideHeaderRoutes.includes(router.pathname);
  const hideFooterRoutes = ["/auth/dashboard", "/"];
  const shouldShowFooter = !hideFooterRoutes.includes(router.pathname);
  console.log("Current Pathname:", router.pathname);
  console.log(
    "Footer should be hidden:",
    hideFooterRoutes.includes(router.pathname)
  );

  return (
    <div>
      {shouldShowHeader && <ResponsiveAppBar />}
      <main>{children}</main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Wrapper;
