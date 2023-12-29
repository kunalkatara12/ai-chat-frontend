import { Avatar, Box, Button, TextField } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { passwordChange } from "../helpers/api-communicator.helpers";

function ChangePassword() {
  // variables and states
  const auth = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const oRef = useRef<HTMLInputElement | null>(null);
  const pRef = useRef<HTMLInputElement | null>(null);
  const cRef = useRef<HTMLInputElement | null>(null);
  const navigation = useNavigate();
// password change function
  const handlePasswordChange = async () => {
    const email = emailRef.current?.value;
    const oldPassword = oRef.current?.value;
    const newPassword = pRef.current?.value;
    const confirmPassword = cRef.current?.value;

    // checking if all the fields are filled
    if (email && oldPassword && newPassword && confirmPassword) {
// checking if new password and confirm password are same
      if (newPassword !== confirmPassword) {
        toast.error("New Password and Confirm Password do not match", {
          id: "passwordChange",
        });
      } else {
        try {
          toast.loading("Password Changing...", {
            id: "passwordChange",
          });
          await passwordChange(email, oldPassword, newPassword);
          toast.success("Password Changed Successfully", {
            id: "passwordChange",
          });
          navigation("/profile");
        } catch (error) {
          toast.error("Password did not changed properly",{
            id:"passwordChange"
          })
        }
      }
    }
  };

  const handleCancel = () => {
    setEmail("")
    setOldPassword("")
    setPassword("")
    navigation("/profile");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
      <Box
        sx={{
          width: "40%",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <TextField
            inputRef={emailRef}
            className="mx-2"
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            inputRef={oRef}
            className="mx-2"
            label="Old Password"
            variant="outlined"
            type="password"
            fullWidth
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            inputRef={pRef}
            className="mx-2"
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            inputRef={cRef}
            className="mx-2"
            label="Confirm New Password"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ marginBottom: "1rem" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button variant="contained" onClick={handlePasswordChange}>
              Change Password
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ChangePassword;
