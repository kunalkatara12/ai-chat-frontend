import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password, confirmPassword);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error: any) {
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password do not match", {
          id: "signup",
        });
      } else {
        console.log(error);
        toast.error(`${error?.response?.data?.message}`, { id: "signup" });
      }
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  // Google Signup
  const responseMessage = async (response: CredentialResponse) => {
    console.log(response);
    const credentials: string = response.credential as string;
    const decoded = jwtDecode(credentials);
    console.log(decoded);
    console.log(decoded.jti);
    //@ts-ignore
    const name: string = decoded?.name;
    //@ts-ignore
    const email: string = decoded?.email;
    //@ts-ignore
    const jti: string = decoded?.jti;
    try {
      toast.loading("Signup using Google...", { id: "googleSignup" });
      await auth?.googleSignup(name, email, jti);
      toast.success("Signup done  using Google...", { id: "googleSignup" });
    } catch (error) {
      console.log(error);
      toast.error("SignUp failed using google", {
        id: "googleSignup",
      });
    }
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Signup
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <CustomizedInput
              type="password"
              name="confirmPassword"
              label="Confirm Password"
            />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Signup
            </Button>
            <Link className="mt-1 self-center text-blue-600" to="/login">
              {" "}
              Already have an account? Login Yourself...
            </Link>
            <Typography className="self-center">Or</Typography>

            {/* <Button
              // onClick={() => auth?.loginWithGoogle()}
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              startIcon={<IoLogoGoogle />}
              endIcon={<IoIosLogIn />}
            >

              Signup with Google
            </Button> */}

            <Box className="flex justify-center">
              <GoogleLogin
                onSuccess={responseMessage}
                //@ts-ignore
                onError={errorMessage}
                className="self-center"
              ></GoogleLogin>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
