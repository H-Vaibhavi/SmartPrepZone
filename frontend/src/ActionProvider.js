// src/ActionProvider.js
import axios from "axios";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  async handleQuestion(userMessage) {
    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      }, {
        headers: {
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          "Content-Type": "application/json",
        },
      });

      const reply = response.data.choices[0].message.content;
      const message = this.createChatBotMessage(reply);
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    } catch (error) {
      console.error("OpenAI error:", error);
      const message = this.createChatBotMessage("Sorry, I couldn’t get an answer right now.");
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  }
}

export default ActionProvider;
