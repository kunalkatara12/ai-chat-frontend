import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

const Header = () => {
  const auth = useAuth();
  const [isDesktop, setIsDesktop] = useState(false);

  const updatePredicate = () => {
    setIsDesktop(window.innerWidth <= 900);
  };

  useEffect(() => {
    updatePredicate(); // Initial call to set the state based on window width
    window.addEventListener("resize", updatePredicate);

    return () => {
      window.removeEventListener("resize", updatePredicate);
    };
  }, []); // Empty dependency array to run this effect only once (on mount)

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div className="flex items-center">
          {auth?.isLoggedIn ? (
            <>
              {isDesktop && (
                <Link to="/profile">
                  <Avatar>
                    {auth?.user?.name ? auth.user.name[0].toUpperCase() : null}
                  </Avatar>
                </Link>
              )}
              <NavigationLink
                bg="#00fffc"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
