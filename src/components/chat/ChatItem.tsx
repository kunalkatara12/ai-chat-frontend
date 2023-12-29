import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
const codeComponent=(message:string)=>{
if(message.includes("```")){
    const code=message.split("```")
    return code;
}
}

const isCodeBlock=(message:string)=>{
  if (
    message.includes("=") ||
    message.includes(";") ||
    message.includes("[") ||
    message.includes("]") ||
    message.includes("{") ||
    message.includes("}") ||
    message.includes("#") ||
    message.includes("//")
  ) {
    return true;
  }
  return false;

}


// const renderBlocks = ({messageBlocks, content}:{
//   messageBlocks:string,
//   content:string
// }) => {
//   if (!messageBlocks || !messageBlocks.length) {
//     return <Typography sx={{ fontSize: "20px" }}>{content}</Typography>;
//   }

//   return messageBlocks.map((block, index) => {
//     if (index === 0) {
//       return (
//         <SyntaxHighlighter
//           key={index}
//           showLineNumbers
//           wrapLongLines
//           style={vscDarkPlus}
//           language="javascript"
//         >
//           {block}
//         </SyntaxHighlighter>
//       );
//     } else {
//       return (
//         <Typography key={index} sx={{ fontSize: "20px" }}>
//           {block}
//         </Typography>
//       );
//     }
//   });
// };





const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = codeComponent(content);
    const auth=useAuth()
    // return role === "assistant" ? (
    //   <Box
    //     sx={{
    //       display: "flex",
    //       p: 2,
    //       bgcolor: "#004d5612",
    //       gap: 2,
    //       borderRadius: 2,
    //       my: 1,
    //     }}
    //   >
    //     <Avatar sx={{ ml: "0" }}>
    //       <img src="openai.png" alt="openai" width={"30px"} />
    //     </Avatar>
    //     <Box>
    //       <Typography>{content}</Typography>
    //     </Box>
    //   </Box>
    // ) : (
    //   <Box
    //     sx={{
    //       display: "flex",
    //       p: 2,
    //       bgcolor: "#004d5612",
    //       gap: 2,
    //       borderRadius: 2,
    //       my: 1,
    //     }}
    //   >
    //     <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
    //       {auth?.user?.name[0]}
    //       {auth?.user?.name.split(" ")[1][0]}
    //     </Avatar>
    //     <Box>
    //       <Typography>{content}</Typography>
    //     </Box>
    //   </Box>
    // );
    
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          my: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",

            justifyContent: role === "user" ? "flex-end" : "flex-start",
            "@media screen and (max-width: 500px)": {
              width: "100vw",
              justifyContent: "flex-start",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              maxWidth: "70%",
              // width: "45%",
              borderRadius: 3,
              bgcolor: role === "user" ? "#004d5685" : "rgb(17,29,39)",
              color: role === "user" ? "white" : "white",
              p: 2,

              alignItems: "center",
              "@media screen and (max-width: 500px)": {
                maxWidth: "100%",
                width: "100%",
              },
            }}
          >
            <Avatar sx={{ ml: "0" }}>
              {role === "assistant" ? (
                <img src="openai.png" alt="openai" width={"30px"} />
              ) : (
                <>
                  {auth?.user?.name[0]}
                  {/* {auth?.user?.name.split(" ")[1][0]} */}
                </>
              )}
            </Avatar>
            <Box className="flex flex-col overflow-x-auto">
              {" "}
              {!messageBlocks && (
                <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
              )}
              {messageBlocks &&
                messageBlocks.length &&
                messageBlocks.map((block) =>
                  isCodeBlock(block) ? (
                    <SyntaxHighlighter
                      wrapLongLines
                      style={atomDark}
                      language="javascript"
                    >
                     {
                      block
                     }
                    </SyntaxHighlighter>
                  ) : (
                    <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
                  )
                )}
            </Box>
          </Box>
        </Box>
      </Box>
    );
};
export default ChatItem;