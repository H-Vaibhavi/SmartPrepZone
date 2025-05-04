import { useEffect } from "react";

const FloatingChatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/webchat.js";
    script.async = true;
  
    script.onload = () => {
      if (window.botpressWebChat) {
        console.log('Botpress WebChat initialized');
  
        window.botpressWebChat.init({
          botId: "your-bot-id", // Replace with your Botpress bot ID
          hostUrl: "https://your-botpress-url.com", // Replace with your Botpress URL
          showPoweredBy: false,
        });
      }
    };
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  

  return (
    <div
      id="webchat"
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "500px",
        margin: "2rem auto",
      }}
    />
  );
};

export default FloatingChatbot;
