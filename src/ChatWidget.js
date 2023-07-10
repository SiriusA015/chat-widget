import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { v4 as uuidv4 } from 'uuid';

const ChatWidget = () => {
  const [widgetStyles, setWidgetStyles] = useState(null);

  useEffect(() => {
    const fetchWidgetStyles = async () => {
      const url = 'https://parchedrotatingcommand.alexli81.repl.co/get-widget-styles';
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentUrl: window.location.href,
          }),
        });
        const widgetStyles = await response.json();
        setWidgetStyles(widgetStyles);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (window.Shopify && window.Shopify.customer) {
      fetchWidgetStyles();
    }
  }, []);

  useEffect(() => {
    if (widgetStyles) {
      const root = document.documentElement;

      Object.keys(widgetStyles).forEach((key) => {
        root.style.setProperty(`--${key}`, widgetStyles[key]);
      });
    }
  }, [widgetStyles]);

  const handleNewUserMessage = async (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    console.log(`Current Store: ${window.location.href}`);

    const newConvoId = uuidv4();

    const url = 'https://parchedrotatingcommand.alexli81.repl.co/send-message';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage,
          conversationId: newConvoId,
          currentUrl: window.location.href,
        }),
      });

      const { message: serverMessage } = await response.json();

      addResponseMessage(serverMessage);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Chat Widget"
      subtitle="Ask us anything!"
      senderPlaceHolder="Type a message..."
    />
  );
};

export default ChatWidget;
