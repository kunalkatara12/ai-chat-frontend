import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import {  IoMdSend } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  deleteAllChats,
  getAllChats,
  sendChatRequest,
} from "../helpers/api-communicator.helpers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};
const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();

  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isMobileWidth, setIsMobileWidth] = useState(false);

  const handleSubmit = async () => {
    const content: string = inputRef.current?.value as string;
    if (inputRef && inputRef.current) inputRef.current.value = "";
    const newMessage: Message = {
      role: "user",
      content,
    };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

useEffect(() => {
    // Function to check screen width and update state
    const handleResize = () => {
      setIsMobileWidth(window.innerWidth <= 900); // Adjust the width threshold as needed
    };

    // Initial check and set listener for window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])
  const clearChats = async () => {
    try {
      toast.loading("Deleting Chats...", {
        id: "deleteChats",
      });
      await deleteAllChats();
      setChatMessages([]);
      toast.success(" Chats deleted successfully", {
        id: "deleteChats",
      });
    } catch (error) {
      console.log("error in deleting chats");
      toast.error("Chats not deleted", { id: "deleteChats" });
    }
  };
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "load chats..." });
      getAllChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Chat Loaded Successfully", { id: "load chats..." });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Chats not loaded", { id: "load chats..." });
        });
    }
  }, [auth]);
  useEffect(() => {
    if (!auth?.user) {
      navigate("/login");
    }
  }, [auth]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          height: "100%",
          width: "100%",
          mt: 3,
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: { md: "flex", xs: "none", sm: "none" },
            flex: 0.2,
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "60vh",
              bgcolor: "rgb(17,29,39)",
              borderRadius: 5,
              flexDirection: "column",
              mx: 3,
            }}
          >
            <Avatar
              sx={{
                mx: "auto",
                my: 2,
                bgcolor: "white",
                color: "black",
                fontWeight: 700,
              }}
              onClick={() => navigate("/profile")}
            >
              {auth?.user?.name[0]}
              {/* {auth?.user?.name.split(" ")[1][0]} */}
            </Avatar>
            <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
              You are talking to a ChatBOT
            </Typography>
            <Typography
              sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}
            >
              You can ask question
            </Typography>
            <Button
              sx={{
                width: "200px",
                my: "auto",
                color: "white",
                fontWeight: "700",
                borderRadius: 3,
                mx: "auto",
                bgcolor: red[300],
                ":hover": {
                  bgcolor: red.A400,
                },
              }}
              onClick={clearChats}
              // className="w-[200px] my-auto text-white font-bold rounded bg-red-500 mx-auto hover:bg-red-600"
            >
              Clear Coversation
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flex: { md: 0.8, xs: 1, sm: 1 },
            flexDirection: "column",
            px: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "40px",
              color: "white",
              mb: 2,
              mx: "auto",
              fontWeight: "600",
              "@media screen and (max-width: 500px)": {
                fontSize: "30px",
                color: "aqua",
                fontWeight: "400",
              },
            }}
          >
            Model - GPT 3.5 Turbo
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              borderRadius: 3,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              overflowX: "hidden",
              overflowY: "auto",
              scrollBehavior: "smooth",
            }}
          >
            {chatMessages.map((message, index) => (
              <ChatItem
                key={index}
                // @ts-ignore
                role={message.role}
                content={message.content}
              />
            ))}
          </Box>
          <div
            style={{
              width: "100%",
              borderRadius: 8,
              backgroundColor: "rgb(17,27,39)",
              display: "flex",
              margin: "auto",
            }}
          >
            {" "}
            <input
              ref={inputRef}
              type="text"
              style={{
                width: "100%",
                backgroundColor: "transparent",
                padding: "30px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "20px",
              }}
            />
            <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
              <IoMdSend />
            </IconButton>
            {isMobileWidth && (
              <IconButton
                onClick={clearChats}
                sx={{  
                     color: red[300],
                ":hover": {
                  color: red.A400, mx: 1 }}
                }
              >
                <RiDeleteBin6Line />
              </IconButton>

            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Chat;
