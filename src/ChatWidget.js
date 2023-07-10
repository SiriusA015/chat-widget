import React from 'react';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const ChatWidget = () => {
    const handleNewUserMessage = (newMessage) => {
      console.log(`New message incoming! ${newMessage}`);
      // Handle the incoming message from the user
    };
  
    return (
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Chat Widget"
        subtitle="Ask us anything!"
      />
    );
  };
  
  export default ChatWidget;
  