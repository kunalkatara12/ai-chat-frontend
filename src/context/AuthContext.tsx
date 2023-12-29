 import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signupUser,
  googleSignupUser,
  googleLoginUser,
} from "../helpers/api-communicator.helpers";

type User = {
  name: string;
  email: string;
};
type UserAuth = {
  isLoggedIn: boolean;
  isGoogleLoggedIn:boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  googleSignup: (
    name: string,
    email: string,
    jti: string
  ) => Promise<void>;
  googleLogin: (
    name: string,
    email: string,
    jti: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[isGoogleLoggedIn,setIsGoogleLoggedIn]=useState(false)

  useEffect(() => {
    // check if user's cookies are valid then skip logged in
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ name: data.name, email: data.email });
        setIsLoggedIn(true);
      }  
    }
    checkStatus();
  }, []);

  const login = async (email: string, password: string) => {
    // login user
    const data=await loginUser(email,password)
    if(data){
      setUser({name:data.name,email:data.email})
      setIsLoggedIn(true)
    }

  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    // signup user
    const data= await signupUser(name,email,password,confirmPassword)
    if(data)
    {
      // if(data.password!==data.confirmPassword)
      // {
      //   toast.error("Password and Confirm Password do not match")
      // }
      setUser({name:data.name,email:data.email})
      setIsLoggedIn(true)
    }
  };

  const googleSignup=async(name:string,email:string,jti:string)=>{
    const data=await googleSignupUser(name,email,jti)
    if(data){
      setUser({name:data.name,email:data.email})
      setIsLoggedIn(true)
      setIsGoogleLoggedIn(true);
    }
  }
  const googleLogin=async(name:string,email:string,jti:string)=>{
    const data=await googleLoginUser(name,email,jti)
    if(data){
      setUser({name:data.name,email:data.email})
      setIsLoggedIn(true)
      setIsGoogleLoggedIn(true);
    }
  }

  const logout = async () => {
    // logout user
    await logoutUser();
    setIsLoggedIn(false);
     setIsGoogleLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  const value = { isLoggedIn,isGoogleLoggedIn, user, login, signup, logout, googleSignup ,googleLogin};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
