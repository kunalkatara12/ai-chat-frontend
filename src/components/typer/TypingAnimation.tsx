import { TypeAnimation } from "react-type-animation";
function TypingAnimation() {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Powered by OpenAI",
        1000,
        "Interact with Your Personal AI",
        2000,
        "Tailored ChatGPT Just for You 💻",
        1500,
        "Discover potential with your custom ChatGPT",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};
export default TypingAnimation;
