import { Avatar, Box, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
  const auth = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      <Box
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#374151",
          minHeight: "50%",
          borderRadius: "10px",
          padding: "2rem",
          "@media screen and (max-width: 500px)": {
            width: "80%",
          },
        }}
      >
        <Avatar
          sx={{
            margin: "auto",
            width: "100px",
            height: "100px",
            backgroundColor: "white",
            color: "black",
            fontWeight: 700,
            fontSize: "2rem",
          }}
        >
          {auth?.user?.name[0].toUpperCase()}
        </Avatar>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            marginTop: "1rem",
            color: "white",
          }}
        >
          {auth?.user?.name.toUpperCase()}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            marginTop: "0.5rem",
            color: "white",
          }}
        >
          Email: {auth?.user?.email}
        </Typography>
        {!auth?.isGoogleLoggedIn && (
          <Link to="/change-password">
            <Button
              variant="contained"
              sx={{
                margin: "auto",
                marginTop: "1.5rem",
                backgroundColor: "#4b5563",
                color: "white",
                "&:hover": {
                  backgroundColor: "#718096",
                },
              }}
            >
              Change Password
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
}

export default Profile;
