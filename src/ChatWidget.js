import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { v4 as uuidv4 } from 'uuid';

const ChatWidget = () => {
  // const [customerData, setCustomerData] = useState(null);
  const [widgetStyles, setWidgetStyles] = useState(null);

  useEffect(() => {
    /*const fetchCustomerData = async () => {
      const url = 'https://your-server-url.com/get-customer-data';
      try {
        const response = await fetch(url);
        const customerData = await response.json();
        setCustomerData(customerData);
      } catch (error) {
        console.error('Error:', error);
      }
    };*/

    const fetchWidgetStyles = async () => {
      const url = 'https://parchedrotatingcommand.alexli81.repl.co/get-widget-styles';
      try {
        const response = await fetch(url);
        const widgetStyles = await response.json();
        setWidgetStyles(widgetStyles);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (window.Shopify && window.Shopify.customer) {
      // fetchCustomerData();
      fetchWidgetStyles();
    }
  }, []);

  // Dynamically apply the styles fetched from the server
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
    // console.log(`Customer Data: ${customerData}`);
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
          // customerId: customerData?.id,
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
