import { Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { useAuth } from "./context/AuthContext";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const auth=useAuth()
 
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth?.user && <Route path="/chat" element={<Chat />} />}
        {auth?.isLoggedIn && auth?.user && <Route path="/profile" element={<Profile />} />}
        {auth?.isLoggedIn && !auth?.isGoogleLoggedIn && auth?.user && <Route path="/change-password" element={<ChangePassword />} />}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
