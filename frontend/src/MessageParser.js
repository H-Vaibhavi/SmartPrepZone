// src/MessageParser.js
class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      if (message.trim() !== "") {
        this.actionProvider.handleQuestion(message);
      }
    }
  }
  
  export default MessageParser;
  